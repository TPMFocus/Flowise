import { INode, INodeParams } from '../../../src/Interface'

class ThirdPartyChecks_Documentation implements INode {
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
        this.label = 'Third Party Checks'
        this.name = 'ThridPartyChecksNode'
        this.version = 1.0
        this.type = 'ThirdPartyChecksNode'
        this.icon = 'thirdpartychecks.svg'
        this.category = 'Test Case Nodes'
        this.description = `Verification of integrations with external systems or services.`
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
                optional: true
            },
            {
                label: 'Priority',
                name: 'priority',
                type: 'options',
                options: [
                    {label: 'High', name: 'High'}, 
                    {label: 'Medium', name: 'Medium'}, 
                    {label: 'Low', name: 'Low'}
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
                label: 'Type',
                name: 'type',
                type: 'string',
                description: 'Type of the third party check.',
                optional: true,
                additionalParams : true
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
    nodeClass: ThirdPartyChecks_Documentation
}