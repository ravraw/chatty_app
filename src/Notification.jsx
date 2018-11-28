import React from 'react';

export default function Notification(props) {
  let { userColor } = props;
  return (
    <div className="notification">
      <span style={{ color: `${userColor}` }} className="message system">
        {props.content}
      </span>
    </div>
  );
}
