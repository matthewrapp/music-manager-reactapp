import '../index.css';
import { Col, FlexboxGrid, Loader, Modal, Form, FormGroup, ControlLabel, FormControl, Radio, RadioGroup, Button, ButtonToolbar, Schema} from 'rsuite';
import { Component } from 'react';
import ListCard from '../../../components/Card/ListCard';
const { StringType } = Schema.Types;

class TasksSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                type: '',
                description: '',
            },
            formError: {}
        }
    }

    closeModal = () => {
        this.setState({
            formValue: {
                type: '',
                description: ''
            }
        })
        this.props.closeModal(this.props.sectionName)
    }

    handleFormDataChange = (value) => {
        this.setState({
            formValue: value
        })
    }

    createNewTask = () => {
        if (!this.form.check()) {
            return
        }
        this.props.createNewTask(this.state.formValue);
        this.setState({
            formValue: {
                description: '',
                type: '',
            }
        })
    }

    listToOpen = (listId) => {
        this.props.cb(listId);
    }
    
    render() {

        const model = Schema.Model({
            description: StringType().isRequired('This field is required.'),
            type: StringType().isRequired('This field is required'),
        });

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
                        <ListCard listId='tasks.all' listUrl='tasks' btnValue='View Tasks' count={this.props.allTasks.length} listName='All Tasks' cb={this.listToOpen} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='tasks.socialmedia' listUrl='tasks' btnValue='View Tasks' count={this.props.socialTasks.length} listName='Social Media Tasks' cb={this.listToOpen}/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24}>
                        <ListCard listId='tasks.submissions' listUrl='tasks' btnValue='View Tasks' count={this.props.subTasks.length} listName='Submission Tasks' cb={this.listToOpen} />
                    </FlexboxGrid.Item>

                    {this.props.viewAllLists ? (
                    <FlexboxGrid>
                        <FlexboxGrid.Item componentClass={Col} colspan={24}>
                            <ListCard listId='tasks.creative' listUrl='tasks' btnValue='View Tasks' count={this.props.creativeTasks.length} listName='Creative/Content Tasks' cb={this.listToOpen}  />
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item componentClass={Col} colspan={24}>
                                <ListCard listId='tasks.other' listUrl='tasks' btnValue='View Tasks' count={this.props.otherTasks.length} listName='Other Tasks' cb={this.listToOpen}  />
                            </FlexboxGrid.Item>
                    </FlexboxGrid>
                    ) : null}

                    <Modal className='Modal' show={this.props.openModal} onHide={this.closeModal} size='xs' autoFocus >
                            <Modal.Header><Modal.Title>Create New Task</Modal.Title></Modal.Header>
                            <Modal.Body>
                            <Form model={model} className='Form'
                                fluid
                                ref={ref => (this.form = ref)}
                                onChange={this.handleFormDataChange}
                                onCheck={formError => { this.setState({ formError: formError }) }}
                                formValue={this.state.formValue} >
                                <FormGroup>
                                    <ControlLabel>Task</ControlLabel>
                                    <FormControl componentClass='textarea' rows={3} name="description"/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Type</ControlLabel>
                                    <FormControl accepter={RadioGroup} name='type' inline>
                                        <Radio value='socialmedia' >Social Media</Radio>  
                                        <Radio value='submissions' >Submissions</Radio>  
                                        <Radio value='creative/content' >Creative/Content</Radio>  
                                        <Radio value='other' >Other</Radio>  
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar className="right">
                                        <Button classPrefix="rs-orange-btn-lg" onClick={this.createNewTask} type="submit">Create</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                                </Form>
                            </Modal.Body>
                        </Modal>

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
