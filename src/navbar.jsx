import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="counter">There {this.props.count == 1 ? 'is' : 'are'} { this.props.count } { this.props.count == 1 ? 'user' : 'users' } online
        </div>
      </nav>
    );
  }
}
export default Navbar;
