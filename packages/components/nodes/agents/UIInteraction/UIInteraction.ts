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
        this.icon = 'uiinteraction.svg'
        this.category = 'Automated Test'
        this.description = `Action on a visual element and system's response.`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: '',
                name: 'input',
                type: 'AutomatedTestCaseNode',
                optional: true
            },
            {
                label: 'Element',
                name: 'elementType',
                type: 'options',
                options: [
                    {label: 'Button', name: 'Button'}, 
                    {label: 'Text field', name: 'Text field'}, 
                    {label: 'Link', name: 'Link'},
                    {label: 'Dropdown menu', name: 'Dropdown menu'},
                    {label: 'Checkbox', name: 'Checkbox'},
                    {label: 'Radio Buttons', name: 'Radio Buttons'},
                    {label: 'Slider', name: 'Slider'},
                    {label: 'Toggle Switches', name: 'Toggle Switches'},
                    {label: 'Tab', name: 'Tab'},
                    {label: 'Popup', name: 'Popup'},
                    {label: 'Progress Bars', name: 'Progress Bars'}
                ],
                additionalParams : true
            },
            {
                label: 'Identifier',
                name: 'identifier',
                type: 'string',
                optional: true,
                additionalParams : true
            },
            {
                label: 'Action',
                name: 'action',
                type: 'multiOptions',
                options: [
                    {label: 'Click', name: 'Click'},
                    {label: 'Type', name: 'Type'},
                    {label: 'Drag & Drop', name: 'Drag & Drop'},
                    {label: 'Hover', name: 'Hover'},
                    {label: 'Select', name: 'Select'},
                    {label: 'Swipe', name: 'Swipe'},
                    {label: 'Scroll', name: 'Scroll'},
                    {label: 'Zoom', name: 'Zoom'}
                ],
                optional: true,
                additionalParams : true
            },
            {
                label: 'Value',
                name: 'value',
                type: 'string',
                description: 'Value to be typed or selected (if appliable).',
                optional: true,
                additionalParams : true
            }
        ]
    }
}

module.exports = {
    nodeClass: UIInteraction_Documentation
}