import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className={`message ${this.props.type === 'incomingNotification' ? 'system' : ''}`}>
        <span className="username">
          {this.props.username}
        </span>
        <span className="content">
          {this.props.content}
        </span>
      </div>
    );
  }
}
export default Message;
