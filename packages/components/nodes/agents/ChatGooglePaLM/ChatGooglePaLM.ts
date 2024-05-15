import { ChatGooglePaLM, GooglePaLMChatInput } from '@langchain/community/chat_models/googlepalm'
import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class ChatGooglePaLM_ChatModels implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'Manual Test'
        this.name = 'Mmanualtest'
        this.version = 2.0
        this.type = 'Manual Test'
        this.icon = 'GooglePaLM.svg'
        this.category = 'Test Cases'
        this.description = 'Wrapper around Google MakerSuite PaLM large language models using the Chat endpoint'
        this.baseClasses = [this.type, ...getBaseClasses(ChatGooglePaLM)]
        this.inputs = [
            {
                label: 'Test Suite',
                name: 'testsuite',
                type: 'Test Suite',
                optional: true
            },
            {
                label: 'Title',
                name: 'title',
                type: 'string',
                placeholder: 'Brief description of the test case',
                description: 'Mandatory field. Provide a brief description of the test case.'
            },
            {
                label: 'Priority',
                name: 'priority',
                type: 'string',
                placeholder: 'High, Medium, Low',
                description: 'A field to prioritize test cases (e.g., High, Medium, Low).'
            },
            {
                label: 'Tags',
                name: 'tags',
                type: 'string',
                placeholder: 'Keywords to categorize test cases',
                description: 'Keywords to categorize test cases (e.g., Smoke Test, Regression).'
            },
            {
                label: 'Preconditions',
                name: 'preconditions',
                type: 'string',
                placeholder: 'State of the system required before test execution',
                description: 'Optional field. State of the system required before test execution.'
            },
            {
                label: 'Postconditions',
                name: 'postconditions',
                type: 'string',
                placeholder: 'Expected state of the system after test execution',
                description: 'Optional field. Expected state of the system after test execution.'
            },
            {
                label: 'Expected Results',
                name: 'expectedResults',
                type: 'string',
                placeholder: 'Overall anticipated outcome of the test case',
                description: 'Mandatory field. Overall anticipated outcome of the test case.'
            },
            {
                label: 'Actual Results',
                name: 'actualResults',
                type: 'string',
                placeholder: 'The actual results for the test',
                description: 'The actual results for the test.'
            },
            {
                label: 'Test Data',
                name: 'testData',
                type: 'string',
                placeholder: 'Information or data needed to execute the test in general',
                description: 'Optional field. Information or data needed to execute the test in general.'
            },
            {
                label: 'Assigned Testers',
                name: 'assignedTesters',
                type: 'string',
                placeholder: 'Team members responsible for executing the test',
                description: 'Optional field. Team members responsible for executing the test.'
            }
            // 'The "examples" field should contain a list of pairs of strings to use as prior turns for this conversation.'
            // NB: While 'examples:[]' exists in langchain.ts backend, it is unlikely to be actually used there, since ChatOpenAI doesn't support it
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const modelName = nodeData.inputs?.modelName as string
        const temperature = nodeData.inputs?.temperature as string
        const topP = nodeData.inputs?.topP as string
        const topK = nodeData.inputs?.topK as string
        const cache = nodeData.inputs?.cache as BaseCache

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const googleMakerSuiteKey = getCredentialParam('googleMakerSuiteKey', credentialData, nodeData)

        const obj: Partial<GooglePaLMChatInput> = {
            modelName: modelName,
            temperature: parseFloat(temperature),
            apiKey: googleMakerSuiteKey
        }

        if (topP) obj.topP = parseFloat(topP)
        if (topK) obj.topK = parseFloat(topK)
        if (cache) obj.cache = cache

        const model = new ChatGooglePaLM(obj)
        return model
    }
}

module.exports = { nodeClass: ChatGooglePaLM_ChatModels }
