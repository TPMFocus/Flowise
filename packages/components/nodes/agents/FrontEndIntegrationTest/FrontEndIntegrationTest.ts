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
        this.description = `Test verifying interaction between UI elements and their backend data flow.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'IntegrationTestNode',
                optional: true
            },
            {
                label: 'Integration Scope',
                name: 'IntegrationScope',
                type: 'string',
                description: 'Specific components and functionalities within the frontend that interact with backend services.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Front End Technology',
                name: 'FrontEndTechnology',
                type: 'string',
                description: 'Tools and frameworks used to build the user interface (HTML, CSS, JavaScript libraries) under test.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: FrontEndIntegrationTest_Documentation
}