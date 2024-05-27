import { INode, INodeParams } from '../../../src/Interface'

class FrontEndUnitTest_Documentation implements INode {
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
        this.label = 'Front End Unit Test Case'
        this.name = 'FrontEndUnitTestNode'
        this.version = 1.0
        this.type = 'FrontEndUnitTestNode'
        this.icon = 'frontendunittest.svg'
        this.category = 'Unit Test Nodes'
        this.description = `Isolated test of a single frontend component's functionality.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'UnitTestNode',
                optional: true
            },
            {
                label: 'UI Test Framework',
                name: 'UITestFramework',
                type: 'string',
                description: 'The UI test framework used to run the test.',
                additionalParams: true
            },
            {
                label: 'UI Elements',
                name: 'UIElements',
                type: 'string',
                description: 'The UI elements that are being tested.',
                optional: true,
                additionalParams: true
            }
        ]
    }
}

module.exports = {
    nodeClass: FrontEndUnitTest_Documentation
}
