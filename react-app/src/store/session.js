import { easyFetch } from "../utils/easyFetch";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const RELOAD_USER = 'session/RELOAD_USER';
const SET_EDIT_TRUE = 'session/SET_EDIT_TRUE';
const SET_EDIT_FALSE = 'session/SET_EDIT_FALSE'


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const relaodUser = (user) => ({
  type: RELOAD_USER,
  user
})

const removeUser = () => ({
  type: REMOVE_USER,
})

export const setEditTrue = () => ({
  type: SET_EDIT_TRUE
})

export const setEditFalse = () => ({
  type: SET_EDIT_FALSE
})



export const reloadCurrentUser = (userId) => async (dispatch) => {
  const res = await easyFetch(`/api/users/${userId}`)

  const user = await res.json()
  if (res.ok) {
    dispatch(relaodUser(user))
  } else {
    return user
  }
}

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (formData) => async (dispatch) => {
  // console.log(formData)
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

const initialState = { user: null, edit: true };

export default function reducer(state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case SET_USER:
      newState.user = action.payload
      return newState
    case RELOAD_USER:
      newState.user = action.user
      return newState
    case REMOVE_USER:
      newState.user = null
      return newState
    case SET_EDIT_TRUE:
      newState.edit = true
      return newState
    case SET_EDIT_FALSE:
      newState.edit = false
      return newState


    default:
      return state;
  }
}
