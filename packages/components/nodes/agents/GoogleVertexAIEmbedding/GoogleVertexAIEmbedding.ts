import { GoogleAuthOptions } from 'google-auth-library'
import { GoogleVertexAIEmbeddings, GoogleVertexAIEmbeddingsParams } from '@langchain/community/embeddings/googlevertexai'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class GoogleVertexAIEmbedding_Embeddings implements INode {
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
        this.label = 'Test Suite'
        this.name = 'TestSuite'
        this.version = 1.0
        this.type = 'TestSuite'
        this.icon = 'GoogleVertex.svg'
        this.category = 'Design Nodes'
        this.description = 'Google vertexAI API to generate embeddings for a given text'
        this.baseClasses = [this.type, ...getBaseClasses(GoogleVertexAIEmbeddings)]

        this.inputs = [
            {
                label: 'Title',
                name: 'title',
                type: 'string',
                placeholder: 'Descriptive name for the user flow or functionality',
                description: 'Mandatory field. Descriptive name for the user flow or functionality.'
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                placeholder: 'Additional details about the user flow',
                description: 'Optional field. Additional details about the user flow.'
            },
            {
                label: 'Exit criteria',
                name: 'exitCriteria',
                type: 'string',
                placeholder: 'List of items to be verified during testing',
                description: 'Mandatory field. List of items to be verified during testing.'
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const modelName = nodeData.inputs?.modelName as string
        const googleApplicationCredentialFilePath = getCredentialParam('googleApplicationCredentialFilePath', credentialData, nodeData)
        const googleApplicationCredential = getCredentialParam('googleApplicationCredential', credentialData, nodeData)
        const projectID = getCredentialParam('projectID', credentialData, nodeData)

        const authOptions: GoogleAuthOptions = {}
        if (Object.keys(credentialData).length !== 0) {
            if (!googleApplicationCredentialFilePath && !googleApplicationCredential)
                throw new Error('Please specify your Google Application Credential')
            if (!googleApplicationCredentialFilePath && !googleApplicationCredential)
                throw new Error(
                    'Error: More than one component has been inputted. Please use only one of the following: Google Application Credential File Path or Google Credential JSON Object'
                )

            if (googleApplicationCredentialFilePath && !googleApplicationCredential)
                authOptions.keyFile = googleApplicationCredentialFilePath
            else if (!googleApplicationCredentialFilePath && googleApplicationCredential)
                authOptions.credentials = JSON.parse(googleApplicationCredential)

            if (projectID) authOptions.projectId = projectID
        }
        const obj: GoogleVertexAIEmbeddingsParams = {}
        if (modelName) obj.model = modelName
        if (Object.keys(authOptions).length !== 0) obj.authOptions = authOptions

        const model = new GoogleVertexAIEmbeddings(obj)
        return model
    }
}

module.exports = { nodeClass: GoogleVertexAIEmbedding_Embeddings }
