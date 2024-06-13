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
        this.icon = 'manualteststep.svg'
        this.category = 'Manual Test'
        this.description = `Single action a tester performs during manual testing (e.g., click a button, enter text).`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Test Case',
                name: 'input',
                type: 'ManualTestCaseNode',
                optional: true
            },
            {
                label: 'Test Step',
                name: 'input',
                type: 'ManualTestStepNode',
                optional: true
            },
            {
                label: 'Step ID',
                name: 'stepId',
                type: 'number',
                description: 'Unique identifier for the test step.'
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                rows: 4,
                description: 'Detailed instructions for the tester to follow.',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Required Input',
                name: 'requiredInput',
                type: 'string',
                description: 'Data or information the tester must provide to complete the test step.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Expected Output',
                name: 'expectedOutput',
                type: 'string',
                description: 'Desired result or outcome of the test step.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: ManualTestStep_Documentation
}