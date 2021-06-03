import './index.css';
import { Row, Col, Content, Panel, Button, FlexboxGrid, Container } from 'rsuite';
import FlexboxGridItem from 'rsuite/es/FlexboxGrid/FlexboxGridItem';
import { Component } from 'react';
import AppHeader from '../../components/Header/Auth_Header'
// import AppFooter from '../../components/Footer';
import CampaignCard from '../../components/Card/CampaignCard';
import PageNav from '../../components/PageNav';

import { authCookie } from '../../helper';

/*
This class displays all the campaigns/songs related to the user/artists
*/
class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfCampaigns: 0,
            campaigns: []
        }
        // HandleSubmit relies on this.state
        // this guarantees that handleSubmit, no matter where you call it, will always be in the context of the login component aka 'this'
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount = (e) => {
        // Check to see if there is a cookie that already exists. If so, set auth to True and move on.
            // that means that we are authenticated, now check to see if there are artists...
        
        // issue is I need to select the right cookie to split and send in authorization
        const token = authCookie(document.cookie);
        fetch(`${process.env.REACT_APP_API}/api/get-campaigns`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(campaigns => {
                return campaigns.json()
            })
            .then(campaigns => {
                console.log(campaigns.campaigns)
                if (campaigns.campaigns.length < 1) {
                    return this.setState({
                        ...this.state.numOfArtists,
                        ...this.state.artists
                    })
                }
                return this.setState({
                    numOfCampaigns: campaigns.campaigns.length,
                    campaigns: campaigns.campaigns
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
                btnValue: 'View All Campaigns',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-blue-btn' 
            },
            {
                btnValue: 'Create New Campaign',
                btnLink: 'https://instagram.com/',
                btnClassPrefix: 'rs-green-btn' 
            }
        ]
        
        return (
            <div className="Campaigns">
            <Container>
                <AppHeader />
                    <Content>
                        <PageNav pageName="Campaigns" btns={btnArray} />
                        <FlexboxGrid className="CampaignCard" justify="start">
                            {this.state.campaigns.map(campaign => {
                                return <CampaignCard campaignId={campaign._id} status={campaign.campaignStatus} date={campaign.releaseDate.split('T')[0]} campaignTitle={campaign.songName} campaignImg={campaign.artworkUrl+'100x100'} campaignImgAltTag={campaign.songName} />
                            })}
                        </FlexboxGrid>        
                </Content>
                {/* <AppFooter /> */}
            </Container>
        </div>
        )
  }
}

export default Campaigns;
