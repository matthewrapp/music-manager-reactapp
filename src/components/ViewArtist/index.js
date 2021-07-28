import './index.css';
import { Drawer, Col, Button, FlexboxGrid, Form, FormControl, FormGroup, ControlLabel, ButtonToolbar } from 'rsuite';
import { Component } from 'react';

class ViewArtist extends Component {
    render() {
        return (
            <Drawer className='Drawer ViewArtistDrawer'
              show={this.props.show}
              onHide={this.props.closeDrawer}
              full>
                <Drawer.Header>
                  <Drawer.Title>{this.props.artistValues.artistName}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <FlexboxGrid>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}><im alt={this.props.artistValues.artistName} src={this.props.artistValues.imageUrl} /></FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}>
                            <ButtonToolbar style={{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                                <Button classPrefix="rs-green-btn-lg"
                                        onClick={this.createNewArtist}
                                        type="submit">Upload Image</Button>
                                <Button classPrefix="rs-blue-btn-lg"
                                        onClick={this.createNewArtist}
                                        type="submit">Edit Details</Button>
                            </ButtonToolbar>
                            </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}>
                            <Form style={{ marginBottom: '30px' }} className='Form' fluid formValue={this.props.artistValues ? this.props.artistValues : null}>
                                <FormGroup>
                                    <ControlLabel>Artist Name</ControlLabel>
                                    <FormControl name="artistName" type="text" disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Artist Bio</ControlLabel>
                                    <FormControl componentClass='textarea' rows={5} name="artistBio" disabled/>
                                </FormGroup>
                            </Form>
                            <Form className='Form' fluid formValue={this.props.artistValues.socialMedia ? this.props.artistValues.socialMedia : null}>
                                <FormGroup>
                                    <ControlLabel>Facebook Link</ControlLabel>
                                    <FormControl name="facebook"  type="text" disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Instagram Link</ControlLabel>
                                    <FormControl name="instagram"  type="text" disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Soundcloud Link</ControlLabel>
                                    <FormControl name="soundcloud"  type="text" disabled/>
                                </FormGroup>
                            </Form>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Drawer.Body>
            </Drawer>
        )
  }
}

export default ViewArtist;
