import { Header, Navbar } from 'rsuite';
import { Component } from 'react';

import '../index.css';

class NotAuthHeader extends Component {

  render() {
    return (
      <Header className="Header">
        <Navbar className="bg-dark-black">
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">Music Manager</a>
          </Navbar.Header>
          {/* <Navbar.Body>
            <Nav pullRight>
              <Nav.Item href="/profile" > Campaigns</Nav.Item>
              <Nav.Item href="/profile" > Manage</Nav.Item>
              <Nav.Item href="/profile" > Create</Nav.Item>
            </Nav>
          </Navbar.Body> */}
        </Navbar>
      </Header>
    );
  }
}

export default NotAuthHeader