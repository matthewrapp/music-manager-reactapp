import './index.css';
import { Content, Container } from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader'
import PageNav from '../../components/PageNav';
import ContactTable from '../../components/ContactTable';
import TasksTable from '../../components/TasksTable';
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
            prs: null,
            list: {
                showList: false,
                listIdToOpen: null,
                listType: null,
                listName: null
            },
            viewAllContactLists: false,
            createNewContactModalOpen: false,
            viewAllTaskLists: false,
            createNewTaskModalOpen: false,
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
                if (contacts.result.length < 1) {
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
                if (tasks.result.length < 1) {
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

    updateTable = async (listId, updatedData) => {
        let data;
        const token = await authCookie(document.cookie).then(t => t);
        if (listId.split(' ')[1] === 'contacts') {
            data = {
                contactId: updatedData._id,
                email: updatedData.email,
                channelName: updatedData.channelName,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
                type: updatedData.type
            }
            fetch(`${process.env.REACT_APP_API}/api/update-contact`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.split('=')[1]}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(contact => {
                    return contact.json()
                })
                .then(contact => {
                    this.getContacts();
                    return
                })
                .catch(err => {
                    alert(err);
                    return
                })
        }

        if (listId.split(' ')[1] === 'tasks') {
            data = {
                taskId: updatedData._id,
                description: updatedData.description,
                type: updatedData.type
            };
            fetch(`${process.env.REACT_APP_API}/api/update-task`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.split('=')[1]}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(task => {
                    return task.json()
                })
                .then(task => {
                    this.getTasks();
                    return
                })
                .catch(err => {
                    alert(err);
                    return
                })
        }
    }

    viewAllLists = (btnId) => {
        if (btnId === 'view-all-contacts-btn') {
            if (!this.state.viewAllContactLists) {
                 this.setState({
                    viewAllContactLists: true,
                })
            } else {
                this.setState({
                    viewAllContactLists: false,
                })
            }
        }

        if (btnId === 'view-all-tasks-btn') {
            if (!this.state.viewAllTaskLists) {
                 this.setState({
                    viewAllTaskLists: true
                 })
            } else {
                this.setState({
                    viewAllTaskLists: false
                })
            }
        }
    }

    createNewContact = async (formData) => {
        if (!this.state.createNewContactModalOpen) {
            return this.setState({
                createNewContactModalOpen: true
            })
        }
        
        if (this.state.createNewContactModalOpen) {
            const token = await authCookie(document.cookie).then(t => t);
            fetch(`${process.env.REACT_APP_API}/api/create-contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.split('=')[1]}`
                },
                body: JSON.stringify(formData)
            })
                .then(data => {
                    const jsonData = data.json();
                    return jsonData;
                })
                .then(jsonData => {
                    this.getContacts();
                    return
                })
                .catch(err => {
                    throw new Error(err)
                })

            return this.setState({
                createNewContactModalOpen: false
            })
        }
    }

    createNewTask = async (formData) => {
        if (!this.state.createNewTaskModalOpen) {
            return this.setState({
                createNewTaskModalOpen: true
            })
        }
        
        if (this.state.createNewTaskModalOpen) {
            const token = await authCookie(document.cookie).then(t => t);
            fetch(`${process.env.REACT_APP_API}/api/create-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.split('=')[1]}`
                },
                body: JSON.stringify(formData)
            })
                .then(data => {
                    const jsonData = data.json();
                    return jsonData;
                })
                .then(jsonData => {
                    this.getTasks();
                    return
                })
                .catch(err => {
                    throw new Error(err)
                })

            return this.setState({
                createNewTaskModalOpen: false
            })
        }
    }

    deleteData = async (listType, idToDelete) => {
        let data;
        const token = await authCookie(document.cookie).then(t => t);
        if (listType === 'task') {
            data = {
                taskId: idToDelete
            };
            fetch(`${process.env.REACT_APP_API}/api/delete-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.split('=')[1]}`
                },
                body: JSON.stringify(data)
            })
                .then(task => {
                    const jsonData = task.json();
                    return jsonData;
                })
                .then(task => {
                    this.getTasks();
                    return
                })
                .catch(err => {
                    throw new Error(err)
                })

        }
        if (listType === 'contact') {
            data = {
                contactId: idToDelete
            }
            fetch(`${process.env.REACT_APP_API}/api/delete-contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.split('=')[1]}`
                },
                body: JSON.stringify(data)
            })
                .then(contact => {
                    const jsonData = contact.json();
                    return jsonData;
                })
                .then(contact => {
                    this.getContacts();
                    return
                })
                .catch(err => {
                    throw new Error(err)
                })
        }
    }

    closeModal = (sectionName) => {
        if (sectionName === 'contact-section') {
            if (this.state.createNewContactModalOpen) {
                return this.setState({
                    createNewContactModalOpen: false
                })
            }
            return
        }

        if (sectionName === 'task-section') {
            if (this.state.createNewTaskModalOpen) {
                return this.setState({
                    createNewTaskModalOpen: false
                })
            }
            return
        }
    }

    listToOpen = (listId) => {
        return this.setState({
            list: {
                show: true,
                listIdToOpen: listId,
                listType: listId.split('.')[0],
                listName: listId.split('.')[1]
            }
        })
    }

    closeDrawer = async (e, updatedCheckedArray) => { 
        if (e.target.innerText === "DONE" || e.target.innerText === 'Done') {
            const token = await authCookie(document.cookie).then(t => t);
            fetch(`${process.env.REACT_APP_API}/api/update-checked`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.split('=')[1]}`
                },
                body: JSON.stringify(updatedCheckedArray)
            })
                .then(data => {
                    const jsonData = data.json();
                    return jsonData;
                })
                .then(jsonData => {
                    return
                })
                .catch(err => {
                    throw new Error(err)
                })
        }
        this.setState({
            list: {
                show: false
            },
        })
    }

    componentDidMount = async (e) => {
        await this.getContacts();
        await this.getTasks();
    }
    
    render() {
        const contactsBtnArray = [
            {
                btnValue: this.state.viewAllContactLists ? 'Show Less Contact Lists' : 'Show All Contact Lists',
                btnMobileValue: 'View',
                cb: this.viewAllLists,
                btnClassPrefix: 'rs-blue-btn-sm',
                btnId: 'view-all-contacts-btn'
            },
            {
                btnValue: 'Create New Contact',
                btnMobileValue: 'Create',
                cb: this.createNewContact,
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 2
            }
        ]

        const tasksBtnArray = [
            {
                btnValue: this.state.viewAllTaskLists ? 'Show Less Task Lists' : 'Show All Task Lists',
                btnMobileValue: 'View',
                cb: this.viewAllLists,
                btnClassPrefix: 'rs-blue-btn-sm',
                btnId: 'view-all-tasks-btn'
            },
            {
                btnValue: 'Create New Task',
                btnMobileValue: 'Create',
                cb: this.createNewTask,
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 'create-new-contact-btn'
            }
        ]

        const prsBtnArray = [
            {
                btnValue: 'View All Press Release Templates',
                btnMobileValue: 'View',
                cb: this.viewAllLists,
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
        // console.log(this.state.contacts.all)

        return (
                <div className="Manage">
                    <Container>
                        <AppHeader />
                            <Content>
                                <PageNav pageName="Contact Lists" btns={contactsBtnArray} />
                                <ContactsSection sectionName='contact-section' allContacts={this.state.contacts.all} spotifyContacts={this.state.contacts.spotify} appleContacts={this.state.contacts.apple} youtubeContacts={this.state.contacts.youtube} blogContacts={this.state.contacts.blog} labelContacts={this.state.contacts.label} fanContacts={this.state.contacts.fan} cb={this.listToOpen} viewAllLists={this.state.viewAllContactLists} createNewContact={this.createNewContact} openModal={this.state.createNewContactModalOpen} closeModal={this.closeModal}/>
                                <PageNav pageName="Task Boards" btns={tasksBtnArray} />
                                <TasksSection sectionName='task-section' allTasks={this.state.tasks.all} socialTasks={this.state.tasks.social} subTasks={this.state.tasks.submissions} creativeTasks={this.state.tasks.submissions} otherTasks={this.state.tasks.submissions} cb={this.listToOpen} viewAllLists={this.state.viewAllTaskLists} createNewTask={this.createNewTask} openModal={this.state.createNewTaskModalOpen} closeModal={this.closeModal}/>
                                <PageNav pageName="Press Releases" btns={prsBtnArray} />
                                <PressReleasesSection cb={this.listToOpen} />

                                {this.state.list.listIdToOpen === 'contacts.all' &&
                                    <ContactTable 
                                        data={this.state.contacts.all}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer} 
                                        deleteData={this.deleteData} />
                                }
                                
                                {this.state.list.listIdToOpen === 'contacts.spotify' &&
                                    <ContactTable 
                                        data={this.state.contacts.spotify}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                                
                                {this.state.list.listIdToOpen === 'contacts.youtube' &&
                                    <ContactTable 
                                        data={this.state.contacts.youtube}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }

                                {this.state.list.listIdToOpen === 'contacts.applemusic' &&
                                    <ContactTable 
                                        data={this.state.contacts.apple}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                        
                                {this.state.list.listIdToOpen === 'contacts.blog' &&
                                    <ContactTable 
                                        data={this.state.contacts.blog}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }

                                {this.state.list.listIdToOpen === 'contacts.label' &&
                                    <ContactTable 
                                        data={this.state.contacts.label}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                                
                                {this.state.list.listIdToOpen === 'contacts.fan' &&
                                    <ContactTable 
                                        data={this.state.contacts.fan}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                        
                                {this.state.list.listIdToOpen === 'tasks.all' &&
                                    <TasksTable 
                                        data={this.state.tasks.all}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                        
                                {this.state.list.listIdToOpen === 'tasks.socialmedia' &&
                                    <TasksTable 
                                        data={this.state.tasks.social}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                                {this.state.list.listIdToOpen === 'tasks.submissions' &&
                                    <TasksTable 
                                        data={this.state.tasks.submissions}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                                {this.state.list.listIdToOpen === 'tasks.creative' &&
                                    <TasksTable 
                                        data={this.state.tasks.creative}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                                {this.state.list.listIdToOpen === 'tasks.other' &&
                                    <TasksTable 
                                        data={this.state.tasks.other}
                                        show={this.state.list.show}
                                        onHide={this.closeDrawer}
                                        title={this.state.list.listName + ' ' + this.state.list.listType}
                                        cb={this.updateTable}
                                        closeDrawer={this.closeDrawer}
                                        deleteData={this.deleteData}
                                    />
                                }
                        
                        </Content>
                    </Container>
                </div>
        )
  }
}

export default Manage;
