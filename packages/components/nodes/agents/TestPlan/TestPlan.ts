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
        this.version = 1.0
        this.type = 'TestPlanNode'
        this.icon = 'testplan.svg'
        this.category = 'Main Nodes'
        this.description = 'Description.'
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
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
                label: 'Number of Assigned Testers',
                name: 'numberOfAssignedTesters',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams : true
            },
            {
                label: 'Date of execution',
                name: 'dateOfExecution',
                type: 'string',
                description: 'Date of execution of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Estimation',
                name: 'estimation',
                type: 'string',
                description: 'Estimation of the test plan.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Risk Assessment',
                name: 'riskAssessment',
                type: 'string',
                rows: 4,
                description: 'Risk assessment of the test plan.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Data Requirements',
                name: 'dataRequirements',
                type: 'string',
                rows: 4,
                description: 'Data requirements of the test plan.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Overall Execution Results',
                name: 'overallExecutionResults',
                type: 'string',
                rows: 2,
                description: 'Overall execution results of the test plan.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: TestPlan_Documentation
}