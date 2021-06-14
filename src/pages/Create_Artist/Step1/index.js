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
                    <FormControl name="artistBio" type="text" rows={7} componentClass="textarea"/>
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar className="right">
                        <Button classPrefix="rs-orange-btn-lg" onClick={this.props.onClick} type="submit" name="next" disabled={this.props.error}>Next</Button>
                    </ButtonToolbar>
                </FormGroup>
            </div>
        )    

    }
}

export default Step1;
