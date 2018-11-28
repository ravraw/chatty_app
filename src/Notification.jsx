import React from 'react';

export default function Notification(props) {
  return (
    <div className="notification">
      <span className="message system">{props.content}</span>
    </div>
  );
}
