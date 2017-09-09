import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
    render() {
        const { username, highlightUser, dispatch } = this.props;
        const action = { type: 'SET_HIGHLIGHT_USER', highlightUser: username };
        const style = { color: username === highlightUser ? 'green': 'black' };
        return (
            <p style={style} onClick={() => dispatch(action)}>
                {username}
            </p>
        );
    }
}

const mapStateToProps = (state) => ({ 
    highlightUser: state.highlightUser
});


export default connect(mapStateToProps)(User);
