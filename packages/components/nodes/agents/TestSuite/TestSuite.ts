import { INode, INodeParams } from '../../../src/Interface'

class TestSuite_Documentation implements INode {
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
        this.label = 'Test Suite'
        this.name = 'TestSuiteNode'
        this.version = 1.0
        this.type = 'TestSuiteNode'
        this.icon = 'testsuite.svg'
        this.category = 'Main Nodes'
        this.description = `Collection of organized test cases designed to be run together for a specific functionality or feature.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'TestPlanNode',
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
                label: 'Exit Criteria',
                name: 'exitCriteria',
                type: 'string',
                rows: 4,
                description: 'Conditions that must be met before the test suite can be considered complete.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: TestSuite_Documentation
}