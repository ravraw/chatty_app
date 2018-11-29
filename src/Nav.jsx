import React from 'react';

export default function Nav(props) {
  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <p className="navbar-count">{props.count} users online</p>
      </nav>
    </div>
  );
}
