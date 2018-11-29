import React, { Component } from 'react';

export default class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input
          name="username"
          className="chatbar-username"
          defaultValue={this.props.currentUser}
          placeholder="Your Name (Optional)"
          onKeyUp={e => this.props.addCurrentUserHandler(e)}
        />
        <input
          name="content"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          defaultValue={this.props.userInput}
          onChange={e => this.props.onChangeHandler(e)}
          onKeyUp={e => this.props.addMessageHandler(e)}
        />
      </footer>
    );
  }
}
