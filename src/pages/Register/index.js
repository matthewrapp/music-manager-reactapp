import './index.css';
import { Col, Content, Panel, Form, FormGroup, FormControlLabel, FormControl, ButtonToolbar, ButtonGroup, Button, FlexboxGrid, Container} from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header'
// import AppFooter from '../../components/Footer';

import backgroundImg from '../../images/img-1.jpg';
import { Redirect } from 'react-router';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            auth: false,
            successSignUp: false,
            alreadySignedUp: false
        }
        // HandleSubmit relies on this.state
        // this guarantees that handleSubmit, no matter where you call it, will always be in the context of the login component aka 'this'
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount = (e) => {
        // Check to see if there is a cookie that already exists. If so, set auth to True and move on.
        if (document.cookie != null && document.cookie.split('=')[0] === 'auth') {
            return this.setState({
                ...this.state.formValue,
                auth: true,
                ...this.state.successSignUp
            })
        }
        return
    }

    handleSubmit = (e) => {
        let data = {
            firstName: this.state.formValue.firstName,
            lastName: this.state.formValue.lastName,
            email: this.state.formValue.email,
            password: this.state.formValue.password,
            confirmPassword: this.state.formValue.confirmPassword
        }

        // reset input boxes 
        this.setState({
            formValue: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        })

        fetch('https://music-manager--api.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => {
            console.log(data);
            const jsonData = data.json();
            return jsonData;
        })
        .then(jsonData => {
            
            if (jsonData.message) {
                alert(jsonData.message);
                return
            }

            this.setState({
                ...this.state.formValue,
                ...this.state.auth,
                successSignUp: true
            })

            return
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    
    render() {
        if (this.state.successSignUp) {
            return ( <Redirect to='/' /> )
        }

        if (this.state.auth) {
            return ( <Redirect to='/admin/dashboard' /> )
        }

        return (
            <div className="Register show-fake-browser login-page">
            <Container>
                <AppHeader />
                <Content>
                    <FlexboxGrid className="col-container" justify="center" align="middle">
                        <FlexboxGrid.Item className="col-item background-img" as={Col} colspan={24} md={12} order={2} style={{backgroundImage: `url(${backgroundImg})`}}>
                            {/* Background Image Goes Here */}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item className="col-item col-item-right bg-dark-black" as={Col} colspan={24} md={12} order={1}>
                            <Panel header={<h3>Register</h3>}>
                            <Form ref={(ref) => {
                                    this.form = ref;
                            }} onChange={formValue => { this.setState({ formValue }) }} formValue={this.state.formValue} fluid>
                                <FormGroup>
                                    <FormControlLabel>First Name</FormControlLabel>
                                    <FormControl name="firstName" type="text" />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel>Last Name</FormControlLabel>
                                    <FormControl name="lastName" type="text" />
                                </FormGroup>        
                                <FormGroup>
                                    <FormControlLabel>Email address</FormControlLabel>
                                    <FormControl name="email" type="email" />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel>Password</FormControlLabel>
                                    <FormControl name="password" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel>Confirm Password</FormControlLabel>
                                    <FormControl name="confirmPassword" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar className="right">
                                        <Button classPrefix="orange-btn" onClick={this.handleSubmit} type="submit">Register</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                            <ButtonToolbar className="center mt-20">
                                <ButtonGroup vertical>   
                                    <Button appearance="subtle" href="https://music-manager--api.herokuapp.com/">Already Have An Account? Register</Button>
                                </ButtonGroup>     
                            </ButtonToolbar>
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

export default Register;
