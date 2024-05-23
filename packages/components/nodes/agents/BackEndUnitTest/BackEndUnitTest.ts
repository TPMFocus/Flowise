import { INode, INodeParams } from '../../../src/Interface'

class BackEndUnitTest_Documentation implements INode {
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
        this.label = 'Back End Unit Test Case'
        this.name = 'BackEndUnitTestNode'
        this.version = 1.0
        this.type = 'BackEndUnitTestNode'
        this.icon = 'backendunittest.svg'
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
                label: 'Unit Test Class',
                name: 'UnitTestClass',
                type: 'string',
                description: 'Title of the test strategy.'
            },
            {
                label: 'Mocking Framework',
                name: 'Mocking',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: BackEndUnitTest_Documentation
}