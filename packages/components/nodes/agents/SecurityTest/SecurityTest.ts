import { INode, INodeParams } from '../../../src/Interface'

class SecurityTestCase_Documentation implements INode {
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
        this.label = 'Security Test Case'
        this.name = 'SecurityTestNode'
        this.version = 1.0
        this.type = 'SecurityTestNode'
        this.icon = 'securitytest.svg'
        this.category = 'Test Case Nodes'
        this.description = `Assessment of a system's vulnerability to unauthorized access, data breaches, or other malicious attacks.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'TestSuiteNode',
                optional: true
            },
            {
                label: 'Title',
                name: 'title',
                type: 'string'
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                rows: 4,
                optional: true
            },
            {
                label: 'Priority',
                name: 'priority',
                type: 'options',
                options: [
                    {label: 'High', name: 'High'}, 
                    {label: 'Medium', name: 'Medium'}, 
                    {label: 'Low', name: 'Low'}
                ],
                optional: true
            },
            {
                label: 'Tags',
                name: 'tags',
                type: 'string',
                optional: true
            },
            {
                label: 'Type',
                name: 'type',
                type: 'options',
                options: [
                    {label: 'Penetration Testing', name: 'Penetration Testing'}, 
                    {label: 'Vulnerability Scanning', name: 'Vulnerability Scanning'},
                    {label: 'Other', name: 'Other'}
                ],
                optional: true,
                additionalParams: true
            }
        ]
    }
}

module.exports = {
    nodeClass: SecurityTestCase_Documentation
}