import { load } from 'js-yaml'
import { BaseLanguageModel } from '@langchain/core/language_models/base'
import { OpenApiToolkit } from 'langchain/agents'
import { JsonSpec, JsonObject } from './core'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getCredentialData, getCredentialParam } from '../../../src'

class OpenAPIToolkit_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'Integration Node'
        this.name = 'IntegrationNode'
        this.version = 1.0
        this.type = 'Integration Node'
        this.icon = 'openapi.svg'
        this.category = 'Design Nodes'
        this.description = 'Load OpenAPI specification'
        this.inputs = [
            {
                label: 'Test Step',
                name: 'TestStep',
                type: 'Test Step',
                optional: true
            },
            {
                label: 'Manual Test',
                name: 'ManualTest',
                type: 'Manual Test',
                optional: true
            },
            {
                label: 'Automated Test',
                name: 'AutomatedTest',
                type: 'Automated Test',
                optional: true
            },
            {
                label: 'BDD Test',
                name: 'BDDTest',
                type: 'BDD Test',
                optional: true
            },
            {
                label: 'JIRA URL',
                name: 'jiraUrl',
                type: 'string',
                description: 'Mandatory field. URL of the JIRA instance.'
            },
            {
                label: 'Project Key',
                name: 'projectKey',
                type: 'string',
                optional: true,
                description: 'Optional field. Key of the JIRA project.'
            },
            {
                label: 'Authentication Details',
                name: 'authenticationDetails',
                type: 'string',
                optional: true,
                description: 'Optional field. Authentication details for accessing JIRA.'
            },
            {
                label: 'Traceability Matrix',
                name: 'traceabilityMatrix',
                type: 'file',
                fileType: '.url, .pdf, .docx',
                description: 'Link or reference to the separate document mapping requirements to test cases (e.g., a URL or file path).'
            }
        ]

        this.baseClasses = [this.type, 'Tool']
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const model = nodeData.inputs?.model as BaseLanguageModel
        const yamlFileBase64 = nodeData.inputs?.yamlFile as string

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const openAPIToken = getCredentialParam('openAPIToken', credentialData, nodeData)

        const splitDataURI = yamlFileBase64.split(',')
        splitDataURI.pop()
        const bf = Buffer.from(splitDataURI.pop() || '', 'base64')
        const utf8String = bf.toString('utf-8')
        const data = load(utf8String) as JsonObject
        if (!data) {
            throw new Error('Failed to load OpenAPI spec')
        }

        const headers: ICommonObject = {
            'Content-Type': 'application/json'
        }
        if (openAPIToken) headers.Authorization = `Bearer ${openAPIToken}`
        const toolkit = new OpenApiToolkit(new JsonSpec(data), model, headers)

        return toolkit.tools
    }
}

module.exports = { nodeClass: OpenAPIToolkit_Tools }
