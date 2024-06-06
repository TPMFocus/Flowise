import express from 'express'
import openaiModelController from '../../controllers/openai-model'

const router = express.Router()

// CREATE
//router.post('/start-session', openaiModelController.startSession)
router.post('/generate-text', openaiModelController.generateText)
router.post('/clear-chat', openaiModelController.clearChat)

export default router
