import { getCredentialData, getCredentialParam } from '../../../src'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { FigmaFileLoader, FigmaLoaderParams } from 'langchain/document_loaders/web/figma'
import { TextSplitter } from 'langchain/text_splitter'

class Figma_DocumentLoaders implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'BDD Test'
        this.name = 'BDDTest'
        this.version = 1.0
        this.type = 'BDD Test'
        this.icon = 'figma.svg'
        this.category = 'Test Cases'
        this.description = 'Load data from a Figma file'
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Test Environment',
                name: 'testenvironment',
                type: 'Test Environment',
                optional: true
            },
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
                placeholder: 'A brief description of the BDD scenario',
                description: 'Mandatory field. A brief description of the BDD scenario (e.g., "Login with valid credentials").'
            },
            {
                label: 'Priority',
                name: 'priority',
                type: 'string',
                placeholder: 'High, Medium, Low',
                description: 'A field to prioritize test cases (e.g., High, Medium, Low).'
            },
            {
                label: 'Scenario',
                name: 'scenario',
                type: 'string',
                placeholder: 'Scenario description',
                description: 'Scenario description'
            },      
            {
                label: 'Background',
                name: 'background',
                type: 'string',
                placeholder: 'Background description',
                description: 'This context includes any preconditions or setup steps that are necessary for all scenarios to run'
            },
            {
                label: 'Given',
                name: 'given',
                type: 'string',
                placeholder: 'Capture the initial state or context before the action',
                description: 'Mandatory field. Capture the initial state or context before the action.'
            },
            {
                label: 'When',
                name: 'when',
                type: 'string',
                placeholder: 'Describe the user action or system event being tested',
                description: 'Mandatory field. Describe the user action or system event being tested.'
            },
            {
                label: 'Then',
                name: 'then',
                type: 'string',
                placeholder: 'Specify the expected outcome or verification after the action',
                description: 'Mandatory field. Specify the expected outcome or verification after the action.'
            },
            {
                label: 'And/But (Optional)',
                name: 'andBut',
                type: 'string',
                placeholder: 'Add additional steps using these keywords',
                description: 'Optional field. Add additional steps using "And" or "But" keywords.'
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const nodeIds = (nodeData.inputs?.nodeIds as string)?.trim().split(',') || []
        const fileKey = nodeData.inputs?.fileKey as string
        const textSplitter = nodeData.inputs?.textSplitter as TextSplitter
        const metadata = nodeData.inputs?.metadata

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const accessToken = getCredentialParam('accessToken', credentialData, nodeData)

        const figmaOptions: FigmaLoaderParams = {
            accessToken,
            nodeIds,
            fileKey
        }

        const loader = new FigmaFileLoader(figmaOptions)

        const docs = textSplitter ? await loader.loadAndSplit() : await loader.load()

        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata)
            return docs.map((doc) => {
                return {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                }
            })
        }

        return docs
    }
}

module.exports = { nodeClass: Figma_DocumentLoaders }
