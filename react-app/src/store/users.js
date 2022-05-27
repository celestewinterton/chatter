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


const initialState = {
    users: {}
};

const usersReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case LOAD_USERS:
      if (action.users.length) {
        action.users.forEach(user => {
          newState[user.id] = user;
        });
      }
      return newState;
    default:
      return state;
  };
};

export default usersReducer;
