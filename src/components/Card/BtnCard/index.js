import './index.css';
import { Panel, FlexboxGrid } from 'rsuite';
import { Component } from 'react';
import { Icon } from 'rsuite';

class BtnCard extends Component {
    
    render() {
        return (
            <FlexboxGrid.Item className="BtnCard" >
                {this.props.info.map(btn => {
                    return <a key={btn.optionTitle} href={btn.optionUrl}>
                        <Panel shaded>
                            <div className='left-col'>
                                <Icon icon={btn.optionIcon} />
                            </div>
                            <div className='right-col'>
                                <h4>{btn.optionTitle}</h4>
                                <p>{btn.optionDesc}</p>
                            </div>
                        </Panel>   
                    </a>
                })}
              </FlexboxGrid.Item>
        );
  }
}

export default BtnCard;
