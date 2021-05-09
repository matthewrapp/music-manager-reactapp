import './index.css';
import { Content, Panel, Form, FormGroup, FormControlLabel, FormControl, ButtonToolbar, Button, FlexboxGrid } from 'rsuite';
import { Component } from 'react';

class Register extends Component {

    submitLogin() {
            
    }
    
    render() {
        return (
        <Content>
            <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Login</h3>} bordered>
                <Form fluid>
                    <FormGroup>
                    <FormControlLabel>Username or email address</FormControlLabel>
                    <FormControl name="name" />
                    </FormGroup>
                    <FormGroup>
                    <FormControlLabel>Password</FormControlLabel>
                    <FormControl name="password" type="password" />
                    </FormGroup>
                    <FormGroup>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={this.submitLogin()}>Sign in</Button>
                        <Button appearance="link">Forgot password?</Button>
                    </ButtonToolbar>
                    </FormGroup>
                </Form>
                </Panel>
            </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
        )
  }
}

export default Register;
