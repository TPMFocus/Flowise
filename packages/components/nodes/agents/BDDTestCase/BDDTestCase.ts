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
        this.icon = 'bddtestcase.svg'
        this.category = 'Test Case Nodes'
        this.description = `User-focused test scenario written in plain language.`
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
                label: 'Background',
                name: 'background',
                type: 'string',
                description: 'Shared setup steps for BDD scenarios in a feature file.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Scenario',
                name: 'scenario',
                type: 'string',
                rows: 4,
                description: 'Specific user behavior example within a feature.',
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
                optional: true,
                additionalParams : true
            },
            {
                label: 'Tags',
                name: 'tags',
                type: 'string',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Gherkin Steps',
                name: 'gherkinSteps',
                type: 'datagrid',
                description: 'Structured actions in a BDD scenario using keywords like Given, When, Then.',
                datagrid : [
                    {field: 'Keyword', headerName: 'Keyword', type: 'singleSelect', valueOptions:['Given', 'When', 'Then', 'And', 'But'], editable: true},
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