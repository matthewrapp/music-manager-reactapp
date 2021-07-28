import './index.css';
import { Panel, FlexboxGrid, Col, Button } from 'rsuite';
import { Component } from 'react';

class ListCard extends Component {

    listToOpen = (e) => {
      e.preventDefault();
      this.props.cb(this.props.listId);
    }

    render() {
        return (
              <FlexboxGrid.Item className='ListCardItem' componentClass={Col} colspan={24} style={{alignContent: 'center', marginBottom: '20px'}}>
                <Panel shaded>
                <FlexboxGrid>
                      <FlexboxGrid.Item className='panel-col' componentClass={Col} order={2} colspan={12} sm={10} style={{textAlign: 'right'}}>
                        <FlexboxGrid style={{height: '120px', alignItems: 'center', float: 'right'}}>
                            <FlexboxGrid.Item>
                             <Button classPrefix="rs-orange-btn-sm"
                                onClick={this.listToOpen}
                                style={{ marginRight: '10px' }}>{this.props.btnValue}</Button>
                            </FlexboxGrid.Item>    
                        </FlexboxGrid>
                      </FlexboxGrid.Item>
                     <FlexboxGrid.Item className='panel-col' componentClass={Col} colspan={12} sm={14}>
                        <h6 className='rs-panel-heading'>Active <i style={{color: '#ddd', fontWeight: '200', textTransform: 'capitalize'}}>&nbsp;|&nbsp; {this.props.listUrl}: {this.props.count}</i></h6>
                        <h4 className='rs-panel-name'>{this.props.listName}</h4>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </Panel>
              </FlexboxGrid.Item>
        );
  }
}

export default ListCard;
