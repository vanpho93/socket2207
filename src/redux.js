import { createStore } from 'redux';
import { connect } from 'react-redux';
import socket from './socket';

const defaultState = {
    isLoggedIn: false,
    messages: ['aaa', 'bbb', 'ccc'],
    users: []
};

const reducer = (state = defaultState, action) => {
    if (action.type === 'ADD_MESSAGE') return { 
        ...state, 
        messages: [...state.messages, action.message]
    }
    if(action.type === 'SIGN_IN_SUCCESSFULLY') {
        return { ...state, isLoggedIn: true };
    }
    if(action.type === 'ADD_USERS') {
        return {  ...state, users: action.arrUsernames}
    }
    return state;
}

const store = createStore(reducer);

socket.on('SERVER_SEND_MESSAGE', message => store.dispatch({ type: 'ADD_MESSAGE', message }))
socket.on('USERNAME_EXISTED', () => alert('Username is already in use!'));
socket.on('SIGN_IN_SUCCESSFULLY', arrUsernames => {
    store.dispatch({ type: 'SIGN_IN_SUCCESSFULLY' });
    store.dispatch({ type: 'ADD_USERS', arrUsernames });
});

export default store;
