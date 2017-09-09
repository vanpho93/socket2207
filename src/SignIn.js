import React, { Component } from 'react';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        // goi socket de sign in
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Enter your username" ref="txtMessage"/>
                <br /><br />
                <button onClick={this.signIn}>Sign In</button>
            </div>
        );
    }
}
