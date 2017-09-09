import React, { Component } from 'react';
import socket from './socket';
import { connect } from 'react-redux';

class Room extends Component {
    constructor(props) {
        super(props);
        this.joinRoom = this.joinRoom.bind(this);
    }
    joinRoom() {
        const { roomName, dispatch } = this.props;
        const action = { type: 'SET_HIGHLIGHT_ROOM', highlightRoom: roomName };
        dispatch(action);
        socket.emit('CLIENT_JOIN_ROOM', roomName);
    }
    render() {
        const { roomName, highlightRoom } = this.props;
        const style = { color: roomName === highlightRoom ? 'green': 'black' };
        return (
            <p style={style} onClick={this.joinRoom}>
                {roomName}
            </p>
        );
    }
}

const mapStateToProps = (state) => ({ 
    highlightRoom: state.highlightRoom
});

export default connect(mapStateToProps)(Room);