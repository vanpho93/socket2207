import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4200');

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    socket.on('SERVER_SEND_MESSAGE', message => {
      this.setState(prevState => ({ messages: prevState.messages.concat(message) }))
    });
  }

  sendMessage() {
    const { value } = this.refs.txtMessage;
    socket.emit('CLIENT_SEND_MESSAGE', value);
    this.refs.txtMessage.value = '';
  }

  render() {
    const { messages } = this.state;
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

export default App;
