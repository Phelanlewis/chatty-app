import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
  super(props);
  this.state = {
    username: '',
    content: ''
    }
  }


  onUsernameChangeHandler(event) {
    this.setState({username: event.target.value});
  }

  onContentChangeHandler(event) {
    this.setState({content: event.target.value});
  }

  manageKeyDown(event) {
    if (event.key === "Enter") {
      this.props.newMessage(this.state.username, this.state.content);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          value={this.state.username}
          placeholder={this.props.currentUser.name}
          onChange={this.onUsernameChangeHandler.bind(this)}
         />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.onContentChangeHandler.bind(this)}
          onKeyDown={this.manageKeyDown.bind(this)}
         />
      </footer>
    );
  }
}

export default Chatbar;
