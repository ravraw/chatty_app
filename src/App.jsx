import React, { Component } from 'react';
import Nav from './Nav.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      messages: [
        { id: 1, username: 'Bob', content: 'Has anyone seen my marbles?' },
        {
          id: 2,
          username: 'Anonymous',
          content:
            'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ],
      loading: true,
      userInput: '',
      currentUser: { name: 'Bob' }
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onUserComment(text) {
    this.setState({ userInput: text });
  }

  onChangeHandler(e) {
    let input = e.target.value;
    this.onUserComment(input);
  }
  onSubmitHandler(e) {
    if (e.keyCode === 13 && e.target.value.length) {
      console.log('STATE:', this.state.userInput);
      let newMessage = {
        id: e.target.value,
        content: e.target.value,
        username: this.state.currentUser.name
      };
      let newMessages = [...this.state.messages, newMessage];
      this.setState({ messages: newMessages });
      e.target.value = '';
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: 'Michelle',
        content: 'Hello there!'
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }
  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          userInput={this.state.userInput}
          onChangeHandler={this.onChangeHandler}
          onSubmitHandler={this.onSubmitHandler}
        />
      </div>
    );
  }
}
export default App;
