const uuid = require('uuid');
import React, {Component} from 'react';
import Navbar from './navbar.jsx'
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
  super(props);

// Original state being set
this.state = {
   currentUser: {username: "Anonymous"},
   messages: [],
   userCount: 0
 }
}

  // function to add new messages and adds unique key of date.now()
  addMessage(username, content){
  let newMessage = {
    username: username,
    content: content,
    type: "postMessage",
  };

  //concat newMessage object on list of messages in this.state
  const messages = this.state.messages;
  this.setState({ messages });
  //sends json string over websocket
  this.socket.send(JSON.stringify(newMessage));
};

  changeCurrentUser(currentUser) {
    let oldUsername = this.state.currentUser.username;
    this.setState({ currentUser: {username: currentUser.username}});

    let content = `${oldUsername} has become ${currentUser.username}`;

    if(oldUsername !== currentUser.username){
    let newUserName = {
      content: content,
      type: "postNotification"
    };

    this.socket.send(JSON.stringify(newUserName));
    } else {
      return;
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000/');
    // verify that socket connected
    console.log("Connected to server");

    this.socket.onmessage = (event) => {
      const sentMessage = JSON.parse(event.data);
      const type = sentMessage.type;
      const content = sentMessage.content;
      console.log(sentMessage);

    if (type === "incomingMessage") {
      let oldMessage = this.state.messages;
      console.log(sentMessage);
      let totalMessage = oldMessage.concat(sentMessage);
      this.setState({ messages: totalMessage });
    }

    if (type === "incomingNotification") {
      let oldMessage = this.state.messages;
      console.log(sentMessage);
      let totalMessage = oldMessage.concat(sentMessage);
      this.setState({ messages: totalMessage });
      }

    if (type === "userCount") {
      const oldCount = this.state.userCount;
      // console.log(oldCount);
      const newUserCount = sentMessage.userCount + oldCount;
      // console.log(sentMessage.userCount);
      this.setState({ userCount: newUserCount });
    }
  }

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }
  }

  componentWillUnmount()
    {
      this.wss.close();
    }


  render() {
    return (
      <div>

        <Navbar
          count={this.state.userCount}
        />
        <MessageList
          messages={this.state.messages}
          currentUser={this.state.currentUser}
        />
        <ChatBar
          currentUser={this.state.currentUser.username}
          newMessage={this.addMessage.bind(this)}
          changeCurrentUser={this.changeCurrentUser.bind(this)}
        />
      </div>
    );
  }
}
export default App;
