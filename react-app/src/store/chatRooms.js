import { easyFetch } from "../utils/easyFetch"

const LOAD_CHANNEL_ROOMS = 'chatRooms/LOAD_CHANNEL_ROOMS'
const LOAD_GROUP_ROOMS = 'chatRooms/LOAD_GROUP_ROOMS'
const CREATE_CHANNEL_ROOM = 'chatRooms/CREATE_ROOM'
const CREATE_GROUP_ROOM = 'chatRooms/CREATE_GROUP_ROOM'

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
        if (type === 'channel') {
            dispatch(createChannel(data))
        } else {
            dispatch(createGroup(data))
        }
    } else {
        return data
    }
}


const initialState = {
    groupRooms: {},
    channels: {}
};

const chatRoomsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CHANNEL_ROOMS:
            if (action.channels.length) {
                action.channels.forEach(channel => {
                    newState.channels[channel.id] = channel;
                });
            }
            return newState;
        case LOAD_GROUP_ROOMS:
            if (action.groups.length) {
                action.groups.forEach(group => {
                    newState.groupss[group.id] = group;
                });
            }
            return newState;
        case CREATE_CHANNEL_ROOM:
            newState.channels[action.room.id] = action.room
            return newState
        case CREATE_GROUP_ROOM:
            newState.groupRooms[action.room.id] = action.room
            return newState
        default:
            return state;
    };
};

export default chatRoomsReducer;