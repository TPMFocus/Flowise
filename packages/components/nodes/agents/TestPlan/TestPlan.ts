import { INode, INodeParams } from '../../../src/Interface'

class TestPlan_Documentation implements INode {
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
        this.label = 'Test Plan'
        this.name = 'TestPlanNode'
        this.version = 2.0
        this.type = 'TestPlanNode'
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
        this.description = 'Description.'
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'TestingPhaseNode',
                optional: true
            },
            {
                label: 'Environment',
                name: 'inputEnvironment',
                type: 'TestEnvironmentNode',
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
                description: '.',
                optional: true
            },
            {
                label: 'Number of Assigned Testers',
                name: 'numberOfAssignedTesters',
                type: 'number',
                step: 1,
                description: '.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Date of execution',
                name: 'dateOfExecution',
                type: 'date',
                description: '.',
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
            {
                label: 'Risk Assessment',
                name: 'riskAssessment',
                type: 'string',
                rows: 4,
                description: '.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Data Requirements',
                name: 'dataRequirements',
                type: 'string',
                rows: 4,
                description: '.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Overall Execution Results',
                name: 'overallExecutionResults',
                type: 'string',
                rows: 2,
                description: '.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: TestPlan_Documentation
}