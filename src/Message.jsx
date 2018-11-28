import React from 'react';

export default function Message(props) {
  //console.log('componentDidMount <Message />');
  return (
    <div className="message">
      <span className="message-username">{props.username}</span>
      <span className="message-content">{props.content}</span>
    </div>
  );
}
