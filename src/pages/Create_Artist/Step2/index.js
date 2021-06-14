import '../index.css';
import {FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'rsuite';
import { Component } from 'react';

class Step2 extends Component {
    
    render() {
        if (this.props.currentStep !== 2) {
            return null
        }

        return (
            <div className="Step2 show-fake-browser login-page">
                <FormGroup>
                    <ControlLabel>Facebook</ControlLabel>
                    <FormControl name="facebook" type="url" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Instagram</ControlLabel>
                    <FormControl name="instagram" type="url" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Soundcloud</ControlLabel>
                    <FormControl name="soundcloud" type="url" />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar className="right">
                        <Button classPrefix="rs-orange-btn-lg" onClick={this.props.onClick} type="submit" name="prev">Previous</Button>
                        <Button classPrefix="rs-orange-btn-lg" onClick={this.props.onClick} type="submit" name="submit" disabled={this.props.error}>Finish</Button>
                    </ButtonToolbar>
                </FormGroup>
                                
            </div>
        )    
    }
}

export default Step2;
