import { Navbar, Nav, Container } from 'rsuite';
import { Component } from 'react';

import './index.css';

class PageNav extends Component {
  

  render() {
    return (
      <Container className="PageNav">
        <Navbar className="bg-dark-black">
          <Navbar.Header>
            <h5 className="page-title">{this.props.pageName}</h5>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              {this.props.btns.map(btn => {
                return <Nav.Item href={btn.btnLink} classPrefix={btn.btnClassPrefix} >{btn.btnValue}</Nav.Item>
              })}
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Container>
    );
  }
}

export default PageNav