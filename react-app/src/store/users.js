const LOAD_USERS = 'load/LOAD_USERS'

const loadAllUsers = users => ({
  type: LOAD_USERS,
  users
})

export const loadUsers = () => async dispatch => {
  const response = await fetch('/api/users')
  if (response.ok) {
    const users = await response.json()
    dispatch(loadAllUsers(users))
    return users
  }
}



const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      const newState = { ...state }
      Object.values(action.users)[0].forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  };
};

export default usersReducer;
