import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  sendMessage() {
    const { value } = this.refs.txtMessage;
    socket.emit('CLIENT_SEND_MESSAGE', value);
    this.refs.txtMessage.value = '';
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Enter your message" ref="txtMessage"/>
        <br /><br />
        <button onClick={this.sendMessage.bind(this)}>Send Message</button>
      </div>
    );
  }
}

const socket = io('http://localhost:4200');

socket.on('SERVER_SEND_MESSAGE', num => console.log(num));

export default App;
