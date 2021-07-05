import './index.css';
import { Component } from 'react';
import { Table, Drawer, Button, Modal, Form, FormControl, FormGroup, ControlLabel, Radio, RadioGroup, ButtonToolbar, Schema} from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;

const { StringType } = Schema.Types;

class ContactTable extends Component {
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
        channelName: '',
        firstName: '',
        lastName: '',
        type: '',
        email: ''
      },
      formError: {}
    }
  }

  handleChangePage = (dataKey) => {
    this.setState({
      ...this.state.displayLength,
      ...this.state.loading,
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

  closeModal = (e) => {
    return this.setState({
        editModal: {
          show: false
        },
        deleteModal: {
          show: false
        }
      })
  }

  deleteContact = async (e) => {
    e.preventDefault();
    await this.props.deleteData('contact', this.state.deleteModal.rowData._id)
    this.closeModal();
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
    this.props.closeDrawer(e);
  }
  
  render() {
    const data = this.getData();
    const model = Schema.Model({
        channelName: StringType().isRequired('This field is required.'),
        firstName: StringType().isRequired('This field is required.'),
        lastName: StringType().isRequired('This field is required.'),
        type: StringType().isRequired('This field is required'),
        email: StringType().isRequired('This field is required.').isEmail('Please enter a correct email'),
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
                  className='ContactTable'
                  height={400}
                  data={data}
                  cellBordered
                  // onDataUpdated={h => console.log(h)}
                >              
                  <Column align='left' width={200}>
                    <HeaderCell>Channel Name</HeaderCell>
                    <Cell dataKey="channelName" />
                  </Column>
              
                  <Column align='left' width={140}>
                    <HeaderCell>Type</HeaderCell>
                    <Cell dataKey="type" />
                  </Column>

                  <Column align='left' flexGrow={2}>
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="firstName" />
                  </Column>

                  <Column align='left' flexGrow={2}>
                    <HeaderCell>Last Name</HeaderCell>
                    <Cell dataKey="lastName" />
                  </Column>

                  <Column align='left' width={240}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
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
              <Button style={{marginRight: '10px'}} classPrefix="rs-green-btn-sm" onClick={this.closeDrawer} appearance="primary">Confirm</Button>
              <Button classPrefix="rs-red-btn-sm" onClick={this.closeDrawer} appearance="subtle">Cancel</Button>
          </Drawer.Footer>
          <Modal className='Modal' show={this.state.editModal.show} onHide={this.closeModal} size='xs'>
              <Modal.Header>
                <Modal.Title>{this.state.editModal.rowData ? this.state.editModal.rowData.firstName + ' ' + this.state.editModal.rowData.lastName : ''}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form model={model} className='Form' fluid
                ref={ref => (this.form = ref)}
                onCheck={formError => { this.setState({ formError: formError }) }}
                onChange={this.handleFormDataChange}
                formValue={this.state.formValue} >
                  <FormGroup>
                    <ControlLabel>Channel Name</ControlLabel>
                    <FormControl name="channelName" placeholder={this.state.editModal.rowData ? this.state.editModal.rowData.channelName ? this.state.editModal.rowData.channelName : '' : ''} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl name="firstName" placeholder={this.state.editModal.rowData ? this.state.editModal.rowData.firstName ? this.state.editModal.rowData.firstName : '' : ''} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl name="lastName" placeholder={this.state.editModal.rowData ? this.state.editModal.rowData.lastName ? this.state.editModal.rowData.lastName : '' : ''} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Type</ControlLabel>
                    <FormControl accepter={RadioGroup} name='type' inline>
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
                    <FormControl name="email" placeholder={this.state.editModal.rowData ? this.state.editModal.rowData.email ? this.state.editModal.rowData.email : '' : ''} />
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
                <Button classPrefix="rs-red-btn-lg" onClick={this.deleteContact} type="submit">Delete</Button>
              </ButtonToolbar>
            </Modal.Footer>
          </Modal>
        </Drawer>
        );
  }
}

export default ContactTable;
