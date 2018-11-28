import React from 'react';

export default function Message(props) {
  //console.log('componentDidMount <Message />');
  let { userColor } = props;
  return (
    <div className="message">
      <span style={{ color: `${userColor}` }} className="message-username">
        {props.username}
      </span>
      <span className="message-content">{props.content}</span>
    </div>
  );
}
