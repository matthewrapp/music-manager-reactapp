import './index.css';
import { Content, FlexboxGrid, Container } from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header/NotAuthHeader'
import AppFooter from '../../components/Footer';

class Error extends Component {
    render() {
        return (
        <div className="Login show-fake-browser login-page">
            <Container>
                <AppHeader />
                <Content>
                    <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={12}>
                        <h1>Oops! Page not found...</h1>
                    </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <AppFooter />
            </Container>
        </div>
        )
  }
}

export default Error;
