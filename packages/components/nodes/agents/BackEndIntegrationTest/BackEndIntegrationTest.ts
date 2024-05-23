import { INode, INodeParams } from '../../../src/Interface'

class BackEndIntegrationTest_Documentation implements INode {
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
        this.label = 'Back End Integration Test Case'
        this.name = 'BackEndIntegrationTestNode'
        this.version = 1.0
        this.type = 'BackEndIntegrationTestNode'
        this.icon = 'backendintegrationtest.svg'
        this.category = 'Integration Test Nodes'
        this.description = `Scripts that check how different backend parts interact and function together as a system.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'IntegrationTestNode',
                optional: true
            },
            {
                label: 'Integration Scope',
                name: 'IntegrationScope',
                type: 'string',
                description: 'The breadth of backend components an automated test orchestrates to verify a feature\'s functionality.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Back End Technology',
                name: 'BackEndTechnology',
                type: 'string',
                description: '(e.g., Python, Django, PostgreSQL)',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: BackEndIntegrationTest_Documentation
}