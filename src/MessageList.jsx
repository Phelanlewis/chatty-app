import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="message system">
        <div id="message-list">
          {this.props.messages.map((msg) => {
            return (<Message key={msg.username} username={msg.username} content={msg.content} />)
          })}

        </div>
      </div>
    );
  }
}
export default MessageList;
