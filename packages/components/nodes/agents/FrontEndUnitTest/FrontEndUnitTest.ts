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
        this.icon = 'gitbook.svg'
        this.category = 'Unit Test Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'UnitTestNode',
                optional: true
            },
            {
                label: 'UI Test Framework',
                name: 'UITestFramework',
                type: 'string',
                description: 'Title of the test strategy.'
            },
            {
                label: 'UI Elements',
                name: 'UIElements',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: FrontEndUnitTest_Documentation
}