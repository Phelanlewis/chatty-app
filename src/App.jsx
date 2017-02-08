import React, {Component} from 'react';
import Navbar from './navbar.jsx'
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
  super(props);

// Original state being set
  this.state = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    }, {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }]
  }
}
  addMessage(username, content){
  let newMessage = {
    username: username,
    content: content,
    key: Date.now()
  }
   const messages = this.state.messages.concat(newMessage)
  console.log(newMessage);
  this.setState({messages: messages})
};



  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
