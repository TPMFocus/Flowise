import { INode, INodeParams } from '../../../src/Interface'

class TestStrategy_Documentation implements INode {
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
        this.label = 'Test Strategy'
        this.name = 'testStrategyNode'
        this.version = 1.0
        this.type = 'TestStrategyNode'
        this.icon = 'teststrategy.svg'
        this.category = 'Main Nodes'
        this.description = `General testing strategy for the project`
        this.baseClasses = [this.type]
        this.inputs = [
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
                description: 'Description of the test strategy.',
                optional: true
            },
            {
                label: 'Data Considerations',
                name: 'dataConsiderations',
                type: 'string',
                rows: 4,
                description: 'Overview of the test plan, detailing scope, resources, schedule, and testing phases.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: TestStrategy_Documentation
}