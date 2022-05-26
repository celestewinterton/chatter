const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const SEND_MESSAGE = 'messages/SEND_MESSAGE'
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'


const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})

const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    message
})

const editMessage = (message) => ({
    type: EDIT_MESSAGE,
    message
})

const deleteMessage = (messageId) => ({
    type: DELETE_MESSAGE,
    messageId
})


