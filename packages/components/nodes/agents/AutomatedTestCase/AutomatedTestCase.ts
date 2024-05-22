import { INode, INodeParams } from '../../../src/Interface'

class AutomatedTestCase_Documentation implements INode {
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
        this.label = 'Automated Test Case'
        this.name = 'AutomatedTestCaseNode'
        this.version = 1.0
        this.type = 'AutomatedTestCaseNode'
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
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
                label: 'Preconditions',
                name: 'preconditions',
                type: 'string',
                rows: 4,
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Postconditions',
                name: 'postconditions',
                type: 'string',
                rows: 4,
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Expected Results',
                name: 'expectedResults',
                type: 'string',
                rows: 2,
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Actual Results',
                name: 'actualResults',
                type: 'string',
                rows: 2,
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Script Location',
                name: 'scriptLocation',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Programming Language',
                name: 'programmingLanguage',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Framework',
                name: 'framework',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Maintenance Effort',
                name: 'maintenanceEffort',
                type: 'options',
                options: [
                    {label: 'High', name: 'High'}, 
                    {label: 'Medium', name: 'Medium'}, 
                    {label: 'Low', name: 'Low'}
                ],
                optional: true,
                additionalParams : true
            },
            {
                label: 'Dependencies',
                name: 'dependencies',
                type: 'string',
                rows: 2,
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: AutomatedTestCase_Documentation
}