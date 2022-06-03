import { easyFetch } from "../utils/easyFetch"

const LOAD_CHANNEL_ROOMS = 'channels/LOAD_CHANNEL_ROOMS'
const SOCKET_UPDATE = 'channels/SOCKET_UPDATE'
const LOAD_SUBSCRIBED_ROOMS = 'channels/LOAD_SUBSCRIBED_ROOMS'
const CREATE_CHANNEL_ROOM = 'channels/CREATE_ROOM'
const EDIT_CHANNEL_ROOM = 'channels/EDIT_CHANNEL_ROOM'
const DELETE_CHANNEL_ROOM = 'channels/DELETE_CHANNEL_ROOM'
const JOIN_CHANNEL = 'channels/JOIN_CHANNEL'
const LEAVE_CHANNEL = 'channels/LEAVE_CHANNEL'



const loadChannels = (channels) => ({
    type: LOAD_CHANNEL_ROOMS,
    channels
})

const updateCurrentChannels = (channels) => ({
    type: SOCKET_UPDATE,
    channels
})

const loadSubscribedChannels = (channels) => ({
    type: LOAD_SUBSCRIBED_ROOMS,
    channels
})

const editChannel = (channel) => ({
    type: EDIT_CHANNEL_ROOM,
    channel
})

const createChannel = (channel) => ({
    type: CREATE_CHANNEL_ROOM,
    channel
})

const deleteChannel = (channelId) => ({
    type: DELETE_CHANNEL_ROOM,
    channelId
})

const joinChannel = (channel) => ({
    type: JOIN_CHANNEL,
    channel
})

const leaveChannel = (channel) => ({
    type: LEAVE_CHANNEL,
    channel
})

export const getChannels = () => async (dispatch) => {
    const res = await easyFetch(`/api/channels`)

    const data = await res.json()

    if (res.ok) {
        dispatch(loadChannels(data.channels))
    } else {
        return data
    }
}

export const socketUpdateChannels = () => async (dispatch) => {
    const res = await easyFetch(`/api/channels`)

    const data = await res.json()

    if (res.ok) {
        dispatch(updateCurrentChannels(data.channels))
    } else {
        return data
    }
}

export const createChannelRoom = (formData) => async (dispatch) => {
    const res = await easyFetch(`/api/channels`, {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    if (res.ok) {
        dispatch(createChannel(data))
    } else {
        return data
    }
}

export const editChannelRoom = (formData, roomId) => async (dispatch) => {
    const res = await easyFetch(`/api/channels/${roomId}`, {
        method: 'PUT',
        body: formData
    })
    const data = await res.json()
    if (res.ok) {
        dispatch(editChannel(data))
    } else {
        return data
    }
}

export const deleteChannelRoom = (roomId) => async (dispatch) => {
    const res = await easyFetch(`/api/channels/${roomId}`, {
        method: 'DELETE'
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(deleteChannel(data.id))
    } else {
        return data
    }

}

export const joinChannelRoom = (roomId) => async (dispatch) => {
    const res = await easyFetch(`/api/channels/${roomId}/join`, {
        method: 'PATCH'
    })

    const channel = await res.json()
    if (res.ok) {
        dispatch(joinChannel(channel))
    } else {
        return channel
    }

}

export const leaveChannelRoom = (roomId) => async (dispatch) => {
    const res = await easyFetch(`/api/channels/${roomId}/leave`, {
        method: 'PATCH'
    })

    const channel = await res.json()
    if (res.ok) {
        dispatch(leaveChannel(channel))
    } else {
        return channel
    }

}



const initialState = {
    all: {},
    subscribed: {}
};

const channelsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CHANNEL_ROOMS:
            if (action.channels.length) {
                action.channels.forEach(channel => {
                    newState.all[channel.id] = channel;
                });
            }
            return newState;
        case SOCKET_UPDATE:
            const socketState = {
                all: {},
                subscribed: {}
            };
            if (action.channels.length) {
                action.channels.forEach(channel => {
                    socketState.all[channel.id] = channel;
                });
            } else {
                socketState.all = {}
            }
            return socketState;
        case CREATE_CHANNEL_ROOM:
            newState.all[action.channel.id] = action.channel
            newState.subscribed[action.channel.id] = action.channel
            return newState
        case EDIT_CHANNEL_ROOM:
            console.log(action)
            newState.all[action.channel.id] = action.channel
            newState.subscribed[action.channel.id] = action.channel
            return newState
        case DELETE_CHANNEL_ROOM:
            delete newState.all[action.channelId]
            delete newState.subscribed[action.channelId]
            return newState
        case JOIN_CHANNEL:
            newState.all[action.channel.id] = action.channel
            newState.subscribed[action.channel.id] = action.channel
            return newState
        case LEAVE_CHANNEL:
            newState.all[action.channel.id] = action.channel
            delete newState.subscribed[action.channel.id]
            return newState
        default:
            return state;
    }

}

export default channelsReducer