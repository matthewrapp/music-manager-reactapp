import { Header, Navbar, Nav, Icon, Dropdown, Modal } from 'rsuite';
import { Component } from 'react';
import { artistIdCookie, authCookie, eraseCookie } from '../../../helper';
import { Redirect } from 'react-router';
import BtnCard from '../../Card/BtnCard';

import '../index.css';

class AuthHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: null,
      profileImg: null,
      isAuth: true,
      createModalOpen: false,
      mobileMenuOpen: false
    };
  }

  logout = async (e) => {
    let token = await authCookie(document.cookie).then(t => t);
    let artistId = await artistIdCookie(document.cookie).then(a => a);
    await eraseCookie(token);
    await eraseCookie(artistId);

    this.setState({
      ...this.state.profileName,
      ...this.state.profileImg,
      isAuth: false,
      ...this.state.createModalOpen,
      ...this.state.mobileMenuOpen
    })
  }

  createModalAction = (e) => {
    if (e.target.parentElement.classList.contains('open-modal-target')) {
        this.setState({
        ...this.state.profileName,
        ...this.state.profileImg,
        ...this.state.isAuth,
        createModalOpen: true,
        mobileMenuOpen: false
      })
    }

    if (e.target.classList.contains('rs-modal-header-close')) {
      this.setState({
        ...this.state.profileName,
        ...this.state.profileImg,
        ...this.state.isAuth,
        createModalOpen: false,
        mobileMenuOpen: false
      })
    }
  }
  
  openMobileMenu = (e) => {
    let element = e.target.nextSibling;
    if (!element.classList.contains('hide')) {
        this.setState({
        ...this.state.profileName,
        ...this.state.profileImg,
        ...this.state.isAuth,
        ...this.state.createModalOpen,
        mobileMenuOpen: false
      })
    } else {
        this.setState({
        ...this.state.profileName,
        ...this.state.profileImg,
        ...this.state.isAuth,
        ...this.state.createModalOpen,
        mobileMenuOpen: true
      })
    }
  }

  componentDidMount = async () => {
    const token = await authCookie(document.cookie).then(t => t);
        fetch(`${process.env.REACT_APP_API}/api/user-profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(user => {
                return user.json()
            })
          .then(user => {
                return this.setState({
                  profileName: user.firstName,
                  profileImg: user.imageUrl + '-/smart_resize/40x40/',
                  ...this.state.isAuth,
                  ...this.state.createModalOpen,
                  ...this.state.mobileMenuOpen
                })
            })
  }

  render() {
    const btnCardInfo = [
      {
        optionUrl: '/admin/create-artist',
        optionTitle: 'Create Artist',
        optionDesc: 'Create an artist! afasdfsadfadsf fadsf asdfa sfadsfadsfadsfadsfasdf fdsafadsf fdasfadsfdsafadsf fdasdfsda',
        optionIcon: 'music'
      },
      {
        optionUrl: '/admin/create-campaign',
        optionTitle: 'Create Campaign',
        optionDesc: 'Create a campaign, representing a song, to help you stay on top of your release precedures!',
        optionIcon: 'area-chart'
      }
    ]

    if (!this.state.isAuth) {
      return ( <Redirect to='/' /> )
    }
  
    return (
      <Header className="Header">
        <Navbar className="bg-dark-black desktop">
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">Music Manager</a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav justified pullRight>
              <Dropdown placement='bottomEnd' trigger={['click', 'hover']} icon={<img style={{ borderRadius: '50%', marginTop: '-8px' }} alt={this.state.profileName + this.state.profileImg} src={this.state.profileImg} />}>
                <Dropdown.Item href="/admin/profile">Account Profile</Dropdown.Item>
                <Dropdown.Item href="/admin/artists">Artists</Dropdown.Item>
                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
              </Dropdown>
            </Nav>
            <Nav pullRight>
              <Nav.Item href="/admin/campaigns" >Campaigns</Nav.Item>
              <Nav.Item href="/profile" >Manage</Nav.Item>
              <Nav.Item className='open-modal-target' onClick={this.createModalAction} >Create</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
        <Navbar className="bg-dark-black mobile">
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">Music Manager</a>
          </Navbar.Header>
          <Navbar.Body>
              <Nav justified pullRight>
                <Dropdown trigger={['click', 'hover']} icon={<img style={{ borderRadius: '50%', marginTop: '-8px' }} alt={this.state.profileName + this.state.profileImg} src={this.state.profileImg} />}>
                  <Dropdown.Item href="/admin/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown>
              </Nav>   
              <Icon style={{marginTop: '14px', marginRight: '10px', color: '#fff', float: 'right'}} icon='bars' size='2x' onClick={this.openMobileMenu}></Icon>
                <Nav className={`dropdown-menu ${this.state.mobileMenuOpen ? '' : 'hide'}`} style={{width: '100%'}}>
                  <Nav.Item href="/admin/campaigns" >Campaigns</Nav.Item>
                  <Nav.Item href="/profile" >Manage</Nav.Item>
                  <Nav.Item className='open-modal-target' onClick={this.createModalAction} >Create</Nav.Item>
                </Nav>
          </Navbar.Body>
        </Navbar>
        <div className='modal-container desktop-modal'>
          <Modal show={this.state.createModalOpen} onHide={this.createModalAction} size='sm' autoFocus >
            <Modal.Header>
              
            </Modal.Header>
            <Modal.Body>
              <BtnCard info={btnCardInfo} />
            </Modal.Body>
          </Modal>
        </div>
      </Header>
    );
  }
}

export default AuthHeader