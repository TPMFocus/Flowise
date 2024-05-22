import { INode, INodeParams } from '../../../src/Interface'

class UIInteraction_Documentation implements INode {
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
        this.label = 'UI Interaction'
        this.name = 'UIInteractionNode'
        this.version = 1.0
        this.type = 'UIInteractionNode'
        this.icon = 'gitbook.svg'
        this.category = 'Main Nodes'
        this.description = `The testing phase is the process of evaluating software to ensure it meets the required specifications and quality standards.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'AutomatedTestCaseNode',
                optional: true
            },
            {
                label: 'Element',
                name: 'elementType',
                type: 'string',
                description: 'Title of the test strategy.',
                additionalParams : true
            },
            {
                label: 'Identifier',
                name: 'identifier',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Action',
                name: 'action',
                type: 'string',
                rows: 4,
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Value',
                name: 'value',
                type: 'string',
                description: 'Description of the test phase.',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: UIInteraction_Documentation
}