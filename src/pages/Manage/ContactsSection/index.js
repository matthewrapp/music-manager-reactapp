import '../index.css';
import { Col, FlexboxGrid, Loader, Modal, Form, FormGroup, ControlLabel, FormControl, Radio, RadioGroup, Button, ButtonToolbar, Schema } from 'rsuite';
import { Component } from 'react';
import ListCard from '../../../components/Card/ListCard';
const { StringType } = Schema.Types;

/*
This class displays all the campaigns/songs related to the user/artists
*/
class ContactsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                channelName: '',
                firstName: '',
                lastName: '',
                type: '',
                email: ''
            },
            formError: {},
            hasValidationError: true
        }
    }

    closeModal = () => {
        this.setState({
            formValue: {
                channelName: '',
                firstName: '',
                lastName: '',
                type: '',
                email: ''
            }
        })
        this.props.closeModal(this.props.sectionName)
    }

    handleFormDataChange = (value) => {
        this.setState({
            formValue: value
        })
    }

    createNewContact = () => {
        if (!this.form.check()) {
            return
        }
        this.props.createNewContact(this.state.formValue);
        this.setState({
            formValue: {
                channelName: '',
                firstName: '',
                lastName: '',
                type: '',
                email: ''
            }
        })
    }

    listToOpen = (listId) => {
        this.props.cb(listId);
    }

    render() {

        const model = Schema.Model({
            channelName: StringType().isRequired('This field is required.'),
            firstName: StringType().isRequired('This field is required.'),
            lastName: StringType().isRequired('This field is required.'),
            type: StringType().isRequired('This field is required'),
            email: StringType().isRequired('This field is required.').isEmail('Please enter a correct email'),
        });

        if (this.props.allContacts === null) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <Loader size='lg' content='Loading....' />
                </FlexboxGrid>    
            )
        }

        if (this.props.allContacts !== null && this.props.allContacts !== undefined) {
            return (
                <FlexboxGrid className="ListCard ContactsSection" justify="space-between">
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='contacts.all' listUrl='contacts' btnValue='View Contacts' count={this.props.allContacts.length} listName='All Contacts' cb={this.listToOpen} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='contacts.spotify' listUrl='contacts' btnValue='View Contacts' count={this.props.spotifyContacts.length} listName='Spotify Contacts' cb={this.listToOpen} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='contacts.applemusic' listUrl='contacts' btnValue='View Contacts' count={this.props.appleContacts.length} listName='Apple Music Contacts' cb={this.listToOpen}  />
                    </FlexboxGrid.Item>
                    {this.props.viewAllLists ? (
                    <FlexboxGrid>
                        <FlexboxGrid.Item componentClass={Col} colspan={24}>
                            <ListCard listId='contacts.youtube' listUrl='contacts' btnValue='View Contacts' count={this.props.youtubeContacts.length} listName='Youtube Contacts' cb={this.listToOpen}  />
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item componentClass={Col} colspan={24}>
                                <ListCard listId='contacts.blog' listUrl='contacts' btnValue='View Contacts' count={this.props.blogContacts.length} listName='Blog Contacts' cb={this.listToOpen}  />
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item componentClass={Col} colspan={24}>
                                <ListCard listId='contacts.label' listUrl='contacts' btnValue='View Contacts' count={this.props.labelContacts.length} listName='Label Contacts' cb={this.listToOpen}  />
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item componentClass={Col} colspan={24}>
                                <ListCard listId='contacts.fan' listUrl='contacts' btnValue='View Contacts' count={this.props.fanContacts.length} listName='Fan Contacts' cb={this.listToOpen}  />
                            </FlexboxGrid.Item>
                    </FlexboxGrid>
                    ) : null}

                        <Modal className='Modal' show={this.props.openModal} onHide={this.closeModal} size='xs' autoFocus >
                            <Modal.Header><Modal.Title>Create New Contact</Modal.Title></Modal.Header>
                            <Modal.Body>
                            <Form model={model} className='Form' fluid
                                ref={ref => (this.form = ref)}
                                onChange={this.handleFormDataChange}
                                onCheck={formError => { this.setState({ formError: formError }) }}
                                formValue={this.state.formValue} >
                                <FormGroup>
                                    <ControlLabel>Channel Name</ControlLabel>
                                    <FormControl checkAsync name="channelName"/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>First Name</ControlLabel>
                                    <FormControl checkAsync name="firstName" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Last Name</ControlLabel>
                                    <FormControl checkAsync name="lastName" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Type</ControlLabel>
                                    <FormControl checkAsync accepter={RadioGroup} name='type' inline>
                                        <Radio value='spotify' >Spotify</Radio>  
                                        <Radio value='applemusic' >Apple Music</Radio>  
                                        <Radio value='youtube' >Youtube</Radio>  
                                        <Radio value='blog' >Blog</Radio>  
                                        <Radio value='label' >Label</Radio>  
                                        <Radio value='fan' >Fan</Radio>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl checkAsync name="email" />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar className="right">
                                        <Button classPrefix="rs-orange-btn-lg" onClick={this.createNewContact} type="submit">Save</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                                </Form>
                            </Modal.Body>
                        </Modal>
                </FlexboxGrid>        
            )
        }

        if (this.props.allPressReleases === undefined) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <h4>You currently don't have any contacts.</h4>
                </FlexboxGrid>
            )
        }
  }
}

export default ContactsSection;
