import { easyFetch } from "../utils/easyFetch"

const LOAD_GROUP_ROOMS = 'chatRooms/LOAD_GROUP_ROOMS'
const CREATE_GROUP_ROOM = 'chatRooms/CREATE_GROUP_ROOM'
const EDIT_GROUP_ROOM = 'chatRooms/EDIT_GROUP_ROOM'
const DELETE_GROUP_ROOM = 'chatRooms/DELETE_GROUP_ROOM'
const JOIN_CHANNEL = 'chatRooms/JOIN_CHANNEL'
const LEAVE_CHANNEL = 'chatRooms/LEAVE_CHANNEL'




const loadGroups = (groups) => ({
    type: LOAD_GROUP_ROOMS,
    groups
})


const deleteGroup = (groupId) => ({
    type: DELETE_GROUP_ROOM,
    groupId
})

const editGroup = (group) => ({
    type: EDIT_GROUP_ROOM,
    group
})

const createGroup = (group) => ({
    type: CREATE_GROUP_ROOM,
    group
})

export const getGroupRooms = () => async (dispatch) => {
    const res = await easyFetch(`/api/groups`)

    const data = await res.json()

    if (res.ok) {
        dispatch(loadGroups(data.groups))
    } else {
        return data
    }
}

export const createGroupRoom = (formData) => async (dispatch) => {
    const res = await easyFetch(`/api/groups`, {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    if (res.ok) {
        dispatch(createGroup(data))
    } else {
        return data
    }
}

export const editGroupRoom = (formData, roomId) => async (dispatch) => {
    const res = await easyFetch(`/api/groups/${roomId}`, {
        method: 'PUT',
        body: formData
    })
    const data = await res.json()
    if (res.ok) {
        dispatch(editGroup(data))
    } else {
        return data
    }
}

export const deleteGroupRoom = (roomId) => async (dispatch) => {
    const res = await easyFetch(`/api/groups/${roomId}`, {
        method: 'DELETE'
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(deleteGroup(data.id))
    } else {
        return data
    }

}


const initialState = {
    subscribed: {}
};

const chatRoomsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_GROUP_ROOMS:
            if (action.groups.length) {
                action.groups.forEach(group => {
                    newState.subscribed[group.id] = group;
                });
            }
            return newState;
        case CREATE_GROUP_ROOM:
            newState.subscribed[action.group.id] = action.group
            return newState
        case DELETE_GROUP_ROOM:
            delete newState.subscribed[action.groupId]
            return newState
        default:
            return state;
    };
};

export default chatRoomsReducer;
