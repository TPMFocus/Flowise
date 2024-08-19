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
        this.description = `Test verifying how multiple software modules or systems work together as a whole.`
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
                optional: true,
                additionalParams: true
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
                optional: true,
                additionalParams: true
            },
            {
                label: 'Tags',
                name: 'tags',
                type: 'string',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Target Layer',
                name: 'targetLayer',
                type: 'options',
                options: [
                    {label: 'Front-End', name: 'Front-End'}, 
                    {label: 'Back-End', name: 'Back-End'}
                ],
                optional: true,
                additionalParams: true
            }
        ]
    }
}

module.exports = {
    nodeClass: IntegrationTestCase_Documentation
}