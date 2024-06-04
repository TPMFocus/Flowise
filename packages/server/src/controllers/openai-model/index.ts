import { Request, Response } from 'express'
import axios from 'axios'

const FLASK_API_BASE_URL = 'http://localhost:5000'

const startSession = async (req: Request, res: Response) => {
    const userId = req.body.user_id

    try {
        const response = await axios.post(`${FLASK_API_BASE_URL}/start-session`, { user_id: userId })
        res.status(200).json(response.data)
    } catch (error) {
        console.error('Error starting session:', error)
        res.status(500).json({ error: 'Failed to start session' })
    }
}

const generateText = async (req: Request, res: Response) => {
    const { session_id, question } = req.body

    if (!session_id || !question) {
        return res.status(400).json({ error: 'Session ID and question are required' })
    }

    try {
        const response = await axios.post(`${FLASK_API_BASE_URL}/generate-text`, { session_id, prompt: question })
        res.status(200).json(response.data)
    } catch (error) {
        console.error('Error generating text:', error)
        res.status(500).json({ error: 'Failed to generate text' })
    }
}

export default {
    startSession,
    generateText
}
