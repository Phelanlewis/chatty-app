import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
  super(props);
  this.state = {
    username: props.currentUser,
    content: ''
    }
  }

// this function takes in the state of username when event is triggered
  onUsernameChangeHandler(event) {
    this.setState({username: event.target.value});
  }

// this function takes the current username in the input field and bidn it to the change target user
  updateNameOnBlur(event) {
     this.props.changeCurrentUser({username: event.target.value})
   }

// this function takes the state of content when the event is triggered
  onContentChangeHandler(event) {
    this.setState({content: event.target.value});
  }

//this is the triggering event pressing ENTER
  manageKeyDown(event) {
    if (event.key === "Enter") {
      // passes the username and content into the newMessage function on App.jsx
      this.props.newMessage(this.state.username, this.state.content);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"

          // this is the value for the onUsernameChangeHandler in event.target.value
          value={this.state.username}
          // onChange binds this to the event
          onChange={this.onUsernameChangeHandler.bind(this)}
          //change the user name
          onBlur={ this.updateNameOnBlur.bind(this)}
         />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          //this is the value for the onContentChangeHandler in event.target.value
          value={this.state.content}
          // onChange binds this to the event
          onChange={this.onContentChangeHandler.bind(this)}
          //this sets off the binding event when you press ENTER
          onKeyDown={this.manageKeyDown.bind(this)}
         />
      </footer>
    );
  }
}

export default Chatbar;
