import './index.css';
import { Col, Content, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, ButtonGroup, Button, FlexboxGrid, Container} from 'rsuite';
import React, { Component } from 'react';
import AppHeader from '../../components/Header'
// import AppFooter from '../../components/Footer';

import backgroundImg from '../../images/img-1.jpg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                email: '',
                password: ''
            },
            notSignedUp: false,
            errMessage: false
        };
        // HandleSubmit relies on this.state
        // this guarantees that handleSubmit, no matter where you call it, will always be in the context of the login component aka 'this'
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount = (e) => {
    //     // Check to see if there is a cookie that already exists. If so, set auth to True and move on.
    //     if (this.props.location.state.message !== null || this.props.location.state.message !== '' || this.props.location.state.message !== undefined) {
    //         this.setState({
    //             ...this.state.formValue,
    //             ...this.state.notSignedUp,
    //             errMessage: true
    //         })
    //     }

    //     return
    // }

    handleSubmit = (e) => {
        let data = {
            email: this.state.formValue.email,
            password: this.state.formValue.password
        }

        // reset input boxes 
        this.setState({
            formValue: {
                email: '',
                password: ''
            },
            ...this.state.notSignedUp,
            ...this.state.errMessage
        })

        fetch(process.env.REACT_APP_API, {
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
            
            return
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    
    render() {
        return (
            <div className="Login show-fake-browser login-page">
            {/* {this.state.errMessage ? (<Notification type="error" placement="bottomEnd" closable>{this.props.location.state.message}</Notification>) : null} */}
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
                                    <ControlLabel>Email address</ControlLabel>
                                    <FormControl name="email" type="email" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl name="password" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar className="right">
                                        <Button classPrefix="rs-orange-btn" onClick={this.handleSubmit} type="submit">Sign in</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                            <ButtonToolbar className="center mt-20">
                                <ButtonGroup vertical>   
                                    <Button appearance="subtle">Forgot Your Password?</Button>
                                    <Button appearance="subtle" href="https://music-manager--api.herokuapp.com/register">Don't Have An Account? Register</Button>
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

export default Login;
