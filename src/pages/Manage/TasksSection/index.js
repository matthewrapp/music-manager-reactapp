import '../index.css';
import { Col, FlexboxGrid, Loader} from 'rsuite';
import { Component } from 'react';
import ListCard from '../../../components/Card/ListCard';

class TasksSection extends Component {
    
    render() {

        if (this.props.allTasks === null || this.props.allTasks === undefined) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <Loader size='lg' content='Loading....' />
                </FlexboxGrid>    
            )
        }

        if (this.props.allTasks !== null && this.props.allTasks !== undefined) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='all' listUrl='tasks' btnValue='View Tasks' count={this.props.allTasks.length} listName='All Tasks' />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                    <FlexboxGrid>
                        <FlexboxGrid.Item componentClass={Col} colspan={24}>
                            <ListCard listId='socialmedia' listUrl='tasks' btnValue='View Tasks' count={this.props.socialTasks.length} listName='Social Media Tasks'/>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24}>
                            <ListCard listId='submissions' listUrl='tasks' btnValue='View Tasks' count={this.props.subTasks.length} listName='Submission Tasks' />
                        </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </FlexboxGrid.Item>
                </FlexboxGrid>        
            )
        }

        if (this.props.allTasks === undefined) {
            return (
                <FlexboxGrid className="ListCard" justify="space-between">
                    <h4>You currently don't have any tasks.</h4>
                </FlexboxGrid>
            )
        }
  }
}

export default TasksSection;
