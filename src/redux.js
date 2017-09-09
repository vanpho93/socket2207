import { createStore } from 'redux';
import socket from './socket';

const defaultState = {
    isLoggedIn: false,
    messages: [],
    users: [],
    highlightUser: null
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
        return {  ...state, users: action.arrUsernames};
    }
    if(action.type === 'NEW_USER') {
        return {  ...state, users: [...state.users, action.username] };
    }
    if(action.type === 'REMOVE_USER') {
        return { 
            ...state, 
            users: state.users.filter(username => username !== action.username) 
        }
    }
    if(action.type === 'SET_HIGHLIGHT_USER') {
        return {
            ...state,
            highlightUser: action.highlightUser
        }
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

socket.on('NEW_USER', username => {
    store.dispatch({ type: 'NEW_USER', username });
});

socket.on('CLIENT_DISCONNECT', username => {
    store.dispatch({ type: 'REMOVE_USER', username });
});

export default store;
