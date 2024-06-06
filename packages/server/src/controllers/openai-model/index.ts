import { Request, Response, NextFunction } from 'express'
import openaiModelService from '../../services/openai-model'


/* const startSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await openaiModelService.startSession(req, res)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
} */

const generateText = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await openaiModelService.generateText(req, res)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const clearChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await openaiModelService.clearChat(req, res)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    //startSession,
    generateText,
    clearChat
};