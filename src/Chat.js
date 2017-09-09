import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        // Handle send message here
    }

    render() {
        const { messages, users } = this.props;
        return (
            <div>
                <input type="text" placeholder="Enter your message" ref="txtMessage" />
                <br /><br />
                <button onClick={this.sendMessage}>Send Message</button>
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
