import { Request, response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IncomingInput, IMessage, INodeData, IReactFlowObject, IReactFlowNode, IDepthQueue, chatType, IChatMessage } from '../Interface'
import { ChatFlow } from '../database/entities/ChatFlow'
import { Server } from 'socket.io'
import { getRunningExpressApp } from '../utils/getRunningExpressApp'
import {
    isFlowValidForStream,
    buildFlow,
    getTelemetryFlowObj,
    getAppVersion,
    resolveVariables,
    getSessionChatHistory,
    findMemoryNode,
    replaceInputsWithConfig,
    getStartingNodes,
    isStartNodeDependOnInput,
    getMemorySessionId,
    isSameOverrideConfig,
    getEndingNodes,
    constructGraphs
} from '../utils'
import { databaseEntities } from '.'
import { v4 as uuidv4 } from 'uuid'
import logger from './logger'
import { utilAddChatMessage } from './addChatMesage'
import OpenAI from "openai";

/**
 * Build Chatflow
 * @param {Request} req
 * @param {Server} socketIO
 * @param {boolean} isInternal
 */
export const utilBuildChatflow = async (req: Request, socketIO?: Server, isInternal: boolean = false): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const chatflowid = req.params.id
        let incomingInput: IncomingInput = req.body
        let nodeToExecuteData: INodeData
        const chatflow = await appServer.AppDataSource.getRepository(ChatFlow).findOneBy({
            id: chatflowid
        })
        if (!chatflow) {
            return {
                executionError: true,
                status: StatusCodes.NOT_FOUND,
                msg: `Chatflow ${chatflowid} not found`
            }
        }

        const chatId = incomingInput.chatId ?? incomingInput.overrideConfig?.sessionId ?? uuidv4()
        const userMessageDateTime = new Date()


        let isStreamValid = false

        /*** Get chatflows and prepare data  ***/
        const flowData = chatflow.flowData
        const parsedFlowData: IReactFlowObject = JSON.parse(flowData)
        const nodes = parsedFlowData.nodes
        const edges = parsedFlowData.edges

        // Get session ID
        const memoryNode = findMemoryNode(nodes, edges)
        const memoryType = memoryNode?.data.label
        let sessionId = undefined
        if (memoryNode) sessionId = getMemorySessionId(memoryNode, incomingInput, chatId, isInternal)

            
            const openai = new OpenAI({
            apiKey: "sk-proj-ZTTjJorzUWUuI86AT1YaT3BlbkFJfZ5lENOagJn9UIaoOTTu",
            });

            const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: [
                {
                    "role": "system",
                    "content": "You are a QA engineer responsible for extracting relevant information from user prompts and mapping it to a specific node structure in JSON format. Follow the guidelines below for creating the JSON nodes:\n\n1/ Node Definitions: Each node has specific attributes and follows a unique structure. Ensure all required fields are correctly populated.\n\n2/ Child Nodes: Certain nodes can have child nodes. Ensure correct parent-child relationships:\n-Test steps are child nodes of Manual Test Cases. They're used to provide more details to the manual tests.\n-UI interactions are child nodes of Automated Test Cases. They're used to provide more details to the automated tests.\n-Frontend and Backend Unit Test Nodes are child nodes of Unit Test Node.\n-Frontend and Backend Integration Nodes are child nodes of Integration Test Node.\n\n3/ General Workflow:\n-Test Strategy: The starting point.\n-Test Phases: Multiple phases can follow a test strategy.\n-Test Plans: Multiple plans can follow a test phase.\n-Test Suites: Multiple suites can follow a test plan.\n-Test Cases: (Unit, Integration, Performance, Security, Code Quality, Third Party) can follow a test suite.\n-Detailed Test Cases: (Manual, Automated, BDD) can follow test cases with optional detailed steps or UI interactions.\n\n4/ Output Format: Each node should be a separate JSON object. The next_node attribute contains references to subsequent nodes by their node_id.\n\n5/ Node Structure:\n{\n  \"node\": \"NodeType\",\n  \"node_id\": \"\",\n  \"data\": {\n    // Specific attributes for the node type\n  },\n  \"next_node\": []\n}\n\n6/ Node Types and Attributes:\n-TestStrategyNode:\n{\n  \"node\": \"TestStrategyNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"dataConsiderations\": \"\"\n  },\n  \"next_node\": []\n}\n-TestingPhaseNode:\n{\n  \"node\": \"TestingPhaseNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"startDate\": \"\",\n    \"endDate\": \"\",\n    \"estimation\": \"\"\n  },\n  \"next_node\": []\n}\n-TestPlanNode:\n{\n  \"node\": \"TestPlanNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"numberOfAssignedTesters\": \"\",\n    \"dateOfExecution\": \"\",\n    \"estimation\": \"\",\n    \"riskAssessment\": \"\",\n    \"dataRequirements\": \"\",\n    \"overallExecutionResults\": \"\"\n  },\n  \"next_node\": []\n}\n-TestSuiteNode:\n{\n  \"node\": \"TestSuiteNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"exitCriteria\": \"\"\n  },\n  \"next_node\": []\n}\n-ManualTestCaseNode:\n{\n  \"node\": \"ManualTestCaseNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"preconditions\": \"\",\n    \"postconditions\": \"\",\n    \"expectedResults\": \"\",\n    \"actualResults\": \"\",\n    \"testData\": \"\",\n    \"assignedTesters\": \"\"\n  },\n  \"next_node\": []\n}\n-TestStepNode:\n{\n  \"node\": \"TestStepNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"stepId\": \"\",\n    \"description\": \"\",\n    \"requiredInput\": \"\",\n    \"expectedOutput\": \"\"\n  },\n  \"next_node\": []\n}\n-AutomatedTestCaseNode:\n{\n  \"node\": \"AutomatedTestCaseNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"preconditions\": \"\",\n    \"postconditions\": \"\",\n    \"expectedResults\": \"\",\n    \"actualResults\": \"\",\n    \"scriptLocation\": \"\",\n    \"programmingLanguage\": \"\",\n    \"framework\": \"\",\n    \"maintenanceEffort\": \"\",\n    \"dependencies\": \"\"\n  },\n  \"next_node\": []\n}\n-UIInteractionNode:\n{\n  \"node\": \"UIInteractionNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"elementType\": \"\",\n    \"identifier\": \"\",\n    \"action\": \"\",\n    \"value\": \"\"\n  },\n  \"next_node\": []\n}\n-BDDTestCaseNode:\n{\n  \"node\": \"BDDTestCaseNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"background\": \"\",\n    \"scenario\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"gherkinSteps\": [\n      { \"keyword\": \"Given\", \"text\": \"\" },\n      { \"keyword\": \"When\", \"text\": \"\" },\n      { \"keyword\": \"Then\", \"text\": \"\" }\n    ]\n  },\n  \"next_node\": []\n}\n-UnitTestNode:\n{\n  \"node\": \"UnitTestNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"targetLayer\": \"Front-End\" / \"Back-End\"\n  },\n  \"next_node\": []\n}\n-FrontEndUnitTestNode:\n{\n  \"node\": \"FrontEndUnitTestNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"UITestFramework\": \"\",\n    \"UIElements\": \"\"\n  },\n  \"next_node\": []\n}\n-BackendUnitTestNode:\n{\n  \"node\": \"BackendUnitTestNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"UnitTestClass\": \"\",\n    \"Mocking\": \"\"\n  },\n  \"next_node\": []\n}\n-IntegrationTestNode:\n{\n  \"node\": \"IntegrationTestNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"targetLayer\": \"Front-End\" / \"Back-End\"\n  },\n  \"next_node\": []\n}\n-FrontendIntegrationNode:\n{\n  \"node\": \"FrontendIntegrationNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"IntegrationScope\": \"\",\n    \"FrontEndTechnology\": \"\"\n  },\n  \"next_node\": []\n}\n-BackendIntegrationNode:\n{\n  \"node\": \"BackendIntegrationNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"IntegrationScope\": \"\",\n    \"BackendTechnology\": \"\"\n  },\n  \"next_node\": []\n}\n-PerformanceTestNode:\n{\n  \"node\": \"PerformanceTestNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"metrics\": {\n      \"responseTime\": \"\",\n      \"throughput\": \"\",\n      \"resourceUtilization\": \"\"\n    },\n    \"tools\": \"\"\n  },\n  \"next_node\": []\n}\n-SecurityTestNode:\n{\n  \"node\": \"SecurityTestNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"tools\": \"\",\n    \"type\": \"Penetration Testing\" / \"Vulnerability Scanning\" / \"Other\"\n  },\n  \"next_node\": []\n}\n-CodeQualityChecksNode:\n{\n  \"node\": \"CodeQualityChecksNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"checks\": {\n      \"Code Coverage\": \"\",\n      \"Static Code Analysis\": \"\"\n    },\n    \"tools\": \"\"\n  },\n  \"next_node\": []\n}\n-ThirdPartyChecksNode:\n{\n  \"node\": \"ThirdPartyChecksNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"priority\": \"\",\n    \"tags\": \"\",\n    \"type\": \"\",\n    \"tools\": \"\"\n  },\n  \"next_node\": []\n}\n-TestEnvironmentNode:\n{\n  \"node\": \"TestEnvironmentNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"name\": \"\",\n    \"URL\": \"\",\n    \"database\": \"\",\n    \"credentials\": \"\",\n    \"tools\": \"\"\n  },\n  \"next_node\": []\n}\n-IntegrationNode:\n{\n  \"node\": \"IntegrationNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"JIRA_URL\": \"\",\n    \"projectKey\": \"\",\n    \"authentication\": \"\"\n  },\n  \"next_node\": []\n}\n-NoteNode:\n{\n  \"node\": \"NoteNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"content\": \"\"\n  },\n  \"next_node\": []\n}\n-ExecutionDetailsNode:\n{\n  \"node\": \"ExecutionDetailsNode\",\n  \"node_id\": \"\",\n  \"data\": {\n    \"dateOfExecution\": \"\",\n    \"estimation\": \"\",\n    \"realExecutionTime\": \"\",\n    \"passFailStatus\": \"\"\n  },\n  \"next_node\": []\n}\n\n7/ Node Relationships:\n-Ensure nodes are linked properly using the next_node attribute, containing the node_id of the subsequent node.\n-A test strategy can have multiple test phases, a test phase can have multiple test plans, and so on.\n\n8/ Partial Workflows: If the user's prompt is not detailed enough to create a fully detailed workflow, create the nodes based on the provided details.\n\nExample of a Partial Workflow:\n{\n  \"node\": \"TestStrategyNode\",\n  \"node_id\": \"1\",\n  \"data\": {\n    \"title\": \"Initial Strategy\",\n    \"description\": \"Defining the overall strategy\",\n    \"dataConsiderations\": \"Consider GDPR regulations\"\n  },\n  \"next_node\": [\"2\"]\n}\n{\n  \"node\": \"TestingPhaseNode\",\n  \"node_id\": \"2\",\n  \"data\": {\n    \"title\": \"Phase 1\",\n    \"description\": \"Initial testing phase\",\n    \"startDate\": \"2023-01-01\",\n    \"endDate\": \"2023-02-01\",\n    \"estimation\": \"1 month\"\n  },\n  \"next_node\": []\n}\n"
                },
                {
                    "role": "user",
                    "content": incomingInput.question
                }
            ],
            temperature: 0.75,
            max_tokens: 8192,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            });


        /*   Reuse the flow without having to rebuild (to avoid duplicated upsert, recomputation, reinitialization of memory) when all these conditions met:
         * - Node Data already exists in pool
         * - Still in sync (i.e the flow has not been modified since)
         * - Flow doesn't start with/contain nodes that depend on incomingInput.question
         * TODO: convert overrideConfig to hash when we no longer store base64 string but filepath
         ***/
        
        const isFlowReusable = () => {
            return (
                Object.prototype.hasOwnProperty.call(appServer.chatflowPool.activeChatflows, chatflowid) &&
                appServer.chatflowPool.activeChatflows[chatflowid].inSync &&
                appServer.chatflowPool.activeChatflows[chatflowid].endingNodeData &&
                isSameOverrideConfig(
                    isInternal,
                    appServer.chatflowPool.activeChatflows[chatflowid].overrideConfig,
                    incomingInput.overrideConfig
                ) &&
                !isStartNodeDependOnInput(appServer.chatflowPool.activeChatflows[chatflowid].startingNodes, nodes)
            )
        }

        if (isFlowReusable()) {
            nodeToExecuteData = appServer.chatflowPool.activeChatflows[chatflowid].endingNodeData as INodeData
            isStreamValid = isFlowValidForStream(nodes, nodeToExecuteData)
            logger.debug(
                `[server]: Reuse existing chatflow ${chatflowid} with ending node ${nodeToExecuteData.label} (${nodeToExecuteData.id})`
            )
        } else {
            /*** Get Ending Node with Directed Graph  ***/
            const { graph, nodeDependencies } = constructGraphs(nodes, edges)
            const directedGraph = graph
            const endingNodeIds = getEndingNodes(nodeDependencies, directedGraph)
            if (!endingNodeIds.length) {
                return {
                    executionError: true,
                    status: 500,
                    msg: `Ending nodes not found`
                }
            }

            const endingNodes = nodes.filter((nd) => endingNodeIds.includes(nd.id))

            let isEndingNodeExists = endingNodes.find((node) => node.data?.outputs?.output === 'EndingNode')

            for (const endingNode of endingNodes) {
                const endingNodeData = endingNode.data
                if (!endingNodeData) {
                    return {
                        executionError: true,
                        status: 500,
                        msg: `Ending node ${endingNode.id} data not found`
                    }
                }

                const isEndingNode = endingNodeData?.outputs?.output === 'EndingNode'
                
                if (!isEndingNode) {
                    if (
                        endingNodeData &&
                        endingNodeData.category !== 'Main Nodes' &&
                        endingNodeData.category !== 'Agents' &&
                        endingNodeData.category !== 'Engine'
                    ) {
                        return {
                            executionError: true,
                            status: 500,
                            msg: response.choices[0].message.content
                        }
                    }

                    if (
                        endingNodeData.outputs &&
                        Object.keys(endingNodeData.outputs).length &&
                        !Object.values(endingNodeData.outputs ?? {}).includes(endingNodeData.name)
                    ) {
                        return {
                            executionError: true,
                            status: 500,
                            msg: `Output of ${endingNodeData.label} (${endingNodeData.id}) must be ${endingNodeData.label}, can't be an Output Prediction`
                        }
                    }
                }

                isStreamValid = isFlowValidForStream(nodes, endingNodeData)
            }

            // Once custom function ending node exists, flow is always unavailable to stream
            isStreamValid = isEndingNodeExists ? false : isStreamValid

            let chatHistory: IMessage[] = incomingInput.history ?? []

            // When {{chat_history}} is used in Prompt Template, fetch the chat conversations from memory node
            for (const endingNode of endingNodes) {
                const endingNodeData = endingNode.data

                if (!endingNodeData.inputs?.memory) continue

                const memoryNodeId = endingNodeData.inputs?.memory.split('.')[0].replace('{{', '')
                const memoryNode = nodes.find((node) => node.data.id === memoryNodeId)

                if (!memoryNode) continue

                if (!chatHistory.length && (incomingInput.chatId || incomingInput.overrideConfig?.sessionId)) {
                    chatHistory = await getSessionChatHistory(
                        memoryNode,
                        appServer.nodesPool.componentNodes,
                        incomingInput,
                        appServer.AppDataSource,
                        databaseEntities,
                        logger
                    )
                }
            }

            /*** Get Starting Nodes with Reversed Graph ***/
            const constructedObj = constructGraphs(nodes, edges, { isReversed: true })
            const nonDirectedGraph = constructedObj.graph
            let startingNodeIds: string[] = []
            let depthQueue: IDepthQueue = {}
            for (const endingNodeId of endingNodeIds) {
                const resx = getStartingNodes(nonDirectedGraph, endingNodeId)
                startingNodeIds.push(...resx.startingNodeIds)
                depthQueue = Object.assign(depthQueue, resx.depthQueue)
            }
            startingNodeIds = [...new Set(startingNodeIds)]

            const startingNodes = nodes.filter((nd) => startingNodeIds.includes(nd.id))

            logger.debug(`[server]: Start building chatflow ${chatflowid}`)
            /*** BFS to traverse from Starting Nodes to Ending Node ***/
            const reactFlowNodes = await buildFlow(
                startingNodeIds,
                nodes,
                edges,
                graph,
                depthQueue,
                appServer.nodesPool.componentNodes,
                incomingInput.question,
                chatHistory,
                chatId,
                sessionId ?? '',
                chatflowid,
                appServer.AppDataSource,
                incomingInput?.overrideConfig,
                appServer.cachePool,
                false,
                undefined,
                incomingInput.uploads
            )

            const nodeToExecute =
                endingNodeIds.length === 1
                    ? reactFlowNodes.find((node: IReactFlowNode) => endingNodeIds[0] === node.id)
                    : reactFlowNodes[reactFlowNodes.length - 1]
            if (!nodeToExecute) {
                return {
                    executionError: true,
                    status: 404,
                    msg: `Node not found`
                }
            }

            if (incomingInput.overrideConfig) {
                nodeToExecute.data = replaceInputsWithConfig(nodeToExecute.data, incomingInput.overrideConfig)
            }

            const reactFlowNodeData: INodeData = resolveVariables(nodeToExecute.data, reactFlowNodes, incomingInput.question, chatHistory)
            nodeToExecuteData = reactFlowNodeData

            appServer.chatflowPool.add(chatflowid, nodeToExecuteData, startingNodes, incomingInput?.overrideConfig)
        }

        logger.debug(`[server]: Running ${nodeToExecuteData.label} (${nodeToExecuteData.id})`)

        const nodeInstanceFilePath = appServer.nodesPool.componentNodes[nodeToExecuteData.name].filePath as string
        const nodeModule = await import(nodeInstanceFilePath)
        const nodeInstance = new nodeModule.nodeClass({ sessionId })

        let result = isStreamValid
            ? await nodeInstance.run(nodeToExecuteData, incomingInput.question, {
                  chatId,
                  chatflowid,
                  chatHistory: incomingInput.history,
                  logger,
                  appDataSource: appServer.AppDataSource,
                  databaseEntities,
                  analytic: chatflow.analytic,
                  uploads: incomingInput.uploads,
                  socketIO,
                  socketIOClientId: incomingInput.socketIOClientId
              })
            : await nodeInstance.run(nodeToExecuteData, incomingInput.question, {
                  chatId,
                  chatflowid,
                  chatHistory: incomingInput.history,
                  logger,
                  appDataSource: appServer.AppDataSource,
                  databaseEntities,
                  analytic: chatflow.analytic,
                  uploads: incomingInput.uploads
              })
        result = typeof result === 'string' ? { text: result } : result

        // Retrieve threadId from assistant if exists
        if (typeof result === 'object' && result.assistant) {
            sessionId = result.assistant.threadId
        }

        const userMessage: Omit<IChatMessage, 'id'> = {
            role: 'userMessage',
            content: incomingInput.question,
            chatflowid,
            chatType: isInternal ? chatType.INTERNAL : chatType.EXTERNAL,
            chatId,
            memoryType,
            sessionId,
            createdDate: userMessageDateTime
        }
        await utilAddChatMessage(userMessage)

        let resultText = ''
        if (result.text) resultText = result.text
        else if (result.json) resultText = '```json\n' + JSON.stringify(result.json, null, 2)
        else resultText = JSON.stringify(result, null, 2)

        const apiMessage: Omit<IChatMessage, 'id' | 'createdDate'> = {
            role: 'apiMessage',
            content: resultText,
            chatflowid,
            chatType: isInternal ? chatType.INTERNAL : chatType.EXTERNAL,
            chatId,
            memoryType,
            sessionId
        }
        if (result?.sourceDocuments) apiMessage.sourceDocuments = JSON.stringify(result.sourceDocuments)
        if (result?.usedTools) apiMessage.usedTools = JSON.stringify(result.usedTools)
        if (result?.fileAnnotations) apiMessage.fileAnnotations = JSON.stringify(result.fileAnnotations)
        const chatMessage = await utilAddChatMessage(apiMessage)

        logger.debug(`[server]: Finished running ${nodeToExecuteData.label} (${nodeToExecuteData.id})`)
        await appServer.telemetry.sendTelemetry('prediction_sent', {
            version: await getAppVersion(),
            chatflowId: chatflowid,
            chatId,
            type: isInternal ? chatType.INTERNAL : chatType.EXTERNAL,
            flowGraph: getTelemetryFlowObj(nodes, edges)
        })

        // Prepare response
        // return the question in the response
        // this is used when input text is empty but question is in audio format
        result.question = incomingInput.question
        result.chatId = chatId
        result.chatMessageId = chatMessage.id
        if (sessionId) result.sessionId = sessionId
        if (memoryType) result.memoryType = memoryType

        return result
    } catch (e: any) {
        logger.error('[server]: Error:', e)
        return {
            executionError: true,
            status: 500,
            msg: e.message
        }
    }
}
