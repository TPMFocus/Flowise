import { SearchApi } from '@langchain/community/tools/searchapi'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class SearchAPI_Tools implements INode {
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
        this.label = 'Execution Details'
        this.name = 'ExecutionDetails'
        this.version = 1.0
        this.type = 'ExecutionDetails'
        this.icon = 'searchapi.svg'
        this.category = 'Additional Nodes'
        this.description = 'Real-time API for accessing Google Search data'
        this.inputs = [
            {
                label: 'Manual Test',
                name: 'ManualTest',
                type: 'Manual Test',
                optional: true
            },
            {
                label: 'Automated Test',
                name: 'automatedtest',
                type: 'Automated Test',
                optional: true
            },
            {
                label: 'BDD Test',
                name: 'BDDTest',
                type: 'BDD Test',
                optional: true
            },
            {
                label: 'Date of Execution',
                name: 'dateOfExecution',
                type: 'string',
                description: 'Manual field. Date when the test case was last executed.'
            },

            {
                label: 'Estimation',
                name: 'estimation',
                type: 'string',
                optional: true,
                description: 'Optional field. Anticipated time required for test execution.'
            },
            {
                label: 'Real Execution Time',
                name: 'realExecutionTime',
                type: 'string',
                description: 'Manual field. Actual time spent executing the test.'
            },
            {
                label: 'Status',
                name: 'passFailStatus',
                type: 'options',
                options: [
                    {
                        label: 'Pass',
                        name: 'Pass',
                        description: 'Test case passed successfully.'
                    },
                    {
                        label: 'Fail',
                        name: 'Fail',
                        description: 'Test case failed.'
                    }
                ]
            }
        ]

        this.baseClasses = [this.type, ...getBaseClasses(SearchApi)]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const searchApiKey = getCredentialParam('searchApiKey', credentialData, nodeData)
        return new SearchApi(searchApiKey)
    }
}

module.exports = { nodeClass: SearchAPI_Tools }
