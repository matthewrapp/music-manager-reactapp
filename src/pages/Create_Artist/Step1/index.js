import '../index.css';
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'rsuite';
import { Component } from 'react';

class Step1 extends Component {

    render() {
        if (this.props.currentStep !== 1) {
            return null
        }

        return (
            <div className="Step1 show-fake-browser login-page">
                <FormGroup>
                    <ControlLabel>Artist Name</ControlLabel>
                    <FormControl name="artistName" type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Artist Bio</ControlLabel>
                    <FormControl name="artistBio" type="text" />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar className="right">
                        <Button classPrefix="orange-btn" onClick={this.props.onClick} type="submit" name="next">Next</Button>
                    </ButtonToolbar>
                </FormGroup>
            </div>
        )    
    }
}

export default Step1;
