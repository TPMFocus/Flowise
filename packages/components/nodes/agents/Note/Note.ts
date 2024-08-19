import { INode, INodeParams } from '../../../src/Interface'

class Note implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'Note'
        this.name = 'NoteNode'
        this.version = 1.0
        this.type = 'StickyNote'
        this.icon = 'note.svg'
        this.category = 'Main Nodes'
        this.description = 'Add a sticky note'
        this.inputs = [
            {
                label: '',
                name: 'note',
                type: 'string',
                rows: 1,
                placeholder: 'Type something here',
                optional: true
            }
        ]
        this.baseClasses = [this.type]
    }

    async init(): Promise<any> {
        return new Note()
    }
}

module.exports = { nodeClass: Note }