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
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Date of Execution',
                name: 'dateOfExecution',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Estomation',
                name: 'estomation',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Real Execution Time',
                name: 'realExecutionTime',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Execution Status',
                name: 'passFailStatus',
                type: 'options',
                options: [
                    {label: 'Pass', name: 'Pass'}, 
                    {label: 'Fail', name: 'Fail'}
                ],
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: ExecutionDetails_Documentation
}