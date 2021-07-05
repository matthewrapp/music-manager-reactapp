import '../index.css';
import { Col, FlexboxGrid, Loader} from 'rsuite';
import { Component } from 'react';
import ListCard from '../../../components/Card/ListCard';

class PressReleasesSection extends Component {
    
    render() {

        // return (
        //     <FlexboxGrid className="ListCard" justify="space-between">
        //             <h4>You currently don't have any press release templates.</h4>
        //     </FlexboxGrid>
        // )

        if (this.props.allPressReleases === null) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <Loader size='lg' content='Loading....' />
                </FlexboxGrid>    
            )
        }

        if (this.props.allPressReleases !== null && this.props.allPressReleases !== undefined) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='pr.template1' listUrl='press-releases' btnValue='View Press Release' count={this.props.allPressReleases.length} listName='Press Release Template #1' />
                    </FlexboxGrid.Item>
                </FlexboxGrid>        
            )
        }

        if (this.props.allPressReleases === undefined) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <h4>You currently don't have any press release templates.</h4>
                </FlexboxGrid>
            )
        }
  }
}

export default PressReleasesSection;
