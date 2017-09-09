import React, { Component } from 'react';
import { connect } from 'react-redux';

class Room extends Component {
    render() {
        const { roomName, highlightRoom, dispatch } = this.props;
        const action = { type: 'SET_HIGHLIGHT_ROOM', highlightRoom: roomName };
        const style = { color: roomName === highlightRoom ? 'green': 'black' };
        return (
            <p style={style} onClick={() => dispatch(action)}>
                {roomName}
            </p>
        );
    }
}

const mapStateToProps = (state) => ({ 
    highlightRoom: state.highlightRoom
});

export default connect(mapStateToProps)(Room);