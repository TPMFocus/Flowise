import { Request, response } from 'express'
import { IncomingInput, IMessage } from '../Interface'
import { ChatFlow } from '../database/entities/ChatFlow'
import { Server } from 'socket.io'
import { getRunningExpressApp } from '../utils/getRunningExpressApp'
 
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");
 
/**
 * Build Chatflow
 * @param {Request} req
 * @param {Server} socketIO
 * @param {boolean} isInternal
 */
export const utilBuildChatflow = async (req: Request, socketIO?: Server, isInternal: boolean = false): Promise<any> => {
    {
        const appServer = getRunningExpressApp()
        const chatflowid = req.params.id
        let incomingInput: IncomingInput = req.body
        const chatflow = await appServer.AppDataSource.getRepository(ChatFlow).findOneBy({
            id: chatflowid
        })            
 
        const startSession = async (data: string) => {
            try {
                const response = await fetch('http://127.0.0.1:5000/start-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: data, session_id: chatflowid }),
                });
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                const result = await response.json();
                console.log('Réponse du microservice flask:', result);
                return result.session_id;
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }
        };
 
        const generateText = async (data: string) => {
            try {
                const response = await fetch('http://127.0.0.1:5000/generate-text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: chatflowid, prompt: data }),
                });
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                const result = await response.json();
                console.log('Réponse du microservice flask:', result);
                return result.generated_text;
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }
        };

        const clearChat = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/clear-chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: chatflowid }),
                });
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                const result = await response.json();
                console.log('Réponse du microservice flask:', result);
                return result.generated_text;
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }
        };

       
        const generatedResponse = await generateText(incomingInput.question);
        const clearChatHistory = await clearChat();
       
        return generatedResponse.toString()
    }
}