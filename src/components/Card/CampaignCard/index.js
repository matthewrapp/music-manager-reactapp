import './index.css';
import { Content, Panel, FlexboxGrid, Paragraph } from 'rsuite';
import { Component } from 'react';

class CampaignCard extends Component {
    
    render() {
        return (
          <Content>
              <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                  <a href={'/campaign/' + this.props.campaignId}>
                  {/* <a href={router.base_url + '/campaign/' + this.props.campaignId}> */}
                    <Panel header={this.props.status + ' | ' + this.props.date} shaded>
                      <h2>{this.props.campaignTitle}</h2>
                    </Panel>
                  </a>
              </FlexboxGrid.Item>
              </FlexboxGrid>
          </Content>
        );
  }
}

export default CampaignCard;
