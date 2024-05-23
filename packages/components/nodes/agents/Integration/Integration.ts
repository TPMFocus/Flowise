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
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'JIRA URL',
                name: 'JIRA_URL',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Project Key',
                name: 'projectkey',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Authentication',
                name: 'authentication',
                type: 'password',
                description: 'Description of the test phase.',
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: Integration_Documentation
}