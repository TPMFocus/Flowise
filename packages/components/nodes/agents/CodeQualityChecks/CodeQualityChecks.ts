import { INode, INodeParams } from '../../../src/Interface'

class CodeQualityChecks_Documentation implements INode {
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
        this.label = 'Code Quality Checks'
        this.name = 'CodeQualityChecksNode'
        this.version = 1.0
        this.type = 'CodeQualityChecksNode'
        this.icon = 'codequalitychecks.svg'
        this.category = 'Test Case Nodes'
        this.description = `Automated or manual reviews to ensure code meets coding standards and best practices.`
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
                label: 'Description',
                name: 'description',
                type: 'string',
                rows: 4,
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
                label: 'Checks',
                name: 'checks',
                type: 'datagrid',
                datagrid : [
                    {field: 'Metric', label: 'Metric', type: 'string', flex:1, editable: true},
                    {field: 'Value', label: 'Value', type: 'number', editable: true}
                ],
                default: [
                    {
                        Metric: 'Code Coverage', 
                        Value: 0
                    },
                    {
                        Metric: 'Static Code Analysis', 
                        Value: 0
                    },
                    {
                        Metric: 'Resource Utilization', 
                        Value: 0
                    },
                ],
                optional: true,
                additionalParams : true
            },
            {
                label: 'Tools',
                name: 'tools',
                type: 'string',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: CodeQualityChecks_Documentation
}