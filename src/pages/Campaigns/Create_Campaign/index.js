import './index.css';
import { Col, Content, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Schema, Button, FlexboxGrid, Container, DatePicker} from 'rsuite';
import { Component } from 'react';
import AppHeader from '../../../components/Header/Auth_Header'
// import AppFooter from '../../components/Footer';

import backgroundImg from '../../../images/img-1.jpg';
import { Redirect } from 'react-router';

import { artistIdCookie, authCookie } from '../../../helper';

const { StringType, DateType } = Schema.Types;

class CreateCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                songName: '',
                releaseDate: '',
                artistId: null
            },
            formError: {},
            hasValidationError: true,
            success: false
        }
        // HandleSubmit relies on this.state
        // this guarantees that handleSubmit, no matter where you call it, will always be in the context of the login component aka 'this'
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        // const token = await authCookie(document.cookie).then(t => t);
        // const artistId = await artistIdCookie(document.cookie).then(a => a);
        // this.setState({
        //     ...this.state.formValue,
        //     ...this.state.formError,
        //     ...this.state.hasValidationError,
        //     ...this.state.success,
        //     token: `Bearer ${token.split('=')[1]}`,
        //     artistId: artistId.split('=')[1]
        // })

        // console.log(this.state)
    }

    handleSubmit = async (e) => {
        const token = await authCookie(document.cookie).then(t => t);
        const artistId = await artistIdCookie(document.cookie).then(a => a);

        let data = {
            songName: this.state.formValue.songName,
            releaseDate: this.state.formValue.releaseDate,
            artistId: artistId.split('=')[1]
        }

        if (data.releaseDate === undefined) {
            alert('Must enter release date.');
            return this.setState({
                formValue: {
                    songName: '',
                    releaseDate: ''
                },
                ...this.state.success,
                hasValidationError: true
            })
        }
        
        this.setState({
            formValue: {
                songName: '',
                releaseDate: ''
            },
            ...this.state.success,
            hasValidationError: true
        })

        fetch(`${process.env.REACT_APP_API}/api/create-campaign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': this.state.token
                'Authorization': `Bearer ${token.split('=')[1]}`
            },
            body: JSON.stringify(data)
        })
        .then(data => {
            const jsonData = data.json();
            return jsonData;
        })
        .then(jsonData => {
            console.log(jsonData)
            if (jsonData.message) {
                alert(jsonData.message);
                return
            }

            this.setState({
                ...this.state.formValue,
                success: true
            })

            return
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    
    render() {
        if (this.state.success) {
            return ( <Redirect to='/edit-campaign-image' /> )
        }

        const model = Schema.Model({
            songName: StringType().isRequired('This field is required.'),
            DatePicker: DateType().isRequired('This field is required.')
        });

        return (
            <div className="CreateCampaign show-fake-browser login-page">
            <Container>
                <AppHeader />
                <Content>
                    <FlexboxGrid className="col-container" justify="center" align="middle">
                        <FlexboxGrid.Item className="col-item background-img" as={Col} colspan={24} md={12} order={2} style={{backgroundImage: `url(${backgroundImg})`}}>
                            {/* Background Image Goes Here */}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item className="col-item col-item-right bg-dark-black" as={Col} colspan={24} md={12} order={1}>
                            <Panel header={<h3>Create Campaign</h3>}>
                                <Form model={model}
                                    ref={(ref) => { this.form = ref; }}
                                    onChange={formValue => { this.setState({ formValue }) }}
                                    formValue={this.state.formValue} onCheck={formError => { this.setState({ formError: formError, hasValidationError: (Object.keys(formError).length === 0 ? false : true) }) }}
                                    fluid>
                                    <FormGroup>
                                        <ControlLabel>Song Name</ControlLabel>
                                        <FormControl name="songName" type="text" />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Release Date</ControlLabel>
                                            <FormControl accepter={DatePicker} name="releaseDate"  placeholder='Select Release Date'/>
                                    </FormGroup>        
                                    <FormGroup>
                                        <ButtonToolbar className="right">
                                            <Button classPrefix="rs-orange-btn"
                                                    onClick={this.handleSubmit}
                                                    type="submit"
                                                    disabled={this.state.hasValidationError}>Create Campaign</Button>
                                        </ButtonToolbar>
                                    </FormGroup>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                {/* <AppFooter /> */}
            </Container>
        </div>
        )
  }
}

export default CreateCampaign;
