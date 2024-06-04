import express from 'express'
import openaiModelController from '../../controllers/openai-model'
const router = express.Router()

// Routes for OpenAI Model
router.post('/start-session', openaiModelController.startSession)
router.post('/generate-text', openaiModelController.generateText)

export default router
