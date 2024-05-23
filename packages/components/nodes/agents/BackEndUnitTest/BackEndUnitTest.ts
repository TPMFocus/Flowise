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
        this.description = `Focused scripts that automatically validate individual backend components in isolation.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'UnitTestNode'
            },
            {
                label: 'Unit Test Class',
                name: 'UnitTestClass',
                type: 'string',
                additionalParams : true
            },
            {
                label: 'Mocking Framework',
                name: 'Mocking',
                type: 'string',
                description: '(e.g., Mockito, Mock, PowerMock)',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: BackEndUnitTest_Documentation
}