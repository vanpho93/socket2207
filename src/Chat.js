import React, { Component } from 'react';
import socket from './socket';
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        const message = this.refs.txtMessage.value;
        socket.emit('CLIENT_SEND_MESSAGE', message);
        this.refs.txtMessage.value = '';
    }

    render() {
        const { messages, users } = this.props;
        return (
            <div>
                <input type="text" placeholder="Enter your message" ref="txtMessage" />
                <br /><br />
                <button onClick={this.sendMessage}>Send Message</button>
                <button onClick={this.sendMessage}>Send Private Message</button>
                {messages.map((message, index) => <p key={index}>{message}</p>)}
                <div>
                    <h4>Online users:</h4>
                    { users.map(username => <p key={username}>{username}</p>) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    messages: state.messages,
    users: state.users
});

export default connect(mapStateToProps)(Chat);
