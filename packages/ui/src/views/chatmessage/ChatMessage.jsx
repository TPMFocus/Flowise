import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import socketIOClient from 'socket.io-client'
import { cloneDeep } from 'lodash'
import rehypeMathjax from 'rehype-mathjax'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import axios from 'axios'

import {
    Box,
    Card,
    CardMedia,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    OutlinedInput
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconSend, IconPhotoPlus, IconTrash, IconTool } from '@tabler/icons'
import robotPNG from '@/assets/images/robot.png'
import userPNG from '@/assets/images/account.png'
import audioUploadSVG from '@/assets/images/wave-sound.jpg'

// project import
import { CodeBlock } from '@/ui-component/markdown/CodeBlock'
import { MemoizedReactMarkdown } from '@/ui-component/markdown/MemoizedReactMarkdown'
import SourceDocDialog from '@/ui-component/dialog/SourceDocDialog'
import ChatFeedbackContentDialog from '@/ui-component/dialog/ChatFeedbackContentDialog'
import StarterPromptsCard from '@/ui-component/cards/StarterPromptsCard'
import { ImageButton, ImageSrc, ImageBackdrop, ImageMarked } from '@/ui-component/button/ImageButton'
import CopyToClipboardButton from '@/ui-component/button/CopyToClipboardButton'
import ThumbsUpButton from '@/ui-component/button/ThumbsUpButton'
import ThumbsDownButton from '@/ui-component/button/ThumbsDownButton'
import './ChatMessage.css'
import './audio-recording.css'

// api
import chatmessageApi from '@/api/chatmessage'
import chatflowsApi from '@/api/chatflows'
import predictionApi from '@/api/prediction'
import chatmessagefeedbackApi from '@/api/chatmessagefeedback'

// Hooks
import useApi from '@/hooks/useApi'

// Const
import { baseURL, maxScroll } from '@/store/constant'

// Utils
import { setLocalStorageChatflow } from '@/utils/genericHelper'

const messageImageStyle = {
    width: '128px',
    height: '128px',
    objectFit: 'cover'
}

