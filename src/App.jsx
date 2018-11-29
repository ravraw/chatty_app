import React, { Component } from 'react';
import Nav from './Nav.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      messages: [],
      notifications: [],
      loading: true,
      userInput: '',
      currentUser: { name: '' },
      clientCount: '',
      userColor: ''
    };

    this.addCurrentUserHandler = this.addCurrentUserHandler.bind(this);
    this.addMessageHandler = this.addMessageHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  addCurrentUserHandler(e) {
    console.log(e.target.value);
    const oldUser = this.state.currentUser.name || 'Anonymous';
    const newUser = e.target.value || 'Anonymous';
    console.log('NEW USER:', newUser);
    const updatedUser = { ...this.new, name: newUser };
    if (e.keyCode === 13) {
      this.setState({ currentUser: updatedUser });
      let newNotification = {
        type: 'postNotification',
        content: `**${oldUser}** has changed their name to **${newUser}**.`,
        userColor: this.state.userColor,
        createdAt: new Date().getTime()
      };
      this.socket.send(JSON.stringify(newNotification));
    }
  }

  replaceQuotes(str) {
    return str.replace(/(^["|'])+|(["|']+$)/g, '');
  }

  getURL(str) {
    let splitArray = str.split(' ');
    let userContent = '';
    let url;
    splitArray.forEach(el => {
      if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(el)) {
        url = el;
      } else if (/(http(s?):)([/|.|\w|\s|-])*/.test(el)) {
        userContent += `    ***** IMAGE NOT FOUND - LINK BROKEN ****   `;
      } else {
        userContent += ` ${el}`;
      }
    });
    return { url, userContent };
  }

  onUserComment(text) {
    this.setState({ userInput: text });
  }

  onChangeHandler(e) {
    let input = e.target.value;
    this.onUserComment(input);
  }

  addMessageHandler(e) {
    if (e.keyCode === 13 && e.target.value.length) {
      let newMessage = {
        type: 'postMessage',
        content:
          this.getURL(this.replaceQuotes(e.target.value)).userContent || '',
        imgURL: this.getURL(this.replaceQuotes(e.target.value)).url || '',
        username: this.state.currentUser.name || 'Anonymous',
        userColor: this.state.userColor,
        createdAt: new Date().getTime()
      };
      let newMessages = [...this.state.messages, newMessage];
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = '';
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = event => {
      console.log('Connected to server');
    };

    this.socket.onmessage = e => {
      console.log(event);
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);
      let newMessage;
      switch (data.type) {
        case 'incomingMessage':
          // handle incoming message
          let newMessages = [...this.state.messages, data];
          this.setState({ messages: newMessages });
          //newMessage = {};
          break;
        case 'incomingNotification':
          // handle incoming notification
          let newNotifications = [...this.state.notifications, data];
          this.setState({ notifications: newNotifications });
          break;
        case 'clientCount':
          // handle incoming clinet Count
          //let newNotifications = [...this.state.notifications, data];
          console.log(data.count);
          this.setState({ clientCount: data.count });
          break;
        case 'userColor':
          // handle incoming clinet Count
          //let newNotifications = [...this.state.notifications, data];
          console.log(data.color);
          this.setState({ userColor: data.color });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    };
  }
  render() {
    console.log('COMPONENT IS LOADED');
    return (
      <div>
        <Nav count={this.state.clientCount} />
        <MessageList
          messages={this.state.messages}
          notifications={this.state.notifications}
        />
        <ChatBar
          currentUser={this.state.currentUser.name}
          userInput={this.state.userInput}
          onChangeHandler={this.onChangeHandler}
          addMessageHandler={this.addMessageHandler}
          addCurrentUserHandler={this.addCurrentUserHandler}
        />
      </div>
    );
  }
}
export default App;
