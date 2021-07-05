import './index.css';
import { Col, Content, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, ButtonGroup, Button, FlexboxGrid, Container} from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header/NotAuthHeader'
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
            successSignUp: false
        }
        // HandleSubmit relies on this.state
        // this guarantees that handleSubmit, no matter where you call it, will always be in the context of the login component aka 'this'
        // this.handleSubmit = this.handleSubmit.bind(this)
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
            },
            ...this.state.successSignUp
        })

        fetch(`${process.env.REACT_APP_API}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => {
            const jsonData = data.json();
            return jsonData;
        })
        .then(jsonData => {
            console.log(jsonData)
            if (jsonData.message) {
                alert(jsonData.message);
                return
            }

            this.setState({
                ...this.state.formValue,
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

        return (
            <div className="Register show-fake-browser login-page">
            <Container>
                <AppHeader />
                <Content>
                    <FlexboxGrid className="col-container" justify="center" align="middle">
                        <FlexboxGrid.Item className="col-item background-img" componentClass={Col} colspan={24} md={12} order={2} style={{backgroundImage: `url(${backgroundImg})`}}>
                            {/* Background Image Goes Here */}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item className="col-item col-item-right bg-dark-black" componentClass={Col} colspan={24} md={12} order={1}>
                            <Panel header={<h3>Register</h3>}>
                            <Form className='Form' ref={(ref) => {
                                    this.form = ref;
                            }} onChange={formValue => { this.setState({ formValue }) }} formValue={this.state.formValue} fluid>
                                <FormGroup>
                                    <ControlLabel>First Name</ControlLabel>
                                    <FormControl name="firstName" type="text" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Last Name</ControlLabel>
                                    <FormControl name="lastName" type="text" />
                                </FormGroup>        
                                <FormGroup>
                                    <ControlLabel>Email address</ControlLabel>
                                    <FormControl name="email" type="email" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl name="password" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Confirm Password</ControlLabel>
                                    <FormControl name="confirmPassword" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar className="right">
                                        <Button classPrefix="rs-orange-btn-lg" onClick={this.handleSubmit} type="submit">Register</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                            <ButtonToolbar className="center mt-20">
                                <ButtonGroup vertical>   
                                    <Button appearance="subtle" href="/">Already Have An Account? Login</Button>
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
