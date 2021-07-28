import './index.css';
import { Content, Container, FlexboxGrid, Col, Schema, Panel, Form, FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, Modal } from 'rsuite';
import React, { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader';
import PageNav from '../../components/PageNav';
import UploadImg from '../../components/UploadImg';
import { authCookie } from '../../helper';
// import AppFooter from '../../components/Footer';

const { StringType } = Schema.Types;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                profileFirstName: '',
                profileLastName: '',
                profileEmail: '',
                profileImg: ''
            },
            formError: {},
            hasValidationError: true,
            success: false,
            openImgModal: false
        };
    }

    handleSubmit = async () => {
        const token = await authCookie(document.cookie).then(t => t);
        const data = {
            email: this.state.formValue.profileEmail,
            firstName: this.state.formValue.profileFirstName,
            lastName: this.state.formValue.profileLastName
        }
        fetch(`${process.env.REACT_APP_API}/api/update-user-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.split('=')[1]}`
            },
            body: JSON.stringify(data)
        })
            .then(user => {
                return user.json()
            })
            .then(user => {
                console.log(user)
            })
    }

    openImgWidget = async (e) => {
        if (e.target.classList.contains('open-modal-target')) {
            this.setState({
                openImgModal: true
            })
        }

        if (e.target.classList.contains('rs-modal-header-close')) {
            this.setState({
                openImgModal: false
            })
        }
    }

    cb = (childData) => {
        alert(childData.message);
        window.location.reload();
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
                    formValue: {
                        profileImg: user.imageUrl + '-/smart_resize/340x340/-/crop/280x280/center/',
                        profileFirstName: user.firstName,
                        profileLastName: user.lastName,
                        profileEmail: user.email
                    }
                })
            })
    }

    render() {
        const model = Schema.Model({
            profileFirstName: StringType(),
            profileLastName: StringType(),
            profileEmail: StringType()
        });

        return (
            <div className="Profile">
            <Container>
                <AppHeader />
                <Content>
                    <PageNav pageName="Account / Profile"/>    
                    <FlexboxGrid style={{margin: '20px auto'}}>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} style={{textAlign: 'center'}}>
                                <img style={{}} alt={this.state.formValue.profileFirstName + this.state.formValue.profileLastName + this.state.formValue.profileImg} src={this.state.formValue.profileImg} />
                                {/* <IconButton style={{background: 'transparent'}} icon={<Icon icon='pencil-square' />}></IconButton> */}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={16}>
                            <Panel>
                                <Form className='Form' model={model}
                                    ref={(ref) => { this.form = ref; }}
                                    onChange={formValue => {
                                        this.setState({ formValue })
                                    }}
                                    formValue={this.state.formValue}
                                    onCheck={formError => {
                                        this.setState({
                                            formError: formError,
                                            hasValidationError: (Object.keys(formError).length === 0 ? false : true)
                                        })
                                    }}
                                    fluid>
                                    <FlexboxGrid justify='center'>
                                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}>
                                            <FormGroup>
                                                <ControlLabel>First Name</ControlLabel>
                                                    <FormControl name="profileFirstName" type="text" placeholder={this.state.formValue.profileFirstName} value={this.state.formValue.profileFirstName}/>
                                            </FormGroup>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}>
                                            <FormGroup>
                                                <ControlLabel>Last Name</ControlLabel>
                                                <FormControl name="profileLastName" type="text" placeholder={this.state.formValue.profileLastName} value={this.state.formValue.profileLastName}/>
                                            </FormGroup>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}>
                                            <FormGroup>
                                                <ControlLabel>Email</ControlLabel>
                                                <FormControl name="profileEmail" type="text" placeholder={this.state.formValue.profileEmail} value={this.state.formValue.profileEmail} />
                                            </FormGroup>
                                        </FlexboxGrid.Item>    
                                    </FlexboxGrid>
                                    <FormGroup>
                                        <ButtonToolbar className="right">
                                            <Button classPrefix="rs-green-btn-lg"
                                                className='open-modal-target'
                                                onClick={this.openImgWidget}
                                                type="submit"
                                                style={{marginRight: '5px', marginTop: '10px'}}>Edit Image</Button>
                                            <Button classPrefix="rs-orange-btn-lg"
                                                    onClick={this.handleSubmit}
                                                    type="submit"
                                                    style={{marginRight: '5px', marginTop: '10px'}}
                                                    disabled={this.state.hasValidationError}>Update Information</Button>
                                        </ButtonToolbar>
                                    </FormGroup>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>  
                <Modal className='Modal' show={this.state.openImgModal} onHide={this.openImgWidget} size='xs' autoFocus >
                    <Modal.Header><Modal.Title>Upload New Profile Image</Modal.Title></Modal.Header>    
                    <Modal.Body>
                        <UploadImg url='/api/upload-user-img' cb={this.cb}/>
                    </Modal.Body>
                </Modal> 
            </Container>
        </div>
        )
  }
}

export default Profile;
