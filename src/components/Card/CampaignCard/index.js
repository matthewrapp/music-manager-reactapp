import './index.css';
import { Panel, FlexboxGrid } from 'rsuite';
import { Component } from 'react';

class CampaignCard extends Component {
    
    render() {
        return (
        
              <FlexboxGrid.Item colspan={6} className="card-col">
                  <a href={'/campaign/' + this.props.campaignId} id={this.props.campaignId}>
                  {/* <a href={router.base_url + '/campaign/' + this.props.campaignId}> */}
                    {/* <Panel header={this.props.status + ' | ' + this.props.date} shaded>
                      <h2>{this.props.campaignTitle}</h2>
                      <img className='campaign-img-thumbnail' src={this.props.campaignImg} alt={this.props.campaignImgAltTag} />
                  </Panel> */}
                  <Panel shaded bodyFill style={{ display: 'inline-block', width: 240 }}>
                    <img className='campaign-img-thumbnail' src={this.props.campaignImg} alt={this.props.campaignImgAltTag} />
                    <Panel header={this.props.status} className="inside-panel">
                      <h4>{this.props.campaignTitle}</h4>
                    </Panel>
                  </Panel>
                  </a>
              </FlexboxGrid.Item>
        );
  }
}

export default CampaignCard;
