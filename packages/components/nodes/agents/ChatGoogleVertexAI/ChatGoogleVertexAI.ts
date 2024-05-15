import { GoogleAuthOptions } from 'google-auth-library'
import { BaseCache } from '@langchain/core/caches'
import { ChatGoogleVertexAI, GoogleVertexAIChatInput } from '@langchain/community/chat_models/googlevertexai'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class GoogleVertexAI_ChatModels implements INode {
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
        this.label = 'UI Interaction'
        this.name = 'UIInteraction'
        this.version = 2.0
        this.type = 'UI Interaction'
        this.icon = 'GoogleVertex.svg'
        this.category = 'Design Nodes'
        this.description = 'Wrapper around VertexAI large language models that use the Chat endpoint'
        this.baseClasses = [this.type, ...getBaseClasses(ChatGoogleVertexAI)]
        this.inputs = [
            {
                label: 'Automated Test',
                name: 'automatedtest',
                type: 'Automated Test',
                optional: true
            },
            {
                label: 'Element Type',
                name: 'elementType',
                type: 'options',
                options: [
                    {
                        label: 'Text Field',
                        name: 'textfield',
                        description: 'A field for entering text'
                    },
                    {
                        label: 'Button',
                        name: 'button',
                        description: 'A clickable button'
                    }
                ],
                default: 'Text Field',
                optional: true
            },

            {
                label: 'Identifier',
                name: 'identifier',
                type: 'string',
                description: 'Specify the locator used to identify the element (e.g., ID, name, XPath).'
            },
            {
                label: 'Action',
                name: 'action',
                type: 'string',
                optional: true,
                description: 'Describe the action performed on the element'
            },
            {
                label: 'Value',
                name: 'value',
                type: 'string',
                optional: true,
                description: 'Specify the value used for actions like entering text or selecting an option.'
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const googleApplicationCredentialFilePath = getCredentialParam('googleApplicationCredentialFilePath', credentialData, nodeData)
        const googleApplicationCredential = getCredentialParam('googleApplicationCredential', credentialData, nodeData)
        const projectID = getCredentialParam('projectID', credentialData, nodeData)

        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxOutputTokens = nodeData.inputs?.maxOutputTokens as string
        const topP = nodeData.inputs?.topP as string
        const cache = nodeData.inputs?.cache as BaseCache

        const obj: GoogleVertexAIChatInput<GoogleAuthOptions> = {
            temperature: parseFloat(temperature),
            model: modelName
        }

        if (maxOutputTokens) obj.maxOutputTokens = parseInt(maxOutputTokens, 10)
        if (topP) obj.topP = parseFloat(topP)
        if (cache) obj.cache = cache

        const model = new ChatGoogleVertexAI(obj)
        return model
    }
}

module.exports = { nodeClass: GoogleVertexAI_ChatModels }
