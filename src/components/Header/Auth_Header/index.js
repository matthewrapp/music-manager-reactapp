import { Header, Navbar, Nav } from 'rsuite';
import { Component } from 'react';

import '../index.css';

import { SettingOutlined } from '@ant-design/icons'; 

class AppHeader extends Component {
  render() {
    return (
      <Header className="Header">
        <Navbar className="bg-dark-black">
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">Music Manager</a>
          </Navbar.Header>
          <Navbar.Body>
            {/* <Nav>
              <Nav.Item href="/tosdklj" icon={<HomeOutlined />} > Home</Nav.Item>
            </Nav> */}
            <Nav pullRight>
              <Nav.Item href="/profile" icon={<SettingOutlined />} > Settings</Nav.Item>
            </Nav>
            <Nav pullRight>
              <Nav.Item href="/profile" icon={<SettingOutlined />} > Another Tab</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
    );
  }
}

export default AppHeader