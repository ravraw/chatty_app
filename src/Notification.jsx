import React from 'react';

export default function Notification(props) {
  return (
    <div className="message system">
      <p>{props.content}</p>
    </div>
  );
}
