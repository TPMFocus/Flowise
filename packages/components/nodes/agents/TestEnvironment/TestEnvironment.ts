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
        this.icon = 'testenvironment.svg'
        this.category = 'Main Nodes'
        this.description = `Isolated system replica for running tests without impacting production.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Name',
                name: 'name',
                type: 'string'
            },
            {
                label: 'URL',
                name: 'url',
                type: 'string',
                description: 'URL of the test environment.',
                optional: true
            },
            {
                label: 'Database',
                name: 'database',
                type: 'string',
                description: 'Database used for the tests.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Credentials',
                name: 'credentials',
                type: 'string',
                description: 'Credentials for the test environment.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Tools',
                name: 'tools',
                type: 'string',
                description: 'Tools used for the tests.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: TestEnvironment_Documentation
}