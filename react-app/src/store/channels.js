import { easyFetch } from "../utils/easyFetch"

const LOAD_CHANNEL_ROOMS = 'chatRooms/LOAD_CHANNEL_ROOMS'
const CREATE_CHANNEL_ROOM = 'chatRooms/CREATE_ROOM'
const EDIT_CHANNEL_ROOM = 'chatRooms/EDIT_CHANNEL_ROOM'
const DELETE_CHANNEL_ROOM = 'chatRooms/DELETE_CHANNEL_ROOM'


const loadChannels = (channels) => ({
    type: LOAD_CHANNEL_ROOMS,
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

export const getChannels = () => async (dispatch) => {
    const res = await easyFetch(`/api/channels`)

    const data = await res.json()

    if (res.ok) {
        dispatch(loadChannels(data.channels))
    } else {
        return data
    }
    console.log(data)
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

export const deleteChannelRoom = (roomId, type) => async (dispatch) => {
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
        default:
            return state;
    }

}

export default channelsReducer