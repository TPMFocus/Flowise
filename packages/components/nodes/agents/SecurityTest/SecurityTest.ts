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
        this.icon = 'gitbook.svg'
        this.category = 'Unit Test Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'TestSuiteNode',
                optional: true
            },
            {
                label: 'Title',
                name: 'title',
                type: 'string',
                description: 'Title of the test strategy.'
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                rows: 4,
                description: 'Description of the test phase.',
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
                description: 'Description of the test phase.',
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
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: SecurityTestCase_Documentation
}