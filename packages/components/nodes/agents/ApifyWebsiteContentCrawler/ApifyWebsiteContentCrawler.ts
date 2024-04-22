import { INode, INodeData, INodeParams, ICommonObject } from '../../../src/Interface'
import { getCredentialData, getCredentialParam } from '../../../src/utils'
import { TextSplitter } from 'langchain/text_splitter'
import { ApifyDatasetLoader } from 'langchain/document_loaders/web/apify_dataset'
import { Document } from '@langchain/core/documents'

class ApifyWebsiteContentCrawler_DocumentLoaders implements INode {
    label: string
    name: string
    description: string
    type: string
    icon: string
    version: number
    category: string
    baseClasses: string[]
    inputs: INodeParams[]
    credential: INodeParams

    constructor() {
        this.label = 'Test Environment'
        this.name = 'TestEnvironment'
        this.type = 'Test Environment'
        this.icon = 'apify-symbol-transparent.svg'
        this.version = 2.0
        this.category = 'Design Nodes'
        this.description = 'Load data from Apify Website Content Crawler'
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'Test Strategy',
                optional: true,
                description: 'Cache connection details.'
            },
            {
                label: 'Environment Name',
                name: 'environmentName',
                type: 'string',
                description: 'Name of the testing environment (e.g., Development).'
            },
            {
                label: 'URL',
                name: 'urls',
                type: 'string',
                description: 'One or more URLs of pages where the crawler will start, separated by commas.',
                placeholder: 'https://js.langchain.com/docs/'
            },
            {
                label: 'Database Connection Details',
                name: 'databaseConnection',
                type: 'string',
                optional: true,
                description: 'Credentials for accessing the database.'
            },
            {
                label: 'Credentials ',
                name: 'credentials',
                type: 'string',
                optional: true,
                description: 'Authentication details for the environment.'
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const textSplitter = nodeData.inputs?.textSplitter as TextSplitter
        const metadata = nodeData.inputs?.metadata

        // Get input options and merge with additional input
        const urls = nodeData.inputs?.urls as string
        const crawlerType = nodeData.inputs?.crawlerType as string
        const maxCrawlDepth = nodeData.inputs?.maxCrawlDepth as string
        const maxCrawlPages = nodeData.inputs?.maxCrawlPages as string
        const additionalInput =
            typeof nodeData.inputs?.additionalInput === 'object'
                ? nodeData.inputs?.additionalInput
                : JSON.parse(nodeData.inputs?.additionalInput as string)
        const input = {
            startUrls: urls.split(',').map((url) => ({ url: url.trim() })),
            crawlerType,
            maxCrawlDepth: parseInt(maxCrawlDepth, 10),
            maxCrawlPages: parseInt(maxCrawlPages, 10),
            ...additionalInput
        }

        // Get Apify API token from credential data
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const apifyApiToken = getCredentialParam('apifyApiToken', credentialData, nodeData)

        const loader = await ApifyDatasetLoader.fromActorCall('apify/website-content-crawler', input, {
            datasetMappingFunction: (item) =>
                new Document({
                    pageContent: (item.text || '') as string,
                    metadata: { source: item.url }
                }),
            clientOptions: {
                token: apifyApiToken
            }
        })

        let docs = []

        if (textSplitter) {
            docs = await loader.loadAndSplit(textSplitter)
        } else {
            docs = await loader.load()
        }

        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata)
            let finaldocs = []
            for (const doc of docs) {
                const newdoc = {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                }
                finaldocs.push(newdoc)
            }
            return finaldocs
        }

        return docs
    }
}

module.exports = { nodeClass: ApifyWebsiteContentCrawler_DocumentLoaders }
