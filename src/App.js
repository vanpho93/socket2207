import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from './SignIn';
import Chat from './Chat';

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="App">
        { isLoggedIn ? <Chat /> : <SignIn /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isLoggedIn: state.isLoggedIn });

export default connect(mapStateToProps)(App);
