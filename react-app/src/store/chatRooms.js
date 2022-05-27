const LOAD_CHANNEL_ROOMS = 'chatRooms/LOAD_CHANNEL_ROOMS'
const CREATE_CHANNEL_ROOM = 'chatRooms/CREATE_ROOM'
const CREATE_GROUP_ROOM = 'chatRooms/CREATE_GROUP_ROOM'



const createChannel = (channel) => ({
    type: CREATE_CHANNEL_ROOM,
    channel
})

const createGroup = (group) => ({
    type: CREATE_GROUP_ROOM,
    group
})

export const createNewRoom = (formData, type) => async (dispatch) => {
    const res = fetch(`/${type}`, {
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
            if (action.rooms.length) {
                action.rooms.forEach(room => {
                    newState.channels[room.id] = room;
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