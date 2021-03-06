import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import chatRoomsReducer from './chatRooms';
import channelsReducer from './channels'
import messagesReducer from './messages';
import session from './session'
import usersReducer from './users';

const rootReducer = combineReducers({
  session,
  messages: messagesReducer,
  chatRooms: chatRoomsReducer,
  channels: channelsReducer,
  users: usersReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
