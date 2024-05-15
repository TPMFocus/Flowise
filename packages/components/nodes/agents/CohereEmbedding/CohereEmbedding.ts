import { CohereEmbeddings, CohereEmbeddingsParams } from '@langchain/cohere'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class CohereEmbedding_Embeddings implements INode {
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
        this.label = 'Automated Test'
        this.name = 'AutomatedTest'
        this.version = 2.0
        this.type = 'Automated Test'
        this.icon = 'Cohere.svg'
        this.category = 'Test Cases'
        this.description = 'Cohere API to generate embeddings for a given text'
        this.baseClasses = [this.type, ...getBaseClasses(CohereEmbeddings)]
        this.inputs = [
            {
                label: 'Test Suite',
                name: 'testsuite',
                type: 'Test Suite',
                optional: true
            },
            {
                label: 'Test Environment',
                name: 'testenvironment',
                type: 'Test Environment',
                optional: true
            },
            {
                label: 'Title',
                name: 'title',
                type: 'string',
                placeholder: 'A brief description of the automated test',
                description: 'Mandatory field. A brief description of the automated test.'
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'options',
                options: [
                    {
                        label: 'embed-english-v3.0',
                        name: 'embed-english-v3.0',
                        description: 'Embedding Dimensions: 1024'
                    },
                    {
                        label: 'embed-english-light-v3.0',
                        name: 'embed-english-light-v3.0',
                        description: 'Embedding Dimensions: 384'
                    },
                    {
                        label: 'embed-multilingual-v3.0',
                        name: 'embed-multilingual-v3.0',
                        description: 'Embedding Dimensions: 1024'
                    },
                    {
                        label: 'embed-multilingual-light-v3.0',
                        name: 'embed-multilingual-light-v3.0',
                        description: 'Embedding Dimensions: 384'
                    },
                    {
                        label: 'embed-english-v2.0',
                        name: 'embed-english-v2.0',
                        description: 'Embedding Dimensions: 4096'
                    },
                    {
                        label: 'embed-english-light-v2.0',
                        name: 'embed-english-light-v2.0',
                        description: 'Embedding Dimensions: 1024'
                    },
                    {
                        label: 'embed-multilingual-v2.0',
                        name: 'embed-multilingual-v2.0',
                        description: 'Embedding Dimensions: 768'
                    }
                ],
                default: 'embed-english-v2.0',
                optional: true
            },
            {
                label: 'Priority',
                name: 'priority',
                type: 'string',
                placeholder: 'High, Medium, Low',
                description: 'A field to prioritize test cases (e.g., High, Medium, Low).'
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
                label: 'Script Location',
                name: 'scriptLocation',
                type: 'string',
                placeholder: 'Location of the script file',
                description: 'Optional field. Location of the script file.'
            },
            {
                label: 'Programming Language',
                name: 'programmingLanguage',
                type: 'string',
                placeholder: 'Language used for the script',
                description: 'Optional field. Language used for the script (e.g., Python, Java).'
            },
            {
                label: 'Framework',
                name: 'framework',
                type: 'string',
                placeholder: 'Testing framework used',
                description: 'Mandatory field. Testing framework used (e.g., Selenium).'
            },
            {
                label: 'Maintenance Effort',
                name: 'maintenanceEffort',
                type: 'string',
                placeholder: 'Estimated effort for maintenance',
                description: 'Mandatory field. Estimated effort for maintenance (e.g., Low).'
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const modelName = nodeData.inputs?.modelName as string
        const inputType = nodeData.inputs?.inputType as string

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const cohereApiKey = getCredentialParam('cohereApiKey', credentialData, nodeData)

        const obj: Partial<CohereEmbeddingsParams> & { apiKey?: string } = {
            apiKey: cohereApiKey
        }

        if (modelName) obj.model = modelName
        if (inputType) obj.inputType = inputType

        const model = new CohereEmbeddings(obj)
        return model
    }
}

module.exports = { nodeClass: CohereEmbedding_Embeddings }
