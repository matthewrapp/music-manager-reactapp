import './index.css';
import { Panel, FlexboxGrid, Col } from 'rsuite';
import { Component } from 'react';

class CampaignCard extends Component {
    
    render() {
        return (
              <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}>
                <a href={'/admin/campaign/' + this.props.campaignId}>
                <Panel shaded style={{backgroundColor: 'transparent'}}>
                <FlexboxGrid>
                  {/* style={{ backgroundImage: `url('${this.props.campaignImg}')`}} */}
                      <FlexboxGrid.Item className='panel-col' componentClass={Col} order={2} colspan={12} sm={10} style={{textAlign: 'right'}}>
                        <img className='campaign-img-thumbnail' src={this.props.campaignImg} alt={this.props.campaignImgAltTag} />
                      </FlexboxGrid.Item>
                     <FlexboxGrid.Item className='panel-col panel-col-text' componentClass={Col} colspan={12} sm={14}>
                        <h6 className='rs-panel-heading'>{this.props.status} <i style={{color: '#ddd', fontWeight: '200', textTransform: 'capitalize'}}>&nbsp;|&nbsp; Release Date: {this.props.date}</i></h6>
                        <h4 className='rs-panel-name'>{this.props.campaignTitle}</h4>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </Panel>
                </a>
              </FlexboxGrid.Item>
        );
  }
}

export default CampaignCard;
