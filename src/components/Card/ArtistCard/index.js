import './index.css';
import { Panel, FlexboxGrid, Col, Button, Icon } from 'rsuite';
import { Component } from 'react';

class ArtistCard extends Component {
    
    render() {
        return (
              <FlexboxGrid.Item componentClass={Col} colspan={24} style={{alignContent: 'center', marginBottom: '20px'}}>
                <Panel shaded>
                <FlexboxGrid>
                  {/* style={{ backgroundImage: `url('${this.props.campaignImg}')`}} */}
                      <FlexboxGrid.Item className='panel-col' componentClass={Col} order={2} colspan={12} sm={10} style={{textAlign: 'right'}}>
                        <FlexboxGrid style={{height: '120px', alignItems: 'center', float: 'right'}}>
                            <FlexboxGrid.Item>
                                <Button className='delete-artist-btn' classPrefix="rs-red-btn-sm"
                                    onClick={(e) => this.props.cb(e.target, this.props.artistId)}
                                    style={{marginRight: '10px'}}>Delete Artist</Button>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item>
                                <Button className='view-artist-btn' classPrefix="rs-blue-btn-sm"
                                    onClick={(e) => this.props.cb(e.target, this.props.artistId)}
                                    style={{marginRight: '10px'}}>View Artist</Button>
                            </FlexboxGrid.Item>    
                        </FlexboxGrid>
                      </FlexboxGrid.Item>
                     <FlexboxGrid.Item className='panel-col' componentClass={Col} colspan={12} sm={14}>
                        <h6 className='rs-panel-heading'>Active <i style={{color: '#ddd', fontWeight: '200', textTransform: 'capitalize'}}>&nbsp;|&nbsp; @{this.props.artist.split(' ').join('_')}</i><i>{this.props.primary ? <Icon icon="star"></Icon> : ''}</i></h6>
                        <h4 className='rs-panel-name'>{this.props.artist}</h4>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </Panel>
              </FlexboxGrid.Item>
        );
  }
}

export default ArtistCard;
