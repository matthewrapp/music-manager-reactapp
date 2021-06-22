import './index.css';
import {Container, Content, FlexboxGrid } from 'rsuite';
import { Component } from 'react';
import { Widget } from '@uploadcare/react-widget';
import { authCookie, artistIdCookie } from '../../helper';

class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataToSend: null
        }
    }

    onUploadImg = async (fileInfo) => {
        const token = await authCookie(document.cookie).then(t => t);
        const artistId = await artistIdCookie(document.cookie).then(a => a);
        let data = {
            fileInfo: fileInfo,
            artistId: artistId.split('=')[1]
        }
        fetch(`${process.env.REACT_APP_API}${this.props.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.split('=')[1]}`
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                const jsonData = data.json();
                return jsonData;
            })
            .then(jsonData => {
                this.props.cb(jsonData)
                return
            })
            .catch(err => {
                throw new Error(err)
            })
    }
    
    render() {
        return (
            <div className="UploadImg">
                <Container>
                    <Content> 
                        <FlexboxGrid justify="center" align="middle">
                            <FlexboxGrid.Item>
                                <Widget publicKey={process.env.IMAGE_UPLOADER_PUBLIC_KEY} onChange={this.onUploadImg} clearable tabs='file' />
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Content>
                </Container>    
            </div>
        )    
    }
}

export default UploadImg;
