import { Request, Response } from 'express';
import axios from 'axios';

const FLASK_API_BASE_URL = 'http://127.0.0.1:5000';



/* const startSession = async (req: Request, res: Response) => {
    const userId = req.body.user_id;

    try {
        const response = await axios.post(`${FLASK_API_BASE_URL}/start-session`, { "user_id": userId }, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
        return {
            session_id: response.data.session_id
        }
    } catch (error) {
        console.error('Error starting session:', error);
        res.status(500).json({ error: 'Failed to start session' });
    }
}; */

const generateText = async (req: Request, res: Response) => {
    const { session_id, question } = req.body;

    if (!session_id || !question) {
        return res.status(400).json({ error: 'Session ID and question are required' });
    }

    try {
        const response = await axios.post(`${FLASK_API_BASE_URL}/generate-text`, { session_id: session_id, prompt: question }, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
        return {
            generatedText: response.data.generated_text
        }
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'Failed to generate text' });
    }
};

const clearChat = async (req: Request, res: Response) => {
    const { session_id } = req.body;

    if (!session_id) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const response = await axios.post(`${FLASK_API_BASE_URL}/clear-chat`, { session_id: session_id }, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
        return {
            message: response.data.message
        }
    } catch (error) {
        console.error('Error clearing chat:', error);
        res.status(500).json({ error: 'Failed to clear chat' });
    }
};

export default {
    //startSession,
    generateText,
    clearChat
};
