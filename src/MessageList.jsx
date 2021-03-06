import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {
  render() {
    const { notifications, messages } = this.props;
    const combined = [...messages, ...notifications];
    const sorted = combined.sort((a, b) => b.createdAt - a.createdAt);
    const messagesAndNotifications = sorted.map(message => {
      if (message.type === 'incomingMessage')
        return (
          <Message
            key={message.id}
            username={message.username}
            content={message.content.toLowerCase()}
            imgURL={message.imgURL}
            userColor={message.userColor}
          />
        );
      if (message.type === 'incomingNotification')
        return (
          <Notification
            key={message.id}
            content={message.content.toLowerCase()}
            userColor={message.userColor}
          />
        );
    });
    return <main className="messages">{messagesAndNotifications}</main>;
  }
}
