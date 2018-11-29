import React from 'react';

export default function Message(props) {
  let { userColor } = props;
  let image = props.imgURL ? (
    <img className="message__img" src={props.imgURL} alt="some-image" />
  ) : (
    ''
  );
  return (
    <div className="message">
      <span style={{ color: `${userColor}` }} className="message-username">
        {props.username}
      </span>
      <span className="message-content">{props.content}</span>
      <div className="message__content">{image}</div>
    </div>
  );
}
