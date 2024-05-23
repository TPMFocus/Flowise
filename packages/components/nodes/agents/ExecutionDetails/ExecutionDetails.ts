import { INode, INodeParams } from '../../../src/Interface'

class ExecutionDetails_Documentation implements INode {
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
        this.label = 'Execution Details'
        this.name = 'ExecutionDetailsNode'
        this.version = 1.0
        this.type = 'ExecutionDetailsNode'
        this.icon = 'executiondetails.svg'
        this.category = 'Main Nodes'
        this.description = `Execution History (Date, Estimate, Actual Time, Status)`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Date of Execution',
                name: 'dateOfExecution',
                type: 'string',
                description: 'The date at which the test was executed.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Estimation',
                name: 'estimation',
                type: 'string',
                description: 'The estimated time for the test to be executed.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Real Execution Time',
                name: 'realExecutionTime',
                type: 'string',
                description: 'The actual time taken to execute the test.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Execution Status',
                name: 'passFailStatus',
                type: 'options',
                options: [
                    {label: 'Pass', name: 'Pass'}, 
                    {label: 'Fail', name: 'Fail'}
                ],
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: ExecutionDetails_Documentation
}