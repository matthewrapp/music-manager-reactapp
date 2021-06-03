import './index.css';
import { Col, Content, Panel, Form, FlexboxGrid, Container, Schema } from 'rsuite';
import { Component } from 'react';
import { Redirect } from 'react-router';

import { authCookie } from '../../helper';

// import AppFooter from '../../components/Footer';
import Step1 from './Step1';
import Step2 from './Step2';

import backgroundImg from '../../images/img-1.jpg';

const { StringType } = Schema.Types;

class CreateArtist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                artistName: '',
                artistBio: '',
                facebook: '',
                instagram: '',
                soundcloud: ''
            },
            formError: {},
            hasValidationError: true,
            currentStep: 1
        }
    }

    _next = (e) => {
        // this.state.currentStep += 1;
        let stepper = this.state.currentStep;
        stepper += 1;
        this.setState({
            ...this.state.formValue,
            ...this.state.formError,
            hasValidationError: true,
            currentStep: stepper
        })
    }

    _prev = (e) => {
        // this.state.currentStep -= 1
        let stepper = this.state.currentStep;
        stepper -= 1;
        this.setState({
            ...this.state.formValue,
            ...this.state.formError,
            ...this.state.hasValidationError,
            currentStep: stepper,
        })
    }

    // validate = (artistName, artistBio, facebook, instagram, soundcloud) => {
    //     if (artistName.maxLength === 0)
    // }

    handleSubmit = (e) => {
        // e.preventDefault();
        if (e.target.name === 'next') {
            return this._next()
        }

        if (e.target.name === 'prev') {
            return this._prev()
        }

        let data = {
            artistName: this.state.formValue.artistName,
            artistBio: this.state.formValue.artistBio,
            facebook: this.state.formValue.facebook,
            instagram: this.state.formValue.instagram,
            soundcloud: this.state.formValue.soundcloud
        }

        // reset input boxes 
        this.setState({
            formValue: {
                artistName: '',
                artistBio: '',
                facebook: '',
                instagram: '',
                soundcloud: ''
            },
            ...this.state.formError,
            hasValidationError: true,
            ...this.state.currentStep,
        });

        const token = authCookie(document.cookie);

        fetch(`${process.env.REACT_APP_API}/api/create-artist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.split('=')[1]}`
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                const jsonData = data.json();
                return jsonData;
            })
            .then(jsonData => {
                let stepper = this.state.currentStep;
                stepper += 1;
                this.setState({
                    ...this.state.formValue,
                    ...this.state.formError,
                    ...this.state.hasValidationError,
                    currentStep: stepper,
                });
                return
            })
            .catch(err => {
                throw new Error(err)
            })

    }
    
    render() {
        if (this.state.currentStep > 2) {
            return (
                <Redirect to={{
                    pathname: '/admin/campaigns',
                }} />
            )
        }

        // const { formError } = this.state;

        const model = Schema.Model({
            artistName: StringType().isRequired('This field is required.'),
            artistBio: StringType().minLength(20, 'min length').maxLength(200, 'This field cannot be greater than 200 characters.'),
            facebook: StringType().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?facebook\.com.*$/, 'Must be a Facebook URL. Ex) https://www.facebook.com/(your-profile)'),
            instagram: StringType().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?instagram\.com.*$/, 'Must be a Instagram URL. Ex) https://www.instagram.com/(your-profile)'),
            soundcloud: StringType().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?soundcloud\.com.*$/, 'Must be a Soundcloud URL. Ex) https://www.soundcloud.com/(your-profile)')
        });

        return (
            <div className="CreateArtist show-fake-browser login-page">
                <Container>
                        <Content> 
                            <FlexboxGrid className="col-container" justify="center" align="middle">
                                <FlexboxGrid.Item className="col-item background-img" as={Col} colspan={24} md={12} order={2} style={{backgroundImage: `url(${backgroundImg})`}}>
                                    {/* Background Image Goes Here */}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="col-item col-item-right bg-dark-black" as={Col} colspan={24} md={12} order={1}>
                                <Panel header={<h3>Create Artist, Step {this.state.currentStep}</h3>}>
                                    <Form model={model} onChange={formValue => { this.setState({ formValue }) }} onCheck={formError => {this.setState({formError: formError, hasValidationError: (Object.keys(formError).length === 0 ? false : true)})}} formValue={this.props.formValue} fluid>
                                        <Step1 onClick={this.handleSubmit} error={this.state.hasValidationError} currentStep={this.state.currentStep} artistName={this.state.formValue.artistName} artistBio={this.state.formValue.artistBio} />
                                        <Step2 onClick={this.handleSubmit} error={this.state.hasValidationError} currentStep={this.state.currentStep} facebook={this.state.formValue.facebook} instagram={this.state.formValue.instagram} soundcloud={this.state.formValue.soundcloud} />
                                    </Form>
                                </Panel>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Content>
                </Container>
            </div>
        )
    
  }
}

export default CreateArtist;
