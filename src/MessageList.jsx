import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {
  render() {
    console.log('componentDidMount <NavBar />');
    const messages = this.props.messages;
    const messageArray = messages.map(message => {
      return (
        <Message
          key={message.id}
          username={message.username}
          content={message.content}
        />
      );
    });
    return <main className="messages">{messageArray}</main>;
  }
}
