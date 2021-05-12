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
                    <FormControl name="facebook" type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Instagram</ControlLabel>
                    <FormControl name="instagram" type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Soundcloud</ControlLabel>
                    <FormControl name="soundcloud" type="text" />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar className="right">
                        <Button classPrefix="orange-btn" onClick={this.props.onClick} type="submit" name="prev">Previous</Button>
                        <Button classPrefix="orange-btn" onClick={this.props.onClick} type="submit" name="submit">Finish</Button>
                    </ButtonToolbar>
                </FormGroup>
                                
            </div>
        )    
    }
}

export default Step2;
