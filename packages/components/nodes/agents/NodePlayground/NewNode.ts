import { INode, INodeParams } from '../../../src/Interface'

class Node_DocumentLoaders implements INode {
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
        this.label = 'Just a node'
        this.name = 'NodeName'
        this.version = 1.0
        this.type = 'Node Type'
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
        this.description = `Placeholder for a new node`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Node Input 1',
                name: 'testPlan_input',
                type: 'TestPhase',
                description: 'URL of the Gitbook page to load.',
                optional: true
            },
            {
                label: 'Node Input 2',
                name: 'title',
                type: 'string',
                description: 'Name identifying the test plan.'
            },
            {
                label: 'Node Input 3',
                name: 'description',
                type: 'string',
                description: 'Overview of the test plan, detailing scope, resources, schedule, and testing phases.'
            },
            {
                label: 'Node Input 4',
                name: 'dateOfExecution',
                type: 'string',
                description: 'Date when the test case was last executed.',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Node Input 5',
                name: 'estimation',
                type: 'string',
                description: 'Anticipated time required for test execution.',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Node Input 6',
                name: 'riskAssessment',
                type: 'string',
                description: 'Reference to a risk assessment document (optional).',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Node Input 7',
                name: 'dataRequirements',
                type: 'string',
                description: 'Specific data needed for each testing phase.',
                optional: true,
                additionalParams: true
            }
        ]
    }
}

module.exports = {
    nodeClass: Node_DocumentLoaders
}
