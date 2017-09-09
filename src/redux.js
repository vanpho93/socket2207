import { createStore } from 'redux';
import { connect } from 'react-redux';
import socket from './socket';

const defaultState = {
    isLoggedIn: true,
    messages: ['aaa', 'bbb', 'ccc'],
    users: []
};

const reducer = (state = defaultState, action) => {
    if (action.type === 'ADD_MESSAGE') return { 
        ...state, 
        messages: [...state.messages, action.message]
    }
    return state;
}

const store = createStore(reducer);

socket.on('SERVER_SEND_MESSAGE', message => store.dispatch({ type: 'ADD_MESSAGE', message }))

export default store;
