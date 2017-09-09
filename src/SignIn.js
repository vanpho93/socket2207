import React, { Component } from 'react';
import socket from './socket';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        const username = this.refs.txtUsername.value;
        socket.emit('CLIENT_SIGN_IN', username);
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Enter your username" ref="txtUsername"/>
                <br /><br />
                <button onClick={this.signIn}>Sign In</button>
            </div>
        );
    }
}
