import { INode, INodeParams } from '../../../src/Interface'

class ManualTestCase_Documentation implements INode {
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
        this.label = 'Manual Test Case'
        this.name = 'ManualTestCaseNode'
        this.version = 1.0
        this.type = 'ManualTestCaseNode'
        this.icon = 'manualtestcase.svg'
        this.category = 'Manual Test'
        this.description = `Step-by-step instructions for a tester to verify software functionality without automation tools.`
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
                label: 'Tags',
                name: 'tags',
                type: 'string',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Preconditions',
                name: 'preconditions',
                type: 'string',
                rows: 4,
                description: 'Requirements that must be met before a test case can be executed.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Postconditions',
                name: 'postconditions',
                type: 'string',
                rows: 4,
                description: 'Expected state or outcome after a test case is executed.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Expected Results',
                name: 'expectedResults',
                type: 'string',
                rows: 2,
                description: 'Expected Outcome  (or Expected Behavior)',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Actual Results',
                name: 'actualResults',
                type: 'string',
                rows: 2,
                description: 'Actual Outcome (or Observed Behavior)',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Test Data',
                name: 'testData',
                type: 'file',
                description: 'Sample input values used to trigger specific scenarios during testing.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Assigned Testers',
                name: 'assignedTesters',
                type: 'string',
                rows: 2,
                description: 'Individuals designated to execute the specific test case.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: ManualTestCase_Documentation
}