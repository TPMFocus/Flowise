import client from './client'

//const startSession = (user_id) => client.post('/start-session', user_id)
const generateText = (session_id, prompt) => client.post('/generate-text', session_id, prompt)
const clearChat = (session_id) => client.post('/clear-chat', session_id)

export default {
    startSession,
    generateText,
    clearChat
}