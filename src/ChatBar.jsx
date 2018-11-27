import React, { Component } from 'react';

export default class ChatBar extends Component {
  render() {
    console.log('componentDidMount <ChatBar />');
    return (
      <footer className="chatbar">
        <input
          name="username"
          className="chatbar-username"
          defaultValue={this.props.currentUser}
          placeholder="Your Name (Optional)"
        />
        <input
          name="content"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          defaultValue={this.props.userInput}
          onChange={e => this.props.onChangeHandler(e)}
          onKeyUp={e => this.props.onSubmitHandler(e)}
        />
      </footer>
    );
  }
}
