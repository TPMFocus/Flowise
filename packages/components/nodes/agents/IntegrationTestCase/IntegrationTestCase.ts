import { INode, INodeParams } from '../../../src/Interface'

class IntegrationTestCase_Documentation implements INode {
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
        this.label = 'Integration Test Case'
        this.name = 'IntegrationTestNode'
        this.version = 1.0
        this.type = 'IntegrationTestNode'
        this.icon = 'integrationtestcase.svg'
        this.category = 'Integration Test Nodes'
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
                label: 'Target Layer',
                name: 'targetLayer',
                type: 'options',
                options: [
                    {label: 'Front-End', name: 'Front-End'}, 
                    {label: 'Back-End', name: 'Back-End'}
                ],
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: IntegrationTestCase_Documentation
}