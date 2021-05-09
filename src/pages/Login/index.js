import './index.css';
import { Col, Content, Panel, Form, FormGroup, FormControlLabel, FormControl, ButtonToolbar, Button, FlexboxGrid, Container} from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header'
// import AppFooter from '../../components/Footer';

import backgroundImg from '../../images/img-1.jpg';
import { Redirect } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                email: '',
                password: ''
            },
            auth: false
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
                auth: true
            })
        }
        return
    }

    handleSubmit = (e) => {
        let data = {
            email: this.state.formValue.email,
            password: this.state.formValue.password
        }

        // reset input boxes 
        // this.state.formValue.email = ''
        // this.state.formValue.password = ''
        this.setState({
            formValue: {
                email: '',
                password: ''
            }
        })

        fetch('https://music-manager--api.herokuapp.com/api/login', {
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
            if (jsonData.isAuth !== true) {
                alert(jsonData.message);
                return
            }

            // set cookie with token in it
            let d = new Date();
            d.setTime(d.getTime() + (5 * 24 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            // document.cookie = `auth=${jsonData.token}` + ';' + expires + ";path=/";
            document.cookie = `auth=${jsonData.token};${expires};path=/`;
            
            // set state to auth true
            this.setState({
                ...this.state.formValue,
                auth: true
            })
            
            return
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    
    render() {
        if (this.state.auth) {
            console.log(this.state.auth);
            return ( <Redirect to='/admin/dashboard' /> )
        }

    

        return (
            <div className="Login show-fake-browser login-page">
            <Container>
                <AppHeader />
                <Content>
                    <FlexboxGrid className="col-container" justify="center" align="middle">
                        <FlexboxGrid.Item className="col-item background-img" as={Col} colspan={24} md={12} order={2} style={{backgroundImage: `url(${backgroundImg})`}}>
                            {/* Background Image Goes Here */}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item className="col-item col-item-right bg-dark-black" as={Col} colspan={24} md={12} order={1}>
                            <Panel header={<h3>Login</h3>}>
                            <Form ref={(ref) => {
                                    this.form = ref;
                            }} onChange={formValue => { this.setState({ formValue }) }} formValue={this.state.formValue} fluid>
                                <FormGroup>
                                    <FormControlLabel>Email address</FormControlLabel>
                                    <FormControl name="email" type="email" />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel>Password</FormControlLabel>
                                    <FormControl name="password" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar className="right">
                                        <Button classPrefix="orange-btn" onClick={this.handleSubmit} type="submit">Sign in</Button>
                                    </ButtonToolbar>
                                    <ButtonToolbar className="center mt-20">
                                        <Button classPrefix="grey-hyperlink">Forgot Your Password?</Button>
                                        <Button classPrefix="grey-hyperlink">Don't Have An Account? Register</Button>
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

export default Login;
