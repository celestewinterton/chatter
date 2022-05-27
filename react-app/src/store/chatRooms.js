import { easyFetch } from "../utils/easyFetch"

const LOAD_CHANNEL_ROOMS = 'chatRooms/LOAD_CHANNEL_ROOMS'
const LOAD_GROUP_ROOMS = 'chatRooms/LOAD_GROUP_ROOMS'
const CREATE_CHANNEL_ROOM = 'chatRooms/CREATE_ROOM'
const CREATE_GROUP_ROOM = 'chatRooms/CREATE_GROUP_ROOM'
const EDIT_CHANNEL_ROOM = 'chatRooms/EDIT_CHANNEL_ROOM'
const EDIT_GROUP_ROOM = 'chatRooms/EDIT_GROUP_ROOM'
const DELETE_CHANNEL_ROOM = 'chatRooms/DELETE_CHANNEL_ROOM'
const DELETE_GROUP_ROOM = 'chatRooms/DELETE_GROUP_ROOM'


const loadChannels = (channels) => ({
    type: LOAD_CHANNEL_ROOMS,
    channels
})

const loadGroups = (groups) => ({
    type: LOAD_GROUP_ROOMS,
    groups
})


const createChannel = (channel) => ({
    type: CREATE_CHANNEL_ROOM,
    channel
})

const editChannel = (channel) => ({
    type: EDIT_CHANNEL_ROOM,
    channel
})

const deleteChannel = (channelId) => ({
    type: DELETE_CHANNEL_ROOM,
    channelId
})

const deleteGroup = (channelId) => ({
    type: DELETE_GROUP_ROOM,
    channelId
})

const editGroup = (group) => ({
    type: EDIT_GROUP_ROOM,
    group
})

const createGroup = (group) => ({
    type: CREATE_GROUP_ROOM,
    group
})

export const getRooms = (type) => async (dispatch) => {
    const res = await easyFetch(`/api/${type}`)

    const data = await res.json()

    if (res.ok) {
        if (type === 'channels') {
            dispatch(loadChannels(data.channels))
        } else {
            dispatch(loadGroups(data))
        }
    } else {
        return data
    }
}

export const createNewRoom = (formData, type) => async (dispatch) => {
    const res = await easyFetch(`/api/${type}`, {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    if (res.ok) {
        if (type === 'channels') {
            dispatch(createChannel(data))
        } else {
            dispatch(createGroup(data))
        }
    } else {
        return data
    }
}

export const editRoom = (formData, channelId, type) => async (dispatch) => {
    const res = await easyFetch(`/api/${type}/${channelId}`, {
        method: 'PUT',
        body: formData
    })
    const data = await res.json()
    if (res.ok) {
        if (type === 'channels') {
            dispatch(editChannel(data))
        } else {
            dispatch(editGroup(data))
        }
    } else {
        return data
    }
}


const initialState = {
    groupRooms: {
        subscribed: {}
    },
    channels: {
        all: {},
        subscribed: {}
    }
};

const chatRoomsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CHANNEL_ROOMS:
            if (action.channels.length) {
                action.channels.forEach(channel => {
                    newState.channels.all[channel.id] = channel;
                });
            }
            return newState;
        case LOAD_GROUP_ROOMS:
            if (action.groups.length) {
                action.groups.forEach(group => {
                    newState.groups.subscribed[group.id] = group;
                });
            }
            return newState;
        case CREATE_CHANNEL_ROOM:
            newState.channels.all[action.channel.id] = action.channel
            newState.channels.subscribed[action.channel.id] = action.channel
            return newState
        case EDIT_CHANNEL_ROOM:
            console.log(action)
            newState.channels.all[action.channel.id] = action.channel
            newState.channels.subscribed[action.channel.id] = action.channel
            return newState
        case CREATE_GROUP_ROOM:
            newState.groupRooms.subscribed[action.group.id] = action.group
            return newState
        default:
            return state;
    };
};

export default chatRoomsReducer;