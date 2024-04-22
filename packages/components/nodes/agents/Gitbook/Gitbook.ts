import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { TextSplitter } from 'langchain/text_splitter'
import { GitbookLoader } from 'langchain/document_loaders/web/gitbook'

class Gitbook_DocumentLoaders implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs?: INodeParams[]

    constructor() {
        this.label = 'Test Plan'
        this.name = 'testplan'
        this.version = 1.0
        this.type = 'Test Plan'
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
        this.description = `Load data related to a test plan`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Title',
                name: 'title',
                type: 'string',
                description: 'Name identifying the test plan.'
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                description: 'Overview of the test plan, detailing scope, resources, schedule, and testing phases.'
            },
            {
                label: 'Date of Execution',
                name: 'dateOfExecution',
                type: 'string',
                description: 'Date when the test case was last executed.'
            },
            {
                label: 'Estimation',
                name: 'estimation',
                type: 'string',
                optional: true,
                description: 'Anticipated time required for test execution.'
            },
            {
                label: 'Risk Assessment',
                name: 'riskAssessment',
                type: 'string',
                optional: true,
                description: 'Reference to a risk assessment document (optional).'
            },
            {
                label: 'Data Requirements',
                name: 'dataRequirements',
                type: 'string',
                optional: true,
                description: 'Specific data needed for each testing phase.'
            }
        ]
    }
    async init(nodeData: INodeData): Promise<any> {
        const webPath = nodeData.inputs?.webPath as string
        const shouldLoadAllPaths = nodeData.inputs?.shouldLoadAllPaths as boolean
        const textSplitter = nodeData.inputs?.textSplitter as TextSplitter
        const metadata = nodeData.inputs?.metadata

        const loader = shouldLoadAllPaths ? new GitbookLoader(webPath, { shouldLoadAllPaths }) : new GitbookLoader(webPath)

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

module.exports = {
    nodeClass: Gitbook_DocumentLoaders
}
