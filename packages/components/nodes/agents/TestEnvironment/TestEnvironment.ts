import { INode, INodeParams } from '../../../src/Interface'

class TestEnvironment_Documentation implements INode {
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
        this.label = 'Test Environment'
        this.name = 'TestEnvironmentNode'
        this.version = 1.0
        this.type = 'TestEnvironmentNode'
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Name',
                name: 'name',
                type: 'string',
                description: 'Description of the test phase.'
            },
            {
                label: 'URL',
                name: 'url',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Database',
                name: 'database',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Credentials',
                name: 'credentials',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true
            },
            {
                label: 'Tools',
                name: 'tools',
                type: 'string',
                description: 'Tools used for the checks.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: TestEnvironment_Documentation
}