


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
        case EDIT_ROOM:
        case JOIN_CHANNEL_ROOM:
            newState.channels[action.room.id] = action.room
            return newState
        case LEAVE_CHANNEL_ROOM:
            newState.channels[action.room.id] = action.room
            return newState
        default:
            return state;
    };
};

export default chatRoomsReducer;