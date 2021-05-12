import './index.css';
import { Col, Content, Panel, Form, FlexboxGrid, Container} from 'rsuite';
import { Component } from 'react';

// import AppFooter from '../../components/Footer';
import Step1 from './Step1';
import Step2 from './Step2';

import backgroundImg from '../../images/img-1.jpg';

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
            currentStep: 1,
        }
        // HandleSubmit relies on this.state
        // this guarantees that handleSubmit, no matter where you call it, will always be in the context of the login component aka 'this'
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    _next = (e) => {
        // this.state.currentStep += 1;
        let stepper = { ...this.state.currentStep };
        stepper += 1;
        this.setState({
            ...this.state.formValue,
            currentStep: stepper
        })
    }

    _prev = (e) => {
        // this.state.currentStep -= 1
        let stepper = { ...this.state.currentStep };
        stepper -= 1;
        this.setState({
            ...this.state.formValue,
            currentStep: stepper
        })
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        if (e.target.name === 'next') {
            return this._next()
        }

        if (e.target.name === 'prev') {
            return this._prev
        }
    }
    
    render() {
        return (
            <div className="CreateArtist show-fake-browser login-page">
                <Container>
                        <Content> 
                            <FlexboxGrid className="col-container" justify="center" align="middle">
                                <FlexboxGrid.Item className="col-item background-img" as={Col} colspan={24} md={12} order={2} style={{backgroundImage: `url(${backgroundImg})`}}>
                                    {/* Background Image Goes Here */}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="col-item col-item-right bg-dark-black" as={Col} colspan={24} md={12} order={1}>
                                <Panel header={<h3>Create Artist, Step { this.state.currentStep}</h3>}>
                                        <Form onChange={formValue => { console.log(formValue); this.setState({formValue})}} formValue={this.props.formValue} fluid>
                                            <Step1 onClick={this.handleSubmit} currentStep={this.state.currentStep} artistName={this.state.formValue.artistName} artistBio={this.state.formValue.artistBio} />
                                            <Step2 onClick={this.handleSubmit} currentStep={this.state.currentStep} facebook={this.state.formValue.facebook} instagram={this.state.formValue.instagram} soundcloud={this.state.formValue.soundcloud} />
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
