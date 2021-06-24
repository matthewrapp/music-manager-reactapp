import './index.css';
import { Content, Container } from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader'
import PageNav from '../../components/PageNav';
import ContactsSection from './ContactsSection';
import TasksSection from './TasksSection';
import PressReleasesSection from './PressReleasesSection';

import { authCookie } from '../../helper';

/*
This class displays all the campaigns/songs related to the user/artists
*/
class Manage extends Component {
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
            prs: null
        }
    }

    componentDidMount = async (e) => {
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
                if (contacts.result.length < 1) {
                    return this.setState({
                        contacts: {
                            all: [],
                            spotify: [],
                            apple: [],
                            youtube: [],
                            blog: [],
                            label: []
                        },
                        ...this.state.tasks,
                        ...this.state.prs
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
                    } else if (contact.type === 'fanCount') {
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
                    },
                    ...this.state.tasks,
                    ...this.state.prs
                })
            })
        
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
                if (tasks.result.length < 1) {
                    return this.setState({
                        ...this.state.contacts,
                        tasks: {
                            all: [],
                            social: [],
                            submissions: [],
                            creative: [],
                            other: []
                        },
                        ...this.state.prs
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
                    ...this.state.contacts,
                    tasks: {
                        all: tasks.result,
                        social: social,
                        submissions: sub,
                        creative: creative,
                        other: other
                    },
                    ...this.state.prs
                })
            })
    }
    
    render() {

        const contactsBtnArray = [
            {
                btnValue: 'View All Lists',
                btnMobileValue: 'View',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-blue-btn-sm',
                btnId: 1
            },
            {
                btnValue: 'Create New Contact',
                btnMobileValue: 'Create',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 2
            }
        ]

        const tasksBtnArray = [
            {
                btnValue: 'View All Boards',
                btnMobileValue: 'View',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-blue-btn-sm',
                btnId: 1
            },
            {
                btnValue: 'Create New Task',
                btnMobileValue: 'Create',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 2
            }
        ]

        const prsBtnArray = [
            {
                btnValue: 'View All Press Release Templates',
                btnMobileValue: 'View',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-blue-btn-sm',
                btnId: 1
            },
            {
                btnValue: 'Create New Template',
                btnMobileValue: 'Create',
                btnLink: 'https://facebook.com/',
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 2
            }
        ]

        return (
                <div className="Manage">
                    <Container>
                        <AppHeader />
                            <Content>
                                <PageNav pageName="Contact Lists" btns={contactsBtnArray} />
                                <ContactsSection allContacts={this.state.contacts.all} spotifyContacts={this.state.contacts.spotify} appleContacts={this.state.contacts.apple} />
                                <PageNav pageName="Task Boards" btns={tasksBtnArray} />
                                <TasksSection allTasks={this.state.tasks.all} socialTasks={this.state.tasks.social} subTasks={this.state.tasks.submissions} />
                                <PageNav pageName="Press Releases" btns={prsBtnArray} />
                                <PressReleasesSection />
                                {/* <TasksSection allPressReleases={this.state.prs} /> */}
                        </Content>
                    </Container>
                </div>
            )
  }
}

export default Manage;
