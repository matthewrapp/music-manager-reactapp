import { Navbar, Nav, Container, Icon, IconButton } from 'rsuite';
import { Component } from 'react';

import './index.css';

class PageNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBtn: false
    }
  }
  
  openMobileMenu = (e) => {
    let element = e.target.nextSibling;
    if (!element.classList.contains('hide')) {
      element.classList.add('hide');
    } else {
      element.classList.remove('hide');
    }
  }

  render() {
    // let pageNavigation;
    // if (this.props.btns !== undefined) {
    //   this.props.btns.map((btn, index) => {
    //     pageNavigation = <Nav.Item key={index} href={btn.btnLink} classPrefix={btn.btnClassPrefix} >{btn.btnValue}</Nav.Item>
    //     return pageNavigation
    //   })
    // }
    
    return (
      <Container className="PageNav">
        <Navbar className="bg-dark-black desktop">
          <Navbar.Header>
            <h5 className="page-title">{this.props.pageName}</h5>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              {this.props.btns !== undefined ? (this.props.btns.map((btn, index) => {
                return <Nav.Item key={index} href={btn.btnLink} classPrefix={btn.btnClassPrefix} >{btn.btnValue}</Nav.Item>
              })) : null}
            </Nav>
          </Navbar.Body>
        </Navbar>
        <Navbar className="bg-dark-black mobile">
          <Navbar.Header>
            <h5 className="page-title">{this.props.pageName}</h5>
          </Navbar.Header>
          <Navbar.Body>
            <IconButton icon={<Icon icon='chevron-circle-down'></Icon>} classPrefix='rs-green-btn-sm' placement='right' style={{float: 'right', marginTop: '6px'}}> Actions</IconButton>
            <Nav pullRight className='action-btns hide'>
              {this.props.btns !== undefined ? (this.props.btns.map((btn, index) => {
                return <Nav.Item key={index} href={btn.btnLink} classPrefix={btn.btnClassPrefix} >{btn.btnValue}</Nav.Item>
              })) : null}
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Container>
    );
  }
}

export default PageNav