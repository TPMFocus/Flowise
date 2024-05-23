import { INode, INodeParams } from '../../../src/Interface'

class AutomatedTestCase_Documentation implements INode {
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
        this.label = 'Automated Test Case'
        this.name = 'AutomatedTestCaseNode'
        this.version = 1.0
        this.type = 'AutomatedTestCaseNode'
        this.icon = 'automatedtestcase.svg'
        this.category = 'Automated Test'
        this.description = `Pre-defined routines that execute test logic without manual intervention.`
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
                optional: true
            },
            {
                label: 'Tags',
                name: 'tags',
                type: 'string',
                description: '',
                optional: true
            },
            {
                label: 'Preconditions',
                name: 'preconditions',
                type: 'string',
                rows: 4,
                description: 'The required initial conditions for a test case to run properly.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Postconditions',
                name: 'postconditions',
                type: 'string',
                rows: 4,
                description: 'The expected state of the system after a test case executes.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Expected Results',
                name: 'expectedResults',
                type: 'string',
                rows: 2,
                description: 'The anticipated outcome a tester predicts for a test case, compared to the actual results to identify bugs.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Actual Results',
                name: 'actualResults',
                type: 'string',
                rows: 2,
                description: 'The observed behavior of the system after running a test case.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Script Location',
                name: 'scriptLocation',
                type: 'string',
                description: 'The path to the test script file.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Programming Language',
                name: 'programmingLanguage',
                type: 'string',
                description: 'The programming language used to write the test script.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Framework',
                name: 'framework',
                type: 'string',
                description: 'The testing framework used to execute the test script.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Maintenance Effort',
                name: 'maintenanceEffort',
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
                label: 'Dependencies',
                name: 'dependencies',
                type: 'string',
                rows: 2,
                description: 'List of dependencies for the automated test case.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: AutomatedTestCase_Documentation
}