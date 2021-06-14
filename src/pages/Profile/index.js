import './index.css';
import { Content, Container, FlexboxGrid, Col, Schema, Panel, Form, FormGroup, ControlLabel, FormControl, Button, ButtonToolbar} from 'rsuite';
import React, { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader';
import PageNav from '../../components/PageNav';
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
            success: false
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
                        profileImg: user.imageUrl + '-/smart_resize/320x320/-/crop/280x280/center/',
                        profileFirstName: user.firstName,
                        profileLastName: user.lastName,
                        profileEmail: user.email
                    },
                    ...this.state.formError,
                    ...this.state.hasValidationError,
                    ...this.state.success
                })
            })
    }

    render() {
        const btnArray = [
            {
                btnValue: 'See Artists',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-blue-btn-sm',
                btnId: 1
            }
        ]

        const model = Schema.Model({
            profileFirstName: StringType(),
            profileLastName: StringType(),
            profileEmail: StringType()
        });

        return (
            <div className="Profile">
            {/* {this.state.errMessage ? (<Notification type="error" placement="bottomEnd" closable>{this.props.location.state.message}</Notification>) : null} */}
            <Container>
                <AppHeader />
                <Content>
                    <PageNav pageName="Profile" btns={btnArray} />    
                    <FlexboxGrid style={{maxWidth: '1200px', margin: '0 auto'}}>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} style={{textAlign: 'center'}}>
                                <img style={{ borderRadius: '50%' }} alt={this.state.formValue.profileFirstName + this.state.formValue.profileLastName + this.state.formValue.profileImg} src={this.state.formValue.profileImg} />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={16}>
                            <Panel header={<h3>Profile Information</h3>}>
                                    <Form model={model}
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
                                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={12}>
                                            <FormGroup>
                                                <ControlLabel>First Name</ControlLabel>
                                                    <FormControl name="profileFirstName" type="text" placeholder={this.state.formValue.profileFirstName} value={this.state.formValue.profileFirstName}/>
                                            </FormGroup>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={12}>
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
                                            <Button classPrefix="rs-orange-btn-lg"
                                                    onClick={this.handleSubmit}
                                                    type="submit"
                                                    style={{marginRight: '5px', marginTop: '20px'}}
                                                    disabled={this.state.hasValidationError}>Update Information</Button>
                                        </ButtonToolbar>
                                    </FormGroup>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                {/* <AppFooter /> */}
            </Container>
        </div>
        )
  }
}

export default Profile;
