import '../index.css';
import { Col, FlexboxGrid, Loader} from 'rsuite';
import { Component } from 'react';
import ListCard from '../../../components/Card/ListCard';

/*
This class displays all the campaigns/songs related to the user/artists
*/
class ContactsSection extends Component {
    
    render() {

        if (this.props.allContacts === null) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <Loader size='lg' content='Loading....' />
                </FlexboxGrid>    
            )
        }

        if (this.props.allContacts !== null && this.props.allContacts !== undefined ) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='all' listUrl='contacts' btnValue='View Contacts' count={this.props.allContacts.length} listName='All Contacts' />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                    <FlexboxGrid>
                        <FlexboxGrid.Item componentClass={Col} colspan={24}>
                            <ListCard listId='spotify' listUrl='contacts' btnValue='View Contacts' count={this.props.spotifyContacts.length} listName='Spotify Contacts'/>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24}>
                            <ListCard listId='applemusic' listUrl='contacts' btnValue='View Contacts' count={this.props.appleContacts.length} listName='Apple Music Contacts' />
                        </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </FlexboxGrid.Item>
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
