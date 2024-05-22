import { INode, INodeParams } from '../../../src/Interface'

class BDDTestCase_Documentation implements INode {
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
        this.label = 'BDD Test Case'
        this.name = 'BDDTestCaseNode'
        this.version = 1.0
        this.type = 'BDDTestCaseNode'
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
                label: 'Background',
                name: 'background',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Scenario',
                name: 'scenario',
                type: 'string',
                rows: 4,
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
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
                label: 'Gherkin Steps',
                name: 'gherkinSteps',
                type: 'datagrid',
                description: 'Estimation of the test phase.',
                datagrid : [
                    {field: 'Keyword', headerName: 'Keyword', type: 'singleSelect', valueOptions:['Given', 'When', 'Then', 'And'], editable: true},
                    {field: 'Text', headerName: 'Text', type: 'string', editable: true, flex: 1}
                ],
                default: [
                    {
                        Keyword: 'Given', 
                        Text: ''
                    },
                    {
                        Keyword: 'When', 
                        Text: ''
                    },
                    {
                        Keyword: 'Then', 
                        Text: ''
                    },
                ],
                optional: true,
                additionalParams : true
            },
        ]
    }
}

module.exports = {
    nodeClass: BDDTestCase_Documentation
}