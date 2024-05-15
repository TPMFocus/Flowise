import axios from 'axios'
import { BaseLanguageModel } from '@langchain/core/language_models/base'
import { AgentExecutor } from 'langchain/agents'
import { LLMChain } from 'langchain/chains'
import { ICommonObject, INode, INodeData, INodeParams, PromptTemplate } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
import { ConsoleCallbackHandler, CustomChainHandler, additionalCallbacks } from '../../../src/handler'
import { LoadPyodide, finalSystemPrompt, systemPrompt } from './core'

class Airtable_Agents implements INode {
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
        this.label = 'Test Strategy'
        this.name = 'teststrategy'
        this.version = 2.0
        this.type = 'Test Strategy'
        this.category = 'Main Nodes'
        this.icon = 'airtable.svg'
        this.description =
            'La stratégie de test cherche à minimiser les erreurs et à optimiser l`efficacité pour garantir la qualité du produit logiciel'
        this.baseClasses = [this.type, ...getBaseClasses(AgentExecutor)]
        this.inputs = [
            {
                label: 'Title',
                name: 'titleId',
                type: 'string',
                placeholder: 'app11RobdGoX0YNsC',
                description:
                    'If your table URL looks like: https://airtable.com/app11RobdGoX0YNsC/tblJdmvbrgizbYICO/viw9UrP77Id0CE4ee, app11RovdGoX0YNsC is the base id'
            },
            {
                label: 'Description',
                name: 'descriptionId',
                type: 'string',
                placeholder: 'tblJdmvbrgizbYICO',
                description:
                    'If your table URL looks like: https://airtable.com/app11RobdGoX0YNsC/tblJdmvbrgizbYICO/viw9UrP77Id0CE4ee, tblJdmvbrgizbYICO is the table id'
            },
            {
                label: 'Data Considerations',
                name: 'dataConsiderations',
                type: 'string',
                placeholder: 'Specific data requirements or considerations',
                description:
                    'Specify any specific data requirements or considerations for testing (e.g., data types, volume, security)'
            }
        ]
    }

    async init(): Promise<any> {
        // Not used
        return undefined
    }

    async run(nodeData: INodeData, input: string, options: ICommonObject): Promise<string | object> {
        const model = nodeData.inputs?.model as BaseLanguageModel
        const titleId = nodeData.inputs?.titleId as string
        const descriptionId = nodeData.inputs?.descriptionId as string
        const returnAll = nodeData.inputs?.returnAll as boolean
        const limit = nodeData.inputs?.limit as string

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const accessToken = getCredentialParam('accessToken', credentialData, nodeData)

        let airtableData: ICommonObject[] = []

        if (returnAll) {
            airtableData = await loadAll(titleId, descriptionId, accessToken)
        } else {
            airtableData = await loadLimit(limit ? parseInt(limit, 10) : 100, titleId, descriptionId, accessToken)
        }

        let base64String = Buffer.from(JSON.stringify(airtableData)).toString('base64')

        const loggerHandler = new ConsoleCallbackHandler(options.logger)
        const handler = new CustomChainHandler(options.socketIO, options.socketIOClientId)
        const callbacks = await additionalCallbacks(nodeData, options)

        const pyodide = await LoadPyodide()

        // First load the csv file and get the dataframe dictionary of column types
        // For example using titanic.csv: {'PassengerId': 'int64', 'Survived': 'int64', 'Pclass': 'int64', 'Name': 'object', 'Sex': 'object', 'Age': 'float64', 'SibSp': 'int64', 'Parch': 'int64', 'Ticket': 'object', 'Fare': 'float64', 'Cabin': 'object', 'Embarked': 'object'}
        let dataframeColDict = ''
        try {
            const code = `import pandas as pd
import base64
import json

base64_string = "${base64String}"

decoded_data = base64.b64decode(base64_string)

json_data = json.loads(decoded_data)

df = pd.DataFrame(json_data)
my_dict = df.dtypes.astype(str).to_dict()
print(my_dict)
json.dumps(my_dict)`
            dataframeColDict = await pyodide.runPythonAsync(code)
        } catch (error) {
            throw new Error(error)
        }

        // Then tell GPT to come out with ONLY python code
        // For example: len(df), df[df['SibSp'] > 3]['PassengerId'].count()
        let pythonCode = ''
        if (dataframeColDict) {
            const chain = new LLMChain({
                llm: model,
                prompt: PromptTemplate.fromTemplate(systemPrompt),
                verbose: process.env.DEBUG === 'true' ? true : false
            })
            const inputs = {
                dict: dataframeColDict,
                question: input
            }
            const res = await chain.call(inputs, [loggerHandler, ...callbacks])
            pythonCode = res?.text
        }

        // Then run the code using Pyodide
        let finalResult = ''
        if (pythonCode) {
            try {
                const code = `import pandas as pd\n${pythonCode}`
                finalResult = await pyodide.runPythonAsync(code)
            } catch (error) {
                throw new Error(`Sorry, I'm unable to find answer for question: "${input}" using follwoing code: "${pythonCode}"`)
            }
        }

        // Finally, return a complete answer
        if (finalResult) {
            const chain = new LLMChain({
                llm: model,
                prompt: PromptTemplate.fromTemplate(finalSystemPrompt),
                verbose: process.env.DEBUG === 'true' ? true : false
            })
            const inputs = {
                question: input,
                answer: finalResult
            }

            if (options.socketIO && options.socketIOClientId) {
                const result = await chain.call(inputs, [loggerHandler, handler, ...callbacks])
                return result?.text
            } else {
                const result = await chain.call(inputs, [loggerHandler, ...callbacks])
                return result?.text
            }
        }

        return pythonCode
    }
}

interface AirtableLoaderResponse {
    records: AirtableLoaderPage[]
    offset?: string
}

interface AirtableLoaderPage {
    id: string
    createdTime: string
    fields: ICommonObject
}

const fetchAirtableData = async (url: string, params: ICommonObject, accessToken: string): Promise<AirtableLoaderResponse> => {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
        const response = await axios.get(url, { params, headers })
        return response.data
    } catch (error) {
        throw new Error(`Failed to fetch ${url} from Airtable: ${error}`)
    }
}

const loadAll = async (titleId: string, descriptionId: string, accessToken: string): Promise<ICommonObject[]> => {
    const params: ICommonObject = { pageSize: 100 }
    let data: AirtableLoaderResponse
    let returnPages: AirtableLoaderPage[] = []

    do {
        data = await fetchAirtableData(`https://api.airtable.com/v0/${titleId}/${descriptionId}`, params, accessToken)
        returnPages.push.apply(returnPages, data.records)
        params.offset = data.offset
    } while (data.offset !== undefined)

    return data.records.map((page) => page.fields)
}

const loadLimit = async (limit: number, titleId: string, descriptionId: string, accessToken: string): Promise<ICommonObject[]> => {
    const params = { maxRecords: limit }
    const data = await fetchAirtableData(`https://api.airtable.com/v0/${titleId}/${descriptionId}`, params, accessToken)
    if (data.records.length === 0) {
        return []
    }
    return data.records.map((page) => page.fields)
}

module.exports = { nodeClass: Airtable_Agents }
