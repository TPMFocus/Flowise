import { INode, INodeParams } from '../../../src/Interface'

class FrontEndIntegrationTest_Documentation implements INode {
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
        this.label = 'Front End Integration Test Case'
        this.name = 'FrontEndIntegrationTestNode'
        this.version = 1.0
        this.type = 'FrontEndIntegrationTestNode'
        this.icon = 'frontendintegrationtest.svg'
        this.category = 'Integration Test Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'IntegrationTestNode',
                optional: true
            },
            {
                label: 'Integration Scope',
                name: 'IntegrationScope',
                type: 'string',
                description: 'Title of the test strategy.'
            },
            {
                label: 'Front End Technology',
                name: 'FrontEndTechnology',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            }
        ]
    }
}

module.exports = {
    nodeClass: FrontEndIntegrationTest_Documentation
}