import './index.css';
import { Row, Col, Content, Panel, Button, FlexboxGrid, Container} from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header'
// import AppFooter from '../../components/Footer';

import FlexboxGridItem from 'rsuite/es/FlexboxGrid/FlexboxGridItem';

class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfArtists: 0
        }
        // HandleSubmit relies on this.state
        // this guarantees that handleSubmit, no matter where you call it, will always be in the context of the login component aka 'this'
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount = (e) => {
        // Check to see if there is a cookie that already exists. If so, set auth to True and move on.
            // that means that we are authenticated, now check to see if there are artists...
        fetch(process.env.REACT_APP_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(user => {
                return user.json()
            })
            .then(user => {
                if (user.artists.length < 1) {
                    return this.setState({
                        ...this.state.numOfArtists
                    })
                }
                return this.setState({
                    numOfArtists: user.artists.length
                })
            })
    }
    
    render() {

        if (this.state.numOfArtists < 1) {
            return (
                <div className="Campaigns">
                    <Container>
                        <AppHeader />
                        <Content>
                            <Row>
                                <Col>
                                    <Panel shaded >
                                        <FlexboxGrid justify='space-between'>
                                            <FlexboxGridItem>
                                                <h4>Currently, you have no artists.</h4>
                                                <p>Create an artist to get started.</p>
                                            </FlexboxGridItem>
                                            <FlexboxGridItem>
                                                <Button classPrefix="orange-btn" href="https://facebook.com/" type="submit">Create An Artist</Button>
                                            </FlexboxGridItem>
                                        </FlexboxGrid>
                                    </Panel>
                                </Col>
                            </Row>
                        </Content>
                    </Container>
                </div>
            )
        }
        
        return (
            <div className="Campaigns">
            <Container>
                <AppHeader />
                <Content>
                    <h1>Hello, this is the campaigns page.</h1>
                </Content>
                {/* <AppFooter /> */}
            </Container>
        </div>
        )
  }
}

export default Campaigns;
