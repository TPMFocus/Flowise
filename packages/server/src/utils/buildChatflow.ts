import { Request, response } from 'express'
import { IncomingInput, IMessage, IReactFlowObject, IChatMessage, chatType } from '../Interface'
import { ChatFlow } from '../database/entities/ChatFlow'
import { Server } from 'socket.io'
import { getRunningExpressApp } from '../utils/getRunningExpressApp'

import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'

import {
    mapMimeTypeToInputField,
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

import { utilAddChatMessage } from './addChatMesage'
 
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");
 
/**
 * Build Chatflow
 * @param {Request} req
 * @param {Server} socketIO
 * @param {boolean} isInternal
 */
export const utilBuildChatflow = async (req: Request, socketIO?: Server, isInternal: boolean = false): Promise<any> => {
    {
        const appServer = getRunningExpressApp()
        const chatflowid = req.params.id
        let incomingInput: IncomingInput = req.body
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
        
        /*** Get chatflows and prepare data  ***/
        const flowData = chatflow.flowData
        const parsedFlowData: IReactFlowObject = JSON.parse(flowData)
        const nodes = parsedFlowData.nodes
        const edges = parsedFlowData.edges

        const memoryNode = findMemoryNode(nodes, edges)
        const memoryType = memoryNode?.data.label
        let sessionId = undefined
        if (memoryNode) sessionId = getMemorySessionId(memoryNode, incomingInput, chatId, isInternal)

        let chatHistory: IMessage[] = incomingInput.history ?? []
        
        

        const startSession = async (data: string) => {
            try {
                const response = await fetch('http://127.0.0.1:5000/start-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: data, session_id: chatflowid }),
                });
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                const result = await response.json();
                console.log('Réponse du microservice flask:', result);
                return result.session_id;
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }
        };

        await startSession('12-06-2024')
 
        const generateText = async (data: string) => {
            try {
                const response = await fetch('http://127.0.0.1:5000/generate-text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: chatflowid, prompt: data }),
                });
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                const result = await response.json();
                console.log('Réponse du microservice flask:', result);
                return result;
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }
        };

        const clearChat = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/clear-chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: chatflowid }),
                });
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                const result = await response.json();
                console.log('Réponse du microservice flask:', result);
                return result.generated_text;
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }
        };

       
        const generatedResponse = await generateText(incomingInput.question);

        const userMessage: Omit<IChatMessage, 'id'> = {
            role: 'userMessage',
            content: incomingInput.question,
            chatflowid,
            chatType: chatType.INTERNAL,
            chatId,
            memoryType,
            sessionId,
            createdDate: userMessageDateTime,
            fileUploads: undefined
        }
        await utilAddChatMessage(userMessage)


        const apiMessage: Omit<IChatMessage, 'id' | 'createdDate'> = {
            role: 'apiMessage',
            content: generatedResponse.generated_text.toString(),
            chatflowid,
            chatType: chatType.INTERNAL,
            chatId,
            memoryType,
            sessionId
        }
            const chatMessage = await utilAddChatMessage(apiMessage)

        appServer.chatflowPool.updateInSync(chatflow.id, true)

        return generatedResponse.generated_text.toString()
    }
}