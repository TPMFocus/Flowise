import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {
    Avatar,
    Box,
    ButtonBase,
    Typography,
    Stack,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select, // Ajout de Select
    MenuItem,
    useTheme // Ajout de MenuItem pour Select
} from '@mui/material'
import { IconSettings, IconChevronLeft, IconDeviceFloppy, IconPencil, IconCheck, IconX } from '@tabler/icons'
import Settings from '@/views/settings'
import SaveChatflowDialog from '@/ui-component/dialog/SaveChatflowDialog'
import ViewMessagesDialog from '@/ui-component/dialog/ViewMessagesDialog'
import ChatflowConfigurationDialog from '@/ui-component/dialog/ChatflowConfigurationDialog'
import UpsertHistoryDialog from '@/views/vectorstore/UpsertHistoryDialog'
import chatflowsApi from '@/api/chatflows'
import useApi from '@/hooks/useApi'
import JiraSVG from '../../assets/images/jira-icon.svg'
import { generateExportFlowData } from '@/utils/genericHelper'
import { uiBaseURL } from '@/store/constant'

const CanvasHeader = ({ chatflow, handleSaveFlow, handleDeleteFlow, handleLoadFlow }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const flowNameRef = useRef()
    const settingsRef = useRef()

    const [isEditingFlowName, setEditingFlowName] = useState(null)
    const [flowName, setFlowName] = useState('')
    const [isSettingsOpen, setSettingsOpen] = useState(false)
    const [flowDialogOpen, setFlowDialogOpen] = useState(false)
    const [apiDialogOpen, setAPIDialogOpen] = useState(false)
    const [apiDialogProps, setAPIDialogProps] = useState({})
    const [viewMessagesDialogOpen, setViewMessagesDialogOpen] = useState(false)
    const [viewMessagesDialogProps, setViewMessagesDialogProps] = useState({})
    const [upsertHistoryDialogOpen, setUpsertHistoryDialogOpen] = useState(false)
    const [upsertHistoryDialogProps, setUpsertHistoryDialogProps] = useState({})
    const [chatflowConfigurationDialogOpen, setChatflowConfigurationDialogOpen] = useState(false)
    const [chatflowConfigurationDialogProps, setChatflowConfigurationDialogProps] = useState({})
    const [jiraUrl, setJiraUrl] = useState('')
    const [username, setUsername] = useState('')
    const [jiraDialogOpen, setJiraDialogOpen] = useState(false)
    const [token, setToken] = useState('')
    const [projectKey, setProjectKey] = useState('')
    const [checkedOptions, setCheckedOptions] = useState({
        option1: false,
        option2: false,
        option3: false
    })

    const [projectDialogOpen, setProjectDialogOpen] = useState(false)
    const [issueTypeSchemes, setIssueTypeSchemes] = useState([])
    const [selectedIssueTypeScheme, setSelectedIssueTypeScheme] = useState(null) // State pour stocker le type de scheme sélectionné
    const [projects, setProjects] = useState([])

    const updateChatflowApi = useApi(chatflowsApi.updateChatflow)
    const canvas = useSelector((state) => state.canvas)

    const fetchProjectsAndSchemes = async () => {
        try {
            const responseProjects = await axios.post('http://localhost:5000/get-projects', {
                jira_url: jiraUrl,
                username: username,
                api_token: token
            })
            setProjects(responseProjects.data)

            const responseSchemes = await axios.post('http://localhost:5000/get-schemes', {
                jira_url: jiraUrl,
                username: username,
                api_token: token
            })
            setIssueTypeSchemes(responseSchemes.data)
        } catch (error) {
            console.error('Error fetching projects or issue type schemes:', error)
        }
    }

    const handleJiraSubmit = () => {
        fetchProjectsAndSchemes()
        setJiraDialogOpen(false)
        setProjectDialogOpen(true)
    }

    const handleSelectChange = (event) => {
        setSelectedIssueTypeScheme(event.target.value) // Met à jour le type de scheme sélectionné
    }

    const handleProjectSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/run', {
                issue_type_scheme_name: selectedIssueTypeScheme.name,
                project_key: projectKey
            })
            console.log(response.data.message) // Log the response
        } catch (error) {
            console.error('Error:', error.message) // Log the error
        }
        setProjectDialogOpen(false)
    }

    const onSettingsItemClick = (setting) => {
        setSettingsOpen(false)

        if (setting === 'deleteChatflow') {
            handleDeleteFlow()
        } else if (setting === 'viewMessages') {
            setViewMessagesDialogProps({
                title: 'View Messages',
                chatflow: chatflow
            })
            setViewMessagesDialogOpen(true)
        } else if (setting === 'viewUpsertHistory') {
            setUpsertHistoryDialogProps({
                title: 'View Upsert History',
                chatflow: chatflow
            })
            setUpsertHistoryDialogOpen(true)
        } else if (setting === 'chatflowConfiguration') {
            setChatflowConfigurationDialogProps({
                title: 'Chatflow Configuration',
                chatflow: chatflow
            })
            setChatflowConfigurationDialogOpen(true)
        } else if (setting === 'duplicateChatflow') {
            try {
                localStorage.setItem('duplicatedFlowData', chatflow.flowData)
                window.open(`${uiBaseURL}/canvas`, '_blank')
            } catch (e) {
                console.error(e)
            }
        } else if (setting === 'exportChatflow') {
            try {
                const flowData = JSON.parse(chatflow.flowData)
                let dataStr = JSON.stringify(generateExportFlowData(flowData), null, 2)
                let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

                let exportFileDefaultName = `${chatflow.name} Chatflow.json`

                let linkElement = document.createElement('a')
                linkElement.setAttribute('href', dataUri)
                linkElement.setAttribute('download', exportFileDefaultName)
                linkElement.click()
            } catch (e) {
                console.error(e)
            }
        }
    }

    const onUploadFile = (file) => {
        setSettingsOpen(false)
        handleLoadFlow(file)
    }

    const submitFlowName = () => {
        if (chatflow.id) {
            const updateBody = {
                name: flowNameRef.current.value
            }
            updateChatflowApi.request(chatflow.id, updateBody)
        }
    }

    const onAPIDialogClick = () => {
        let isFormDataRequired = false
        try {
            const flowData = JSON.parse(chatflow.flowData)
            const nodes = flowData.nodes
            for (const node of nodes) {
                if (node.data.inputParams.find((param) => param.type === 'file')) {
                    isFormDataRequired = true
                    break
                }
            }
        } catch (e) {
            console.error(e)
        }

        let isSessionMemory = false
        try {
            const flowData = JSON.parse(chatflow.flowData)
            const nodes = flowData.nodes
            for (const node of nodes) {
                if (node.data.inputParams.find((param) => param.name === 'sessionId')) {
                    isSessionMemory = true
                    break
                }
            }
        } catch (e) {
            console.error(e)
        }

        setAPIDialogProps({
            title: 'Embed in website or use as API',
            chatflowid: chatflow.id,
            chatflowApiKeyId: chatflow.apiKeyId,
            formDataRequired: isFormDataRequired,
            isSessionMemory: isSessionMemory
        })
        setAPIDialogOpen(true)
    }

    const onSaveChatflowClick = () => {
        if (chatflow.id) handleSaveFlow(flowName)
        else setFlowDialogOpen(true)
    }

    const onConfirmSaveName = (flowName) => {
        setFlowDialogOpen(false)
        handleSaveFlow(flowName)
    }

    const handleCheckboxChange = (event) => {
        setCheckedOptions({
            ...checkedOptions,
            [event.target.name]: event.target.checked
        })
    }

    const handleJiraDialogSubmit = () => {
        // Handle the form submission logic for the Jira popup
        console.log('Token:', token)
        console.log('Checked options:', checkedOptions)
        setJiraDialogOpen(false) // Close the popup after submission
    }

    return (
        <>
            <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                <Box display='flex' alignItems='center'>
                    <ButtonBase title='Back' sx={{ borderRadius: '50%', mr: 2 }}>
                        <Avatar
                            variant='rounded'
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            color='inherit'
                            onClick={() => navigate('/chatflows')}
                        >
                            <IconChevronLeft stroke={1.5} size='1.3rem' />
                        </Avatar>
                    </ButtonBase>
                    {flowName && (
                        <Stack direction='row' spacing={1} alignItems='center' sx={{ ml: 1 }}>
                            <Typography variant='h4' sx={{ fontWeight: 500 }}>
                                {flowName}
                            </Typography>
                            {!isEditingFlowName && (
                                <ButtonBase title='Edit Flow Name' sx={{ borderRadius: '50%' }}>
                                    <Avatar
                                        variant='rounded'
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.mediumAvatar,
                                            transition: 'all .2s ease-in-out',
                                            background: theme.palette.secondary.light,
                                            color: theme.palette.secondary.dark,
                                            '&:hover': {
                                                background: theme.palette.secondary.dark,
                                                color: theme.palette.secondary.light
                                            }
                                        }}
                                        color='inherit'
                                        onClick={() => setEditingFlowName(true)}
                                    >
                                        <IconPencil stroke={1.5} size='1.3rem' />
                                    </Avatar>
                                </ButtonBase>
                            )}
                        </Stack>
                    )}
                    {isEditingFlowName && (
                        <Stack flexDirection='row'>
                            <TextField
                                size='small'
                                inputRef={flowNameRef}
                                sx={{
                                    width: '50%',
                                    ml: 2
                                }}
                                defaultValue={flowName}
                            />
                            <ButtonBase title='Save Name' sx={{ borderRadius: '50%' }}>
                                <Avatar
                                    variant='rounded'
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.mediumAvatar,
                                        transition: 'all .2s ease-in-out',
                                        background: theme.palette.success.light,
                                        color: theme.palette.success.dark,
                                        ml: 1,
                                        '&:hover': {
                                            background: theme.palette.success.dark,
                                            color: theme.palette.success.light
                                        }
                                    }}
                                    color='inherit'
                                    onClick={submitFlowName}
                                >
                                    <IconCheck stroke={1.5} size='1.3rem' />
                                </Avatar>
                            </ButtonBase>
                            <ButtonBase title='Cancel' sx={{ borderRadius: '50%' }}>
                                <Avatar
                                    variant='rounded'
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.mediumAvatar,
                                        transition: 'all .2s ease-in-out',
                                        background: theme.palette.error.light,
                                        color: theme.palette.error.dark,
                                        ml: 1,
                                        '&:hover': {
                                            background: theme.palette.error.dark,
                                            color: theme.palette.error.light
                                        }
                                    }}
                                    color='inherit'
                                    onClick={() => setEditingFlowName(false)}
                                >
                                    <IconX stroke={1.5} size='1.3rem' />
                                </Avatar>
                            </ButtonBase>
                        </Stack>
                    )}
                </Box>
                <Box display='flex' alignItems='center'>
                    <Button onClick={() => setJiraDialogOpen(true)}>
                        <img src={JiraSVG} alt='Jira' style={{ width: '1.3rem', height: '1.3rem' }} />
                    </Button>
                    <ButtonBase title='Save Chatflow' sx={{ borderRadius: '50%', mr: 2 }}>
                        <Avatar
                            variant='rounded'
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.canvasHeader.saveLight,
                                color: theme.palette.canvasHeader.saveDark,
                                '&:hover': {
                                    background: theme.palette.canvasHeader.saveDark,
                                    color: theme.palette.canvasHeader.saveLight
                                }
                            }}
                            color='inherit'
                            onClick={onSaveChatflowClick}
                        >
                            <IconDeviceFloppy stroke={1.5} size='1.3rem' />
                        </Avatar>
                    </ButtonBase>
                    <ButtonBase ref={settingsRef} title='Settings' sx={{ borderRadius: '50%' }}>
                        <Avatar
                            variant='rounded'
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.canvasHeader.settingsLight,
                                color: theme.palette.canvasHeader.settingsDark,
                                '&:hover': {
                                    background: theme.palette.canvasHeader.settingsDark,
                                    color: theme.palette.canvasHeader.settingsLight
                                }
                            }}
                            onClick={() => setSettingsOpen(!isSettingsOpen)}
                        >
                            <IconSettings stroke={1.5} size='1.3rem' />
                        </Avatar>
                    </ButtonBase>
                </Box>
            </Box>
            <Settings
                chatflow={chatflow}
                isSettingsOpen={isSettingsOpen}
                anchorEl={settingsRef.current}
                onClose={() => setSettingsOpen(false)}
                onSettingsItemClick={onSettingsItemClick}
                onUploadFile={onUploadFile}
            />
            <SaveChatflowDialog
                show={flowDialogOpen}
                dialogProps={{
                    title: `Save New Chatflow`,
                    confirmButtonName: 'Save',
                    cancelButtonName: 'Cancel'
                }}
                onCancel={() => setFlowDialogOpen(false)}
                onConfirm={onConfirmSaveName}
            />
            <ViewMessagesDialog
                show={viewMessagesDialogOpen}
                dialogProps={viewMessagesDialogProps}
                onCancel={() => setViewMessagesDialogOpen(false)}
            />
            <UpsertHistoryDialog
                show={upsertHistoryDialogOpen}
                dialogProps={upsertHistoryDialogProps}
                onCancel={() => setUpsertHistoryDialogOpen(false)}
            />
            <ChatflowConfigurationDialog
                key='chatflowConfiguration'
                show={chatflowConfigurationDialogOpen}
                dialogProps={chatflowConfigurationDialogProps}
                onCancel={() => setChatflowConfigurationDialogOpen(false)}
            />
            <Dialog open={jiraDialogOpen} onClose={() => setJiraDialogOpen(false)}>
                <DialogTitle>Jiraa Credentials</DialogTitle>
                <DialogContent>
                    <TextField label='Jira URL' fullWidth value={jiraUrl} onChange={(e) => setJiraUrl(e.target.value)} sx={{ mb: 2 }} />

                    <TextField label='Email' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} />
                    <TextField label='Token' fullWidth value={token} onChange={(e) => setToken(e.target.value)} sx={{ mb: 2 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJiraDialogOpen(false)} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleJiraSubmit} color='primary'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)}>
                <DialogTitle>Select Project and Issue Type Scheme</DialogTitle>
                <DialogContent>
                    <Typography variant='h6' sx={{ mt: 2 }}>
                        Available Projects:
                    </Typography>
                    <Select value={projectKey} onChange={(e) => setProjectKey(e.target.value)} fullWidth sx={{ mb: 2 }}>
                        {projects.map((project) => (
                            <MenuItem key={project.id} value={project.key}>
                                {project.name} (Key: {project.key})
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant='h6' sx={{ mt: 2 }}>
                        Available Issue Type Schemes:
                    </Typography>
                    <Select
                        value={selectedIssueTypeScheme}
                        onChange={(e) => setSelectedIssueTypeScheme(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {issueTypeSchemes.map((scheme) => (
                            <MenuItem key={scheme.id} value={scheme}>
                                {scheme.name} (ID: {scheme.id})
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setProjectDialogOpen(false)} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleProjectSubmit} color='primary'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

CanvasHeader.propTypes = {
    chatflow: PropTypes.object,
    handleSaveFlow: PropTypes.func,
    handleDeleteFlow: PropTypes.func,
    handleLoadFlow: PropTypes.func
}

export default CanvasHeader
