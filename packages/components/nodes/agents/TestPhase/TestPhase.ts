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
        this.description = `Dedicated stage in software development focused on identifying and fixing bugs before launch.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'TestStrategyNode',
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
                additionalParams : true
            },
            {
                label: 'Start Date',
                name: 'startDate',
                type: 'string',
                description: 'Start date of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'End Date',
                name: 'endDate',
                type: 'string',
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