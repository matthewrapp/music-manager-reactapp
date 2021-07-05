import './index.css';
import { Component } from 'react';
import { Table, Drawer, Button, Checkbox, Modal, Form, FormControl, FormGroup, ControlLabel, Radio, RadioGroup, ButtonToolbar, Schema} from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;
const { StringType } = Schema.Types;

// create a new route to handle the checkboxes and store them in db

const CheckCell = ({ rowData, onChange, dataKey, ...props }) => (
  <Cell {...props} >
      <Checkbox
        value={rowData[dataKey]}
        onChange={() => onChange(rowData)}
        defaultChecked={rowData[dataKey]}
      />
  </Cell>
);

class TasksTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLength: 10,
      loading: false,
      page: 1,
      editModal: {
        show: false,
        rowData: null
      },
      deleteModal: {
        show: false,
        rowData: null
      },
      formValue: {
        checked: false,
        type: '',
        description: ''
      },
      taskIsChecked: [],
      formError: {}
    }
  }

  handleCheck = (rowData) => {
    rowData.checked = !rowData.checked;
    let taskArray = [];
    if (!this.state.taskIsChecked.includes(rowData)) {
      taskArray = [...this.state.taskIsChecked, rowData]
    } else {
      taskArray = [...this.state.taskIsChecked];
      taskArray.splice(taskArray.indexOf(rowData), 1)
    };

    return this.setState({
        taskIsChecked: taskArray
    })
  }

  handleChangePage = (dataKey) => {
    this.setState({
      page: dataKey
    })
  }

  handleAction = (e, rowData) => {
    if (e.target.classList.contains('edit')) {
      return this.setState({
        editModal: {
          show: true,
          rowData: rowData
        },
        formValue: rowData
      })
    }

    if (e.target.classList.contains('delete')) {
      return this.setState({
        deleteModal: {
          show: true,
          rowData: rowData
        }
      })
    }
  }

  handleFormDataChange = (value) => {
    this.setState({
      formValue: value
    })
  }

  updateTable = async (e) => {
    e.preventDefault();
    if (!this.form.check()) {
      return
    }
    await this.props.cb(this.props.title, this.state.formValue);
    this.closeModal();
  }

  deleteTask = async (e) => {
    e.preventDefault();
    await this.props.deleteData('task', this.state.deleteModal.rowData._id)
    this.closeModal();
  }

  closeModal = (e) => {
    return this.setState({
        editModal: {
          show: false,
        },
        deleteModal: {
          show: false
        }
      })
  }

  getData = (e) => {
    const { displayLength, page } = this.state;
    return this.props.data.filter((v, i) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    })
  }

  closeDrawer = (e) => {
    e.preventDefault();
    this.props.closeDrawer(e, this.state.taskIsChecked);
  }
  
  render() {
    const data = this.getData();
    const model = Schema.Model({
      description: StringType().isRequired('This field is required.'),
      type: StringType().isRequired('This field is required'),
    });
      return (
        <Drawer
              className='Drawer'
              show={this.props.show}
              onHide={this.closeDrawer}
              full
              >
              <Drawer.Header>
                  <Drawer.Title>{this.props.title}</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Table
                  className='TasksTable'
                  height={400}
                  data={data}
                  cellBordered
                  // onDataUpdated={h => console.log(h)}
                >              
                  <Column align='left' width={100}>
                    <HeaderCell>
                      Done
                    </HeaderCell>
                    <CheckCell dataKey='checked' onChange={(rowData) => this.handleCheck(rowData)} />
                  </Column>
              
                  <Column align='left' width={180}>
                    <HeaderCell>Type</HeaderCell>
                    <Cell dataKey="type" />
                  </Column>

                  <Column align='left' flexGrow={2}>
                    <HeaderCell>Task</HeaderCell>
                    <Cell dataKey="description" />
                  </Column>
              
                  <Column width={120} fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                      {rowData => {
                        return (
                          <span>
                            <Button classPrefix='edit' onClick={(e) => this.handleAction(e, rowData)}> Edit </Button> |{' '}
                            <Button classPrefix='delete' onClick={(e) => this.handleAction(e, rowData)}> Delete </Button>
                          </span>
                        );
                      }}
                    </Cell>
                  </Column>
            </Table>
            <Pagination
              showLengthMenu={false}
              activePage={this.state.page}
              displayLength={this.state.displayLength}
              total={this.props.data.length}
              onChangePage={this.handleChangePage}
            />
          </Drawer.Body>
          <Drawer.Footer>
              <Button style={{marginRight: '10px'}} classPrefix="rs-green-btn-sm" onClick={this.closeDrawer} appearance="primary">Done</Button>
              <Button classPrefix="rs-red-btn-sm" onClick={this.closeDrawer} appearance="subtle">Cancel</Button>
          </Drawer.Footer>
          <Modal className='Modal' show={this.state.editModal.show} onHide={this.closeModal} size='xs'>
              <Modal.Header>
                <Modal.Title>{this.state.editModal.rowData ? this.state.editModal.rowData.description ? this.state.editModal.rowData.description.substring(0, 15) + '...' : '' : ''}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form className='Form' model={model} fluid
                ref={ref => (this.form = ref)}
                onChange={this.handleFormDataChange}
                onCheck={formError => { this.setState({ formError: formError }) }}
                formValue={this.state.formValue} >
                  <FormGroup>
                    <ControlLabel>Task Description</ControlLabel>
                    <FormControl componentClass='textarea' rows={3} name="description" placeholder={this.state.editModal.rowData ? this.state.editModal.rowData.description ? this.state.editModal.rowData.description : '' : ''} />
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
                        <Button classPrefix="rs-orange-btn-lg" onClick={this.updateTable} type="submit">Save</Button>
                      </ButtonToolbar>
                  </FormGroup>
                </Form>
              </Modal.Body>
          </Modal>
          <Modal className='Modal' show={this.state.deleteModal.show} onHide={this.closeModal} size='xs'>
            <Modal.Header>
              <Modal.Title>{this.state.deleteModal.rowData ? this.state.deleteModal.rowData.description ? this.state.deleteModal.rowData.description.substring(0, 15) + '...' : '' : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5 style={{color: '#fff'}}>Are you sure you want to delete {this.state.deleteModal.rowData ? this.state.deleteModal.rowData.description ? this.state.deleteModal.rowData.description + '?' : 'this task?' : 'this task?'}</h5>  
            </Modal.Body>
            <Modal.Footer>
              <ButtonToolbar className="right">
                <Button classPrefix="rs-red-btn-lg" onClick={this.deleteTask} type="submit">Delete</Button>
              </ButtonToolbar>
            </Modal.Footer>
          </Modal>
        </Drawer>
        );
  }
}

export default TasksTable;
