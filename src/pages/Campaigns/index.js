import './index.css';
import { Content, Panel, Button, FlexboxGrid, Container, Modal, Form, FormGroup, ControlLabel, DatePicker, ButtonToolbar, FormControl, Schema } from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader'
import CampaignCard from '../../components/Card/CampaignCard';
import PageNav from '../../components/PageNav';

import { authCookie , artistIdCookie} from '../../helper';
const { StringType, DateType } = Schema.Types;
class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noArtists: false,
            numOfCampaigns: 0,
            campaigns: [],
            profileInfo: {
                name: null
            },
            formValue: {
                songName: '',
                releaseDate: new Date(),
            },
            createNewCampaignModalOpen: false,
            formError: {}
        }
    }

    handleFormDataChange = (value) => {
        this.setState({
            formValue: value
        })
    }

    createNewCampaign = async () => {
        const token = await authCookie(document.cookie).then(t => t);
        const artistId = await artistIdCookie(document.cookie).then(a => a);

        this.setState({
            numOfCampaigns: undefined
        })

        if (!this.state.createNewCampaignModalOpen) {
            return this.setState({
                createNewCampaignModalOpen: true
            })
        }

        if (this.state.createNewCampaignModalOpen) {
            if (!this.form.check()) {
                return
            }

            let data = {
                songName: this.state.formValue.songName,
                releaseDate: this.state.formValue.releaseDate,
                artistId: artistId.split('=')[1]
            }

            fetch(`${process.env.REACT_APP_API}/api/create-campaign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.split('=')[1]}`
                },
                body: JSON.stringify(data)
            })
            .then(data => {
                const jsonData = data.json();
                return jsonData;
            })
            .then(jsonData => {
                this.getCampaigns();
                return
            })
            .catch(err => {
                throw new Error(err);
            })

            return this.closeModal();
        }
    }

    closeModal = (e) => {
        return this.setState({
            formValue: {
                songName: '',
                releaseDate: new Date()
            },
            createNewCampaignModalOpen: false
        })
    }

    getCampaigns = async () => {
        const token = await authCookie(document.cookie).then(t => t);
        const artistId = await artistIdCookie(document.cookie).then(a => a);

        if (artistId.split('=')[1] === undefined || artistId.split('=')[1] === 'undefined') {
            return this.setState({
                noArtists: true
            })
        } 

        fetch(`${process.env.REACT_APP_API}/api/get-campaigns/?${artistId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(campaigns => {
                return campaigns.json()
            })
            .then(campaigns => {
                if (campaigns.campaigns.length < 1) {
                    return
                }
                return this.setState({
                    numOfCampaigns: campaigns.campaigns.length,
                    campaigns: campaigns.campaigns
                })
            })
    }

    componentDidMount = (e) => {
        this.getCampaigns();
    }
    
    render() {

        const model = Schema.Model({
            songName: StringType().isRequired('This field is required.'),
            releaseDate: DateType().isRequired('This field is required.')
        });

        if (this.state.noArtists) {
            return (
                <div className="Campaigns">
                    <Container>
                        <AppHeader />
                        <Content>
                            <PageNav pageName="Campaigns" />
                            <Panel shaded >
                                <FlexboxGrid justify='space-between'>
                                    <FlexboxGrid.Item>
                                        <h4>Currently, you have no artists.</h4>
                                        <p>Create an artist to get started.</p>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item style={{alignSelf: 'center'}}>
                                        <Button classPrefix="rs-orange-btn-sm" href="/admin/artists" type="submit">Create An Artist</Button>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </Panel>
                        </Content>
                    </Container>
                </div>
            )
        }
        if (this.state.numOfCampaigns === 0) {
            return (
                <div className="Campaigns">
                    <Container>
                        <AppHeader />
                        <Content>
                            <PageNav pageName="Campaigns" />
                            <Panel shaded >
                                <FlexboxGrid justify='space-between'>
                                    <FlexboxGrid.Item>
                                        <h4>Currently, you have no campaigns.</h4>
                                        <p>Create a campaigns to get started.</p>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item style={{alignSelf: 'center'}}>
                                        <Button classPrefix="rs-orange-btn-sm"onClick={this.createNewCampaign} type="submit">Create A Campaign</Button>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </Panel>
                        </Content>
                    </Container>
                </div>
            )
        }

        const btnArray = [
            {
                btnValue: 'Create New Campaign',
                btnMobileValue: 'View',
                cb: this.createNewCampaign,
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 'create-new-campaign-btn'
            }
        ]
        
        return (
            <div className="Campaigns">
            <Container>
                <AppHeader />
                <Content>
                    <PageNav pageName="Campaigns" btns={btnArray} />
                    <FlexboxGrid className="CampaignCard" justify="space-between">
                        {this.state.campaigns.map(campaign => {
                            return <CampaignCard campaign={campaign} key={campaign._id} campaignId={campaign._id} status={campaign.campaignStatus} date={campaign.releaseDate.split('T')[0]} campaignTitle={campaign.songName} campaignImg={campaign.artworkUrl+'100x100'} campaignImgAltTag={campaign.songName} />
                        })}
                    </FlexboxGrid>        
                </Content>
                <Modal className='Modal' show={this.state.createNewCampaignModalOpen} onHide={this.closeModal} size='xs'>
                    <Modal.Header>
                        <Modal.Title>Create A Campaign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form model={model} className='Form' fluid
                        ref={ref => (this.form = ref)}
                        onCheck={formError => { this.setState({ formError: formError }) }}
                        onChange={this.handleFormDataChange}
                        formValue={this.state.formValue}
                    >
                        <FormGroup>
                            <ControlLabel>Song Name</ControlLabel>
                            <FormControl name="songName" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Release Date</ControlLabel>
                            <FormControl accepter={DatePicker} name="releaseDate" placeholder='Select Release Date'/>
                        </FormGroup>        
                        <FormGroup>
                            <ButtonToolbar className="right">
                                <Button classPrefix="rs-orange-btn-lg"
                                        onClick={this.createNewCampaign}
                                        type="submit">Create Campaign</Button>
                            </ButtonToolbar>
                        </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
        )
  }
}

export default Campaigns;
