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
   numberOfUsersOnline: 0
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

    let newUserName = {
      currentUser: currentUser.username,
      oldUsername,
      type: "nameUpdate"
    }

    this.socket.send(JSON.stringify(newUserName));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000/');
    // verify that socket connected
    console.log("Connected to server");

    this.socket.onmessage = (event) => {
      const sentMessage = JSON.parse(event.data);
      const type = sentMessage.type;
      const content = sentMessage.content;


    if (sentMessage.type === "incomingMessage") {
      let oldMessage = this.state.messages;
      let totalMessage = oldMessage.concat(sentMessage);
      this.setState({ messages: totalMessage });
    }

    if (type === "changeCurrentUser") {
      data.content = `${data.oldUsername} has become ${data.currentUser}`;
      console.log(data);
      console.log(data.content);
      let oldMessage = this.state.messages;
      let totalMessage = oldMessage.concat(sentMessage);
      this.setState({ messages: totalMessage });
    } else {
      return;
    }

    if (type === "numberOfUsersOnline") {
        this.setState({numberOfUsersOnline: data.numberOfUsersOnline})
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
         <p>Number of users online: {this.state.numberOfUsersOnline}</p>
        <Navbar />
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
