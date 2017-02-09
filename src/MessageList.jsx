import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="message system">
        <div id="message-list">
          {/* map runs through the key, username and message content of each message in this.state */}
          {this.props.messages.map((msg) => {
            return (
              <Message
                key={msg.key}
                username={msg.username}
                content={msg.content}
              />
             )
          })}

        </div>
      </div>
    );
  }
}
export default MessageList;