export const ChatMessage = ({ open, chatflowid, isDialog, previews, setPreviews }) => {
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)

    const ps = useRef()

    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: 'Hi <User>! How can I help?',
            type: 'apiMessage'
        }
    ])
    const [socketIOClientId, setSocketIOClientId] = useState('')
    const [isChatFlowAvailableToStream, setIsChatFlowAvailableToStream] = useState(false)
    const [sourceDialogOpen, setSourceDialogOpen] = useState(false)
    const [sourceDialogProps, setSourceDialogProps] = useState({})
    const [chatId, setChatId] = useState(undefined)

    const inputRef = useRef(null)
    const getChatmessageApi = useApi(chatmessageApi.getInternalChatmessageFromChatflow)
    const getIsChatflowStreamingApi = useApi(chatflowsApi.getIsChatflowStreaming)
    const getAllowChatFlowUploads = useApi(chatflowsApi.getAllowChatflowUploads)
    const getChatflowConfig = useApi(chatflowsApi.getSpecificChatflow)

    const [starterPrompts, setStarterPrompts] = useState([])
    const [chatFeedbackStatus, setChatFeedbackStatus] = useState(false)
    const [feedbackId, setFeedbackId] = useState('')
    const [showFeedbackContentDialog, setShowFeedbackContentDialog] = useState(false)

    // drag & drop and file input
    const [isChatFlowAvailableForUploads, setIsChatFlowAvailableForUploads] = useState(false)
    const [isDragActive, setIsDragActive] = useState(false)


    const isFileAllowedForUpload = (file) => {
        const constraints = getAllowChatFlowUploads.data
        /**
         * {isImageUploadAllowed: boolean, imgUploadSizeAndTypes: Array<{ fileTypes: string[], maxUploadSize: number }>}
         */
        let acceptFile = false
        if (constraints.isImageUploadAllowed) {
            const fileType = file.type
            const sizeInMB = file.size / 1024 / 1024
            constraints.imgUploadSizeAndTypes.map((allowed) => {
                if (allowed.fileTypes.includes(fileType) && sizeInMB <= allowed.maxUploadSize) {
                    acceptFile = true
                }
            })
        }
        if (!acceptFile) {
            alert(`Cannot upload file. Kindly check the allowed file types and maximum allowed size.`)
        }
        return acceptFile
    }

    const handleDrop = async (e) => {
        if (!isChatFlowAvailableForUploads) {
            return
        }
        e.preventDefault()
        setIsDragActive(false)
        let files = []
        if (e.dataTransfer.files.length > 0) {
            for (const file of e.dataTransfer.files) {
                if (isFileAllowedForUpload(file) === false) {
                    return
                }
                const reader = new FileReader()
                const { name } = file
                files.push(
                    new Promise((resolve) => {
                        reader.onload = (evt) => {
                            if (!evt?.target?.result) {
                                return
                            }
                            const { result } = evt.target
                            let previewUrl
                            if (file.type.startsWith('audio/')) {
                                previewUrl = audioUploadSVG
                            } else if (file.type.startsWith('image/')) {
                                previewUrl = URL.createObjectURL(file)
                            }
                            resolve({
                                data: result,
                                preview: previewUrl,
                                type: 'file',
                                name: name,
                                mime: file.type
                            })
                        }
                        reader.readAsDataURL(file)
                    })
                )
            }

            const newFiles = await Promise.all(files)
            setPreviews((prevPreviews) => [...prevPreviews, ...newFiles])
        }

        if (e.dataTransfer.items) {
            for (const item of e.dataTransfer.items) {
                if (item.kind === 'string' && item.type.match('^text/uri-list')) {
                    item.getAsString((s) => {
                        let upload = {
                            data: s,
                            preview: s,
                            type: 'url',
                            name: s.substring(s.lastIndexOf('/') + 1)
                        }
                        setPreviews((prevPreviews) => [...prevPreviews, upload])
                    })
                } else if (item.kind === 'string' && item.type.match('^text/html')) {
                    item.getAsString((s) => {
                        if (s.indexOf('href') === -1) return
                        //extract href
                        let start = s.substring(s.indexOf('href') + 6)
                        let hrefStr = start.substring(0, start.indexOf('"'))

                        let upload = {
                            data: hrefStr,
                            preview: hrefStr,
                            type: 'url',
                            name: hrefStr.substring(hrefStr.lastIndexOf('/') + 1)
                        }
                        setPreviews((prevPreviews) => [...prevPreviews, upload])
                    })
                }
            }
        }
    }



    const handleDrag = (e) => {
        if (isChatFlowAvailableForUploads) {
            e.preventDefault()
            e.stopPropagation()
            if (e.type === 'dragenter' || e.type === 'dragover') {
                setIsDragActive(true)
            } else if (e.type === 'dragleave') {
                setIsDragActive(false)
            }
        }
    }

    const handleDeletePreview = (itemToDelete) => {
        if (itemToDelete.type === 'file') {
            URL.revokeObjectURL(itemToDelete.preview) // Clean up for file
        }
        setPreviews(previews.filter((item) => item !== itemToDelete))
    }


    const clearPreviews = () => {
        // Revoke the data uris to avoid memory leaks
        previews.forEach((file) => URL.revokeObjectURL(file.preview))
        setPreviews([])
    }


    const onSourceDialogClick = (data, title) => {
        setSourceDialogProps({ data, title })
        setSourceDialogOpen(true)
    }

    const scrollToBottom = () => {
        if (ps.current) {
            ps.current.scrollTo({ top: maxScroll })
        }
    }

    const onChange = useCallback((e) => setUserInput(e.target.value), [setUserInput])

    const updateLastMessage = (text) => {
        setMessages((prevMessages) => {
            let allMessages = [...cloneDeep(prevMessages)]
            if (allMessages[allMessages.length - 1].type === 'userMessage') return allMessages
            allMessages[allMessages.length - 1].message += text
            allMessages[allMessages.length - 1].feedback = null
            return allMessages
        })
    }

    const updateLastMessageSourceDocuments = (sourceDocuments) => {
        setMessages((prevMessages) => {
            let allMessages = [...cloneDeep(prevMessages)]
            if (allMessages[allMessages.length - 1].type === 'userMessage') return allMessages
            allMessages[allMessages.length - 1].sourceDocuments = sourceDocuments
            return allMessages
        })
    }

    const updateLastMessageUsedTools = (usedTools) => {
        setMessages((prevMessages) => {
            let allMessages = [...cloneDeep(prevMessages)]
            if (allMessages[allMessages.length - 1].type === 'userMessage') return allMessages
            allMessages[allMessages.length - 1].usedTools = usedTools
            return allMessages
        })
    }

    // Handle errors
    const handleError = (message = 'Oops! There seems to be an error. Please try again.') => {
        message = message.replace(`Unable to parse JSON response from chat agent.\n\n`, '')
        setMessages((prevMessages) => [...prevMessages, { message, type: 'apiMessage' }])
        setLoading(false)
        setUserInput('')
        setTimeout(() => {
            inputRef.current?.focus()
        }, 100)
    }

    const handlePromptClick = async (promptStarterInput) => {
        setUserInput(promptStarterInput)
        handleSubmit(undefined, promptStarterInput)
    }

    // Handle form submission
    const handleSubmit = async (e, promptStarterInput) => {
        if (e) e.preventDefault()

        if (!promptStarterInput && userInput.trim() === '') {
            const containsAudio = previews.filter((item) => item.type === 'audio').length > 0
            if (!(previews.length >= 1 && containsAudio)) {
                return
            }
        }

        let input = userInput
        console.log('Form submitted with input:', userInput)
        if (promptStarterInput !== undefined && promptStarterInput.trim() !== '') input = promptStarterInput

        setLoading(true)
        const urls = previews.map((item) => {
            return {
                data: item.data,
                type: item.type,
                name: item.name,
                mime: item.mime
            }
        })
        clearPreviews()
        setMessages((prevMessages) => [...prevMessages, { message: input, type: 'userMessage', fileUploads: urls }])

        // Send user question and history to API
        try {
            const params = {
                question: input,
                history: messages.filter((msg) => msg.message !== 'Hi <User>! How can I help?'),
                chatId
            }
            if (urls && urls.length > 0) params.uploads = urls
            if (isChatFlowAvailableToStream) params.socketIOClientId = socketIOClientId

            const response = await predictionApi.sendMessageAndGetPrediction(chatflowid, params)

            if (response.data) {
                const data = response.data
                if (data.executionError) {
                    handleError(data.msg)
                    return
                }

                setMessages((prevMessages) => {
                    let allMessages = [...cloneDeep(prevMessages)]
                    if (allMessages[allMessages.length - 1].type === 'apiMessage') {
                        allMessages[allMessages.length - 1].id = data?.chatMessageId
                    }
                    return allMessages
                })

                if (!chatId) setChatId(data.chatId)

                if (input === '' && data.question) {
                    // the response contains the question even if it was in an audio format
                    // so if input is empty but the response contains the question, update the user message to show the question
                    setMessages((prevMessages) => {
                        let allMessages = [...cloneDeep(prevMessages)]
                        if (allMessages[allMessages.length - 2].type === 'apiMessage') return allMessages
                        allMessages[allMessages.length - 2].message = data.question
                        return allMessages
                    })
                }

                if (!isChatFlowAvailableToStream) {
                    let text = ''
                    if (data.text) text = data.text
                    else if (data.json) text = '```json\n' + JSON.stringify(data.json, null, 2)
                    else text = JSON.stringify(data, null, 2)

                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            message: text,
                            id: data?.chatMessageId,
                            sourceDocuments: data?.sourceDocuments,
                            usedTools: data?.usedTools,
                            fileAnnotations: data?.fileAnnotations,
                            type: 'apiMessage',
                            feedback: null
                        }
                    ])
                }
                setLocalStorageChatflow(chatflowid, data.chatId, messages)
                setLoading(false)
                setUserInput('')
                setTimeout(() => {
                    inputRef.current?.focus()
                    scrollToBottom()
                }, 100)
            }
        } catch (error) {
            handleError(error.response.data.message)
            return
        }
    }

    // Prevent blank submissions and allow for multiline input
    const handleEnter = (e) => {
        // Check if IME composition is in progress
        const isIMEComposition = e.isComposing || e.keyCode === 229
        if (e.key === 'Enter' && userInput && !isIMEComposition) {
            if (!e.shiftKey && userInput) {
                handleSubmit(e)
            }
        } else if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    const downloadFile = async (fileAnnotation) => {
        try {
            const response = await axios.post(
                `${baseURL}/api/v1/openai-assistants-file`,
                { fileName: fileAnnotation.fileName },
                { responseType: 'blob' }
            )
            const blob = new Blob([response.data], { type: response.headers['content-type'] })
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = fileAnnotation.fileName
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error('Download failed:', error)
        }
    }

    // Get chatmessages successful
    useEffect(() => {
        if (getChatmessageApi.data?.length) {
            const chatId = getChatmessageApi.data[0]?.chatId
            setChatId(chatId)
            const loadedMessages = getChatmessageApi.data.map((message) => {
                const obj = {
                    id: message.id,
                    message: message.content,
                    feedback: message.feedback,
                    type: message.role
                }
                if (message.sourceDocuments) obj.sourceDocuments = JSON.parse(message.sourceDocuments)
                if (message.usedTools) obj.usedTools = JSON.parse(message.usedTools)
                if (message.fileAnnotations) obj.fileAnnotations = JSON.parse(message.fileAnnotations)
                if (message.fileUploads) {
                    obj.fileUploads = JSON.parse(message.fileUploads)
                    obj.fileUploads.forEach((file) => {
                        if (file.type === 'stored-file') {
                            file.data = `${baseURL}/api/v1/get-upload-file?chatflowId=${chatflowid}&chatId=${chatId}&fileName=${file.name}`
                        }
                    })
                }
                return obj
            })
            setMessages((prevMessages) => [...prevMessages, ...loadedMessages])
            setLocalStorageChatflow(chatflowid, chatId, messages)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getChatmessageApi.data])

    // Get chatflow streaming capability
    useEffect(() => {
        if (getIsChatflowStreamingApi.data) {
            setIsChatFlowAvailableToStream(getIsChatflowStreamingApi.data?.isStreaming ?? false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getIsChatflowStreamingApi.data])


    useEffect(() => {
        if (getChatflowConfig.data) {
            if (getChatflowConfig.data?.chatbotConfig && JSON.parse(getChatflowConfig.data?.chatbotConfig)) {
                let config = JSON.parse(getChatflowConfig.data?.chatbotConfig)
                if (config.starterPrompts) {
                    let inputFields = []
                    Object.getOwnPropertyNames(config.starterPrompts).forEach((key) => {
                        if (config.starterPrompts[key]) {
                            inputFields.push(config.starterPrompts[key])
                        }
                    })
                    setStarterPrompts(inputFields)
                }
                if (config.chatFeedback) {
                    setChatFeedbackStatus(config.chatFeedback.status)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getChatflowConfig.data])

    // Auto scroll chat to bottom
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isDialog && inputRef) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [isDialog, inputRef])

    useEffect(() => {
        let socket
        if (open && chatflowid) {
            // API request
            getChatmessageApi.request(chatflowid)
            getIsChatflowStreamingApi.request(chatflowid)
            getAllowChatFlowUploads.request(chatflowid)
            getChatflowConfig.request(chatflowid)

            // Scroll to bottom
            scrollToBottom()

            // SocketIO
            socket = socketIOClient(baseURL)

            socket.on('connect', () => {
                setSocketIOClientId(socket.id)
            })

            socket.on('start', () => {
                setMessages((prevMessages) => [...prevMessages, { message: '', type: 'apiMessage' }])
            })

            socket.on('sourceDocuments', updateLastMessageSourceDocuments)

            socket.on('usedTools', updateLastMessageUsedTools)

            socket.on('token', updateLastMessage)
        }

        return () => {
            setUserInput('')
            setLoading(false)
            setMessages([
                {
                    message: 'Hi <User>! How can I help?',
                    type: 'apiMessage'
                }
            ])
            if (socket) {
                socket.disconnect()
                setSocketIOClientId('')
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, chatflowid])


    const copyMessageToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text || '')
        } catch (error) {
            console.error('Error copying to clipboard:', error)
        }
    }

    const onThumbsUpClick = async (messageId) => {
        const body = {
            chatflowid,
            chatId,
            messageId,
            rating: 'THUMBS_UP',
            content: ''
        }
        const result = await chatmessagefeedbackApi.addFeedback(chatflowid, body)
        if (result.data) {
            const data = result.data
            let id = ''
            if (data && data.id) id = data.id
            setMessages((prevMessages) => {
                const allMessages = [...cloneDeep(prevMessages)]
                return allMessages.map((message) => {
                    if (message.id === messageId) {
                        message.feedback = {
                            rating: 'THUMBS_UP'
                        }
                    }
                    return message
                })
            })
            setFeedbackId(id)
            setShowFeedbackContentDialog(true)
        }
    }

    const onThumbsDownClick = async (messageId) => {
        const body = {
            chatflowid,
            chatId,
            messageId,
            rating: 'THUMBS_DOWN',
            content: ''
        }
        const result = await chatmessagefeedbackApi.addFeedback(chatflowid, body)
        if (result.data) {
            const data = result.data
            let id = ''
            if (data && data.id) id = data.id
            setMessages((prevMessages) => {
                const allMessages = [...cloneDeep(prevMessages)]
                return allMessages.map((message) => {
                    if (message.id === messageId) {
                        message.feedback = {
                            rating: 'THUMBS_DOWN'
                        }
                    }
                    return message
                })
            })
            setFeedbackId(id)
            setShowFeedbackContentDialog(true)
        }
    }

    const submitFeedbackContent = async (text) => {
        const body = {
            content: text
        }
        const result = await chatmessagefeedbackApi.updateFeedback(feedbackId, body)
        if (result.data) {
            setFeedbackId('')
            setShowFeedbackContentDialog(false)
        }
    }

    return (
        <div onDragEnter={handleDrag}>
            {isDragActive && (
                <div
                    className='image-dropzone'
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragEnd={handleDrag}
                    onDrop={handleDrop}
                />
            )}
            <div ref={ps} className={`${isDialog ? 'cloud-dialog' : 'cloud'}`}>
                <div id='messagelist' className={'messagelist'}>
                    {messages &&
                        messages.map((message, index) => {
                            return (
                                // The latest message sent by the user will be animated while waiting for a response
                                <Box
                                    sx={{
                                        background: message.type === 'apiMessage' ? theme.palette.asyncSelect.main : ''
                                    }}
                                    key={index}
                                    style={{ display: 'flex' }}
                                    className={
                                        message.type === 'userMessage' && loading && index === messages.length - 1
                                            ? customization.isDarkMode
                                                ? 'usermessagewaiting-dark'
                                                : 'usermessagewaiting-light'
                                            : message.type === 'usermessagewaiting'
                                            ? 'apimessage'
                                            : 'usermessage'
                                    }
                                >
                                    {/* Display the correct icon depending on the message type */}
                                    {message.type === 'apiMessage' ? (
                                        <img src={robotPNG} alt='AI' width='30' height='30' className='boticon' />
                                    ) : (
                                        <img src={userPNG} alt='Me' width='30' height='30' className='usericon' />
                                    )}
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        {message.usedTools && (
                                            <div style={{ display: 'block', flexDirection: 'row', width: '100%' }}>
                                                {message.usedTools.map((tool, index) => {
                                                    return (
                                                        <Chip
                                                            size='small'
                                                            key={index}
                                                            label={tool.tool}
                                                            component='a'
                                                            sx={{ mr: 1, mt: 1 }}
                                                            variant='outlined'
                                                            clickable
                                                            icon={<IconTool size={15} />}
                                                            onClick={() => onSourceDialogClick(tool, 'Used Tools')}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        )}
                                        <div className='markdownanswer'>
                                            {/* Messages are being rendered in Markdown format */}
                                            <MemoizedReactMarkdown
                                                remarkPlugins={[remarkGfm, remarkMath]}
                                                rehypePlugins={[rehypeMathjax, rehypeRaw]}
                                                components={{
                                                    code({ inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '')
                                                        return !inline ? (
                                                            <CodeBlock
                                                                key={Math.random()}
                                                                chatflowid={chatflowid}
                                                                isDialog={isDialog}
                                                                language={(match && match[1]) || ''}
                                                                value={String(children).replace(/\n$/, '')}
                                                                {...props}
                                                            />
                                                        ) : (
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    }
                                                }}
                                            >
                                                {message.message}
                                            </MemoizedReactMarkdown>
                                        </div>
                                        {message.type === 'apiMessage' && message.id && chatFeedbackStatus ? (
                                            <>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
                                                    <CopyToClipboardButton onClick={() => copyMessageToClipboard(message.message)} />
                                                    {!message.feedback ||
                                                    message.feedback.rating === '' ||
                                                    message.feedback.rating === 'THUMBS_UP' ? (
                                                        <ThumbsUpButton
                                                            isDisabled={message.feedback && message.feedback.rating === 'THUMBS_UP'}
                                                            rating={message.feedback ? message.feedback.rating : ''}
                                                            onClick={() => onThumbsUpClick(message.id)}
                                                        />
                                                    ) : null}
                                                    {!message.feedback ||
                                                    message.feedback.rating === '' ||
                                                    message.feedback.rating === 'THUMBS_DOWN' ? (
                                                        <ThumbsDownButton
                                                            isDisabled={message.feedback && message.feedback.rating === 'THUMBS_DOWN'}
                                                            rating={message.feedback ? message.feedback.rating : ''}
                                                            onClick={() => onThumbsDownClick(message.id)}
                                                        />
                                                    ) : null}
                                                </Box>
                                            </>
                                        ) : null}
                                    </div>
                                </Box>
                            )
                        })}
                </div>
            </div>

            {messages && messages.length === 1 && starterPrompts.length > 0 && (
                <div style={{ position: 'relative' }}>
                    <StarterPromptsCard
                        sx={{ bottom: previews && previews.length > 0 ? 70 : 0 }}
                        starterPrompts={starterPrompts || []}
                        onPromptClick={handlePromptClick}
                        isGrid={isDialog}
                    />
                </div>
            )}

            <Divider sx={{ width: '100%' }} />

            <div className='center'>
                {previews && previews.length > 0 && (
                    <Box sx={{ width: '100%', mb: 1.5, display: 'flex', alignItems: 'center' }}>
                        {previews.map((item, index) => (
                            <Fragment key={index}>
                                {item.mime.startsWith('image/') ? (
                                    <ImageButton
                                        focusRipple
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            marginRight: '10px',
                                            flex: '0 0 auto'
                                        }}
                                        onClick={() => handleDeletePreview(item)}
                                    >
                                        <ImageSrc style={{ backgroundImage: `url(${item.data})` }} />
                                        <ImageBackdrop className='MuiImageBackdrop-root' />
                                        <ImageMarked className='MuiImageMarked-root'>
                                            <IconTrash size={20} color='white' />
                                        </ImageMarked>
                                    </ImageButton>
                                ) : (
                                    <Card
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            height: '48px',
                                            width: isDialog ? ps?.current?.offsetWidth / 4 : ps?.current?.offsetWidth / 2,
                                            p: 0.5,
                                            mr: 1,
                                            backgroundColor: theme.palette.grey[500],
                                            flex: '0 0 auto'
                                        }}
                                        variant='outlined'
                                    >
                                        <CardMedia component='audio' sx={{ color: 'transparent' }} controls src={item.data} />
                                        <IconButton onClick={() => handleDeletePreview(item)} size='small'>
                                            <IconTrash size={20} color='white' />
                                        </IconButton>
                                    </Card>
                                )}
                            </Fragment>
                        ))}
                    </Box>
                )}
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <OutlinedInput
                            inputRef={inputRef}
                            // eslint-disable-next-line
                            autoFocus
                            sx={{ width: '100%' }}
                            disabled={loading || !chatflowid}
                            onKeyDown={handleEnter}
                            id='userInput'
                            name='userInput'
                            placeholder={loading ? 'Waiting for response...' : 'Type your question...'}
                            value={userInput}
                            onChange={onChange}
                            multiline={true}
                            maxRows={isDialog ? 7 : 2}
                            startAdornment={
                                isChatFlowAvailableForUploads && (
                                    <InputAdornment position='start' sx={{ pl: 2 }}>
                                        <IconButton
                                            onClick={handleUploadClick}
                                            type='button'
                                            disabled={loading || !chatflowid}
                                            edge='start'
                                        >
                                            <IconPhotoPlus
                                                color={loading || !chatflowid ? '#9e9e9e' : customization.isDarkMode ? 'white' : '#1e88e5'}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                            endAdornment={
                                <>
                                    <InputAdornment position='end' sx={{ padding: '15px' }}>
                                        <IconButton type='submit' disabled={loading || !chatflowid} edge='end'>
                                            {loading ? (
                                                <div>
                                                    <CircularProgress color='inherit' size={20} />
                                                </div>
                                            ) : (
                                                // Send icon SVG in input field
                                                <IconSend
                                                    color={
                                                        loading || !chatflowid ? '#9e9e9e' : customization.isDarkMode ? 'white' : '#1e88e5'
                                                    }
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                </>
                            }
                        />
                    </form>
            </div>
            <SourceDocDialog show={sourceDialogOpen} dialogProps={sourceDialogProps} onCancel={() => setSourceDialogOpen(false)} />
            <ChatFeedbackContentDialog
                show={showFeedbackContentDialog}
                onCancel={() => setShowFeedbackContentDialog(false)}
                onConfirm={submitFeedbackContent}
            />
        </div>
    )
}

ChatMessage.propTypes = {
    open: PropTypes.bool,
    chatflowid: PropTypes.string,
    isDialog: PropTypes.bool,
    previews: PropTypes.array,
    setPreviews: PropTypes.func
}
