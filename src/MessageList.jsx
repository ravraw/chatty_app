import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {
  render() {
    const { notifications, messages } = this.props;
    const combined = [...messages, ...notifications];
    const sorted = combined.sort((a, b) => b.createdAt - a.createdAt);
    //const messages = this.props.messages;
    const messagesAndNotifications = sorted.map(message => {
      if (message.type === 'incomingMessage')
        return (
          <Message
            key={message.id}
            username={message.username}
            content={message.content.toLowerCase()}
          />
        );
      if (message.type === 'incomingNotification')
        return (
          <Notification
            key={message.id}
            content={message.content.toLowerCase()}
          />
        );
    });
    return <main className="messages">{messagesAndNotifications}</main>;
  }
}
