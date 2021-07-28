import './index.css';
import { Content, Col, FlexboxGrid, Container } from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader'
import PageNav from '../../components/PageNav';
import ListCard from '../../components/Card/ListCard';
import { authCookie, artistIdCookie } from '../../helper';

class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: {
                all: null,
                spotify: null,
                apple: null,
                youtube: null,
                blog: null,
                label: null,
                fan: null
            },
            tasks: {
                all: null,
                social: null,
                submissions: null,
                creative: null,
                other: null
            },
            artistInfo: {}
        }
    }

    getContacts = async () => {
        const token = await authCookie(document.cookie).then(t => t);
        fetch(`${process.env.REACT_APP_API}/api/get-contacts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(contacts => {
                return contacts.json()
            })
            .then(contacts => {
                if (contacts.result === undefined || contacts.result.length < 1) {
                    return this.setState({
                        contacts: {
                            all: [],
                            spotify: [],
                            apple: [],
                            youtube: [],
                            blog: [],
                            label: []
                        }
                    })
                }
                let spotify = [], apple = [], youtube = [], blog = [], label = [], fan = [];
                contacts.result.forEach(contact => {
                    if (contact.type === 'spotify') {
                        spotify.push(contact);
                    } else if (contact.type === 'applemusic') {
                        apple.push(contact);
                    } else if (contact.type === 'youtube') {
                        youtube.push(contact);
                    } else if (contact.type === 'blog') {
                        blog.push(contact);
                    } else if (contact.type === 'label') {
                        label.push(contact);
                    } else if (contact.type === 'fan') {
                        fan.push(contact);
                    }
                })
                return this.setState({
                    contacts: {
                        all: contacts.result,
                        spotify: spotify,
                        apple: apple,
                        youtube: youtube,
                        blog: blog,
                        label: label,
                        fan: fan
                    }
                })
            })
    }

    getTasks = async () => {
        const token = await authCookie(document.cookie).then(t => t);
        fetch(`${process.env.REACT_APP_API}/api/get-tasks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(tasks => {
                return tasks.json()
            })
            .then(tasks => {
                if (tasks.result === undefined || tasks.result.length < 1) {
                    return this.setState({
                        tasks: {
                            all: [],
                            social: [],
                            submissions: [],
                            creative: [],
                            other: []
                        }
                    })
                }
                let social = [], sub = [], creative = [], other = []
                tasks.result.forEach(task => {
                    if (task.type === 'socialmedia') {
                        social.push(task);
                    } else if (task.type === 'submissions') {
                        sub.push(task);
                    } else if (task.type === 'creative/content') {
                        creative.push(task);
                    } else if (task.type === 'other') {
                        other.push(task);
                    }
                })

                return this.setState({
                    tasks: {
                        all: tasks.result,
                        social: social,
                        submissions: sub,
                        creative: creative,
                        other: other
                    }
                })
            })
    }

    getArtist = async () => {
        const token = await authCookie(document.cookie).then(t => t);
        const artistId = await artistIdCookie(document.cookie).then(a => a);
        fetch(`${process.env.REACT_APP_API}/api/artist?${artistId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(artist => {
                return artist.json()
            })
            .then(artist => {
                if (artist.length < 1) {
                    return
                }
                return this.setState({
                    artistInfo: artist,
                })
            })
    }

    componentDidMount = async (e) => {
        // this.props.location.state
        await this.getContacts();
        await this.getTasks();
        await this.getArtist();
    }
    
    render() {
        const campaignInfo = this.props.location.state;
        const artistInfo = this.state.artistInfo ? this.state.artistInfo.artist ? this.state.artistInfo.artist : '' : '';
        const btnArray = [
            {
                btnValue: 'Edit Campaign',
                btnMobileValue: 'View',
                cb: this.createNewCampaign,
                btnClassPrefix: 'rs-blue-btn-sm',
                btnId: 'create-new-campaign-btn'
            }
        ]

        return (
            <div className="Campaign">
            <Container>
                <AppHeader />
                    <Content>
                        <PageNav pageName={campaignInfo.songName} btns={btnArray} />
                        <FlexboxGrid style={{padding: '20px'}}>
                            <FlexboxGrid.Item componentClass={Col} colspan={24} sm={10}>
                                <img alt={campaignInfo.songName} src={campaignInfo.artworkUrl+'-/smart_resize/300x300/'} />
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item componentClass={Col} colspan={24} sm={14}>
                                <h4 style={{ color: '#fff', fontSize: '28px'}}>{campaignInfo.songName}</h4>
                                <p style={{ color: 'rgb(255, 169, 78)', textTransform: 'uppercase', marginTop: '5px' }}>{campaignInfo.campaignStatus}</p>
                                <hr style={{ borderTop: '.25px solid #888' }}/>
                                <p style={{color: '#ddd'}}>Release Date: {campaignInfo.releaseDate.split('T')[0]}</p>
                                <p style={{color: '#ddd'}}>Tasks: {campaignInfo.tasks.length}</p>
                                <p style={{ color: '#ddd' }}>Contacts: {campaignInfo.contacts.length}</p>
                                <p style={{color: '#ddd'}}>Artist: {artistInfo.artistName}</p>
                                <p style={{color: '#ddd'}}>Artist Bio: {artistInfo.artistBio ? artistInfo.artistBio.substring(0, 260) + '...': artistInfo.artistBio}</p>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <FlexboxGrid>
                            <ListCard listId='contacts.all' listUrl='contacts' btnValue='View Contacts' count={this.state.contacts.all !== null ? this.state.contacts.all.length : ''} listName='All Contacts' cb={this.listToOpen} />
                            <ListCard listId='tasks.all' listUrl='tasks' btnValue='View Tasks' count={this.state.tasks.all !== null ? this.state.tasks.all.length : ''}listName='All Tasks' cb={this.listToOpen} />
                        </FlexboxGrid>
                    </Content>
            </Container>
        </div>
        )
  }
}

export default Campaigns;
