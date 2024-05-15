import { BaseCache } from '@langchain/core/caches'
import { ChatGroq, ChatGroqInput } from '@langchain/groq'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class Groq_ChatModels implements INode {
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
        this.label = 'Test Step'
        this.name = 'TestStep'
        this.version = 2.0
        this.type = 'Test Step'
        this.icon = 'groq.png'
        this.category = 'Design Nodes'
        this.description = 'Wrapper around Groq API with LPU Inference Engine'
        this.baseClasses = [this.type, ...getBaseClasses(ChatGroq)]
        this.inputs = [
            {
                label: 'Manual Test',
                name: 'ManualTest',
                type: 'Manual Test',
                optional: true
            },
            {
                label: 'Step ID',
                name: 'stepId',
                type: 'string',
                optional: true
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                optional: true
            },
            {
                label: 'Required Input',
                name: 'requiredInput',
                type: 'string',
                optional: true
            },
            {
                label: 'Expected Output',
                name: 'expectedOutput',
                type: 'string',
                optional: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const modelName = nodeData.inputs?.modelName as string
        const cache = nodeData.inputs?.cache as BaseCache
        const temperature = nodeData.inputs?.temperature as string
        const streaming = nodeData.inputs?.streaming as boolean

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const groqApiKey = getCredentialParam('groqApiKey', credentialData, nodeData)

        const obj: ChatGroqInput = {
            modelName,
            temperature: parseFloat(temperature),
            apiKey: groqApiKey,
            streaming: streaming ?? true
        }
        if (cache) obj.cache = cache

        const model = new ChatGroq(obj)
        return model
    }
}

module.exports = { nodeClass: Groq_ChatModels }
