import { INode, INodeParams } from '../../../src/Interface'

class UnitTestCase_Documentation implements INode {
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
        this.label = 'Unit Test Case'
        this.name = 'UnitTestNode'
        this.version = 1.0
        this.type = 'UnitTestNode'
        this.icon = 'unittestcase.svg'
        this.category = 'Unit Test Nodes'
        this.description = `Isolated test designed to verify the functionality of a single software unit (e.g., function, class, module) in isolation from other parts of the code.`
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
                label: 'Description',
                name: 'description',
                type: 'string',
                rows: 4,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Priority',
                name: 'priority',
                type: 'options',
                options: [
                    { label: 'High', name: 'High' },
                    { label: 'Medium', name: 'Medium' },
                    { label: 'Low', name: 'Low' }
                ],
                optional: true
            },
            {
                label: 'Tags',
                name: 'tags',
                type: 'string',
                optional: true
            },
            {
                label: 'Target Layer',
                name: 'targetLayer',
                type: 'options',
                options: [
                    { label: 'Front-End', name: 'Front-End' },
                    { label: 'Back-End', name: 'Back-End' }
                ],
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: UnitTestCase_Documentation
}
