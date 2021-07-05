import './index.css';
import { Col, Content, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, ButtonGroup, Button, FlexboxGrid, Container} from 'rsuite';
import React, { Component } from 'react';
import AppHeader from '../../components/Header/NotAuthHeader';
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
            isAuth: false,
            errMessage: false
        };
    }

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
            ...this.state.isAuth,
            ...this.state.errMessage
        })

        fetch(`${process.env.REACT_APP_API}/api/login`, {
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

            // set cookie with default artist
            document.cookie=`artistId=${jsonData.selectedArtist}`
            
            this.setState({
                ...this.state.formValue,
                isAuth: true,
                ...this.state.errMessage
            })

            return
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    
    render() {
        if (this.state.isAuth) {
            return (
                <Redirect to={{
                    pathname: '/admin/campaigns',
                }} />
            )
        }

        return (
            <div className="Login show-fake-browser login-page">
            {/* {this.state.errMessage ? (<Notification type="error" placement="bottomEnd" closable>{this.props.location.state.message}</Notification>) : null} */}
            <Container>
                <AppHeader />
                <Content>
                    <FlexboxGrid className="col-container" justify="center" align="middle">
                        <FlexboxGrid.Item className="col-item background-img" componentClass={Col} colspan={24} md={12} order={2} style={{backgroundImage: `url(${backgroundImg})`}}>
                            {/* Background Image Goes Here */}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item className="col-item col-item-right bg-dark-black" componentClass={Col} colspan={24} md={12} order={1}>
                            <Panel header={<h3>Login</h3>}>
                            <Form className='Form' ref={(ref) => {
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
                                        <Button classPrefix="rs-orange-btn-lg" onClick={this.handleSubmit} type="submit">Sign in</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                            <ButtonToolbar className="center mt-20">
                                <ButtonGroup vertical>   
                                    <Button appearance="subtle">Forgot Your Password?</Button>
                                    {/* <Button appearance="subtle">
                                        <Link to="/register">Don't Have An Account? Register</Link>
                                    </Button> */}
                                    <Button appearance="subtle" href="/register">Don't Have An Account? Register</Button>
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
