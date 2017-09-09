import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from './socket';

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
  }
  
  sendMessage() {
    const { value } = this.refs.txtMessage;
    socket.emit('CLIENT_SEND_MESSAGE', value);
    this.refs.txtMessage.value = '';
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="App">
        <input type="text" placeholder="Enter your message" ref="txtMessage"/>
        <br /><br />
        <button onClick={this.sendMessage}>Send Message</button>
        { messages.map((message, index) => <p key={index}>{message}</p>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ messages: state.messages });

export default connect(mapStateToProps)(App);
