import './index.css';
import { Row, Col, Content, Panel, Button, FlexboxGrid, Container } from 'rsuite';
import FlexboxGridItem from 'rsuite/es/FlexboxGrid/FlexboxGridItem';
import { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader'
import PageNav from '../../components/PageNav';

import { authCookie } from '../../helper';
import ArtistCard from '../../components/Card/ArtistCard';

/*
This class displays all the campaigns/songs related to the user/artists
*/
class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfArtists: 0,
            artists: []
        }
    }

    componentDidMount = async (e) => {
        // Check to see if there is a cookie that already exists. If so, set auth to True and move on.
            // that means that we are authenticated, now check to see if there are artists...
        
        // issue is I need to select the right cookie to split and send in authorization
        const token = await authCookie(document.cookie).then(t => t);
        fetch(`${process.env.REACT_APP_API}/api/artists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(artists => {
                return artists.json()
            })
            .then(artists => {
                if (artists.artists.length < 1) {
                    return this.setState({
                        ...this.state.numOfArtists,
                        ...this.state.artists
                    })
                }
                return this.setState({
                    numOfArtists: artists.artists.length,
                    artists: artists.artists
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

        const btnArray = [
            {
                btnValue: 'Create New Artist',
                btnMobileValue: 'Create',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 1
            }
        ]

        return (
            <div className="Artists">
            <Container>
                <AppHeader />
                    <Content>
                        <PageNav pageName="Artists" btns={btnArray} />
                        <FlexboxGrid className="ArtistCard" justify="space-between">
                            {this.state.artists.map(artist => {
                                return <ArtistCard key={artist._id} artistId={artist._id} date={artist.date.split('T')[0]} artist={artist.artistName} artistImg={artist.imageUrl + '100x100'} artistImgAltTag={artist.artistName} primary={artist.primary}/>
                            })}
                        </FlexboxGrid>        
                </Content>
                {/* <AppFooter /> */}
            </Container>
        </div>
        )
  }
}

export default Artists;
