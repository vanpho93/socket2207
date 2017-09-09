import { createStore } from 'redux';

const defaultState = {
    messages: ['aaa', 'bbb', 'ccc']
};

const reducer = (state = defaultState, action) => {
    return state;
}

const store = createStore(reducer);

export default store;
