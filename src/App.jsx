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
      currentUser: { name: '' }
    };

    this.addCurrentUserHandler = this.addCurrentUserHandler.bind(this);
    this.addMessageHandler = this.addMessageHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  addCurrentUserHandler(e) {
    console.log(e.target.value);
    const oldUser = this.state.currentUser.name || 'UNKNOWN USER';
    const newUser = e.target.value || 'UNKNOWN USER';
    const updatedUser = { ...this.new, name: newUser };
    if (e.keyCode === 13) {
      this.setState({ currentUser: updatedUser });
      let newNotification = {
        type: 'postNotification',
        content: `**${oldUser}** has changed their name to **${newUser}**.`,
        createdAt: new Date().getTime()
      };
      this.socket.send(JSON.stringify(newNotification));
    }
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
        //id: e.target.value,
        type: 'postMessage',
        content: e.target.value,
        username: this.state.currentUser.name,
        createdAt: new Date().getTime()
      };
      let newMessages = [...this.state.messages, newMessage];
      //this.setState({ messages: newMessages });
      //this.socket.onopen = function(event) {
      this.socket.send(JSON.stringify(newMessage));
      //};
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
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }

      // console.log('DATA RECIEVED FROM SERVER :', JSON.parse(e.data));
      // //let messageRecieved = JSON.parse(e.data);
      // let newMessages = [...this.state.messages, messageRecieved];
      // this.setState({ messages: newMessages });
    };
  }
  render() {
    console.log('COMPONENT IS LOADED');
    return (
      <div>
        <Nav />
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
