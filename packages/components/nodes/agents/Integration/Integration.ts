import { INode, INodeParams } from '../../../src/Interface'

class Integration_Documentation implements INode {
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
        this.label = 'Integration'
        this.name = 'IntegrationNode'
        this.version = 1.0
        this.type = 'IntegrationNode'
        this.icon = 'integration.svg'
        this.category = 'Main Nodes'
        this.description = `Integration with JIRA.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'JIRA URL',
                name: 'JIRA_URL',
                type: 'string',
                description: 'The URL of the JIRA server.',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Project Key',
                name: 'projectkey',
                type: 'string',
                description: 'The key of the project in JIRA.',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Authentication',
                name: 'authentication',
                type: 'password',
                description: 'The authentication token for the JIRA server.',
                optional: true,
                additionalParams: true
            }
        ]
    }
}

module.exports = {
    nodeClass: Integration_Documentation
}