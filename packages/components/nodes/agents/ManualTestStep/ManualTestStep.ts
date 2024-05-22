import { INode, INodeParams } from '../../../src/Interface'

class ManualTestStep_Documentation implements INode {
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
        this.label = 'Manual Test Step'
        this.name = 'TestStepNode'
        this.version = 1.0
        this.type = 'TestStepNode'
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'ManualTestCaseNode',
                optional: true
            },
            {
                label: 'Step ID',
                name: 'stepId',
                type: 'number',
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
                label: 'Required Input',
                name: 'requiredInput',
                type: 'string',
                description: 'Start date of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Expected Output',
                name: 'expectedOutput',
                type: 'string',
                description: 'Start date of the test phase.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: ManualTestStep_Documentation
}