import { INode, INodeParams } from '../../../src/Interface'

class PerformanceTest_Documentation implements INode {
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
        this.label = 'Performace Test Case'
        this.name = 'PerformanceTestNode'
        this.version = 1.0
        this.type = 'PerformanceTestNode'
        this.icon = 'performancetest.svg'
        this.category = 'Test Case Nodes'
        this.description = `Evaluation of software's responsiveness, stability, and scalability under a specific load.`
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
                label: 'Metrics',
                name: 'metrics',
                type: 'datagrid',
                description: 'Metrics to be measured for the performance test.',
                datagrid : [
                    {field: 'Metric', label: 'Metric', type: 'string', flex:1, editable: true},
                    {field: 'Value', label: 'Value', type: 'number', editable: true}
                ],
                default: [
                    {
                        Metric: 'Response Time', 
                        Value: 0
                    },
                    {
                        Metric: 'Throughput', 
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
        ]
    }
}

module.exports = {
    nodeClass: PerformanceTest_Documentation
}