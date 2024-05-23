import { INode, INodeParams } from '../../../src/Interface'

class TestPhase_Documentation implements INode {
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
        this.label = 'Test Phase'
        this.name = 'TestingPhaseNode'
        this.version = 1.0
        this.type = 'TestingPhaseNode'
        this.icon = 'testphase.svg'
        this.category = 'Main Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'TestStrategyNode',
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
                label: 'Start Date',
                name: 'startDate',
                type: 'date',
                description: 'Start date of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'End Date',
                name: 'endDate',
                type: 'date',
                description: 'End date of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Estimation',
                name: 'estimation',
                type: 'string',
                description: 'Estimation of the test phase.',
                optional: true,
                additionalParams : true
            },
        ]
    }
}

module.exports = {
    nodeClass: TestPhase_Documentation
}