import './index.css';
import { Content, Panel, Button, FlexboxGrid, Container, Schema, Modal, Form, FormControl, FormGroup, ControlLabel, ButtonToolbar } from 'rsuite';
import FlexboxGridItem from 'rsuite/es/FlexboxGrid/FlexboxGridItem';
import { Component } from 'react';
import AppHeader from '../../components/Header/AuthHeader'
import PageNav from '../../components/PageNav';

import { authCookie, setArtistCookie, eraseCookie, artistIdCookie } from '../../helper';
import ArtistCard from '../../components/Card/ArtistCard';
import ViewArtist from '../../components/ViewArtist';

const { StringType } = Schema.Types;



class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfArtists: 0,
            artists: [],
            createNewArtistModalOpen: false,
            artistDrawer: {
                show: false,
                editModalOpen: false,
                artist: {}
            },
            formValue: {
                artistName: '',
                artistBio: '',
                facebook: '',
                instagram: '',
                soundcloud: '',
                imageUrl: ''
            },
            formError: {}
        }
    }

    deleteArtist = async (idToDelete) => {
        const token = await authCookie(document.cookie).then(t => t);
        let data = {
            artistId: idToDelete
        }
        fetch(`${process.env.REACT_APP_API}/api/delete-artist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.split('=')[1]}`
                },
                body: JSON.stringify(data)
            })
            .then(artist => {
                    const jsonData = artist.json();
                    return jsonData;
                })
            .then(artist => {
                    this.getArtists();
                    return
                })
                .catch(err => {
                    throw new Error(err)
                })
    }

    editArtist = async (artist) => {
        console.log(artist);
        if (!this.state.editArtistModalOpen) {
            return this.setState({
                editArtistModalOpen: true,
                formValue: {
                    artistName: artist[0].artistName,
                    artistBio: artist[0].artistBio,
                    facebook: artist[0].socialMedia.facebook,
                    instagram: artist[0].socialMedia.instagram,
                    soundcloud: artist[0].socialMedia.soundcloud
                }
            })
        }

        if (this.state.editArtistModalOpen) {
            const token = await authCookie(document.cookie).then(t => t);
            let data = {
                artistId: artist
            }
            fetch(`${process.env.REACT_APP_API}/api/delete-artist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.split('=')[1]}`
                    },
                    body: JSON.stringify(data)
                })
                .then(artist => {
                        const jsonData = artist.json();
                        return jsonData;
                    })
                .then(artist => {
                        this.getArtists();
                        return
                    })
                    .catch(err => {
                        throw new Error(err)
                    })
            return this.closeModal();
        }
    }

    actionArtist = (btnTarget, artistId) => {
        let artist = this.state.artists.filter(artist => artist._id === artistId);
        if (btnTarget.classList.contains('delete-artist-btn')) {
            this.deleteArtist(artistId);
        }

        if (btnTarget.classList.contains('view-artist-btn')) {
            return this.setState({
                artistDrawer: {
                    show: true,
                    artist: artist[0]
                },
                formValue: {
                    artistName: artist[0].artistName,
                    artistBio: artist[0].artistBio,
                    facebook: artist[0].socialMedia.facebook,
                    instagram: artist[0].socialMedia.instagram,
                    soundcloud: artist[0].socialMedia.soundcloud
                }
            })
        }
    }

    createNewArtist = async () => {
        let data;
        const token = await authCookie(document.cookie).then(t => t);
        let artistId = await artistIdCookie(document.cookie).then(a => a);
        if (!this.state.createNewArtistModalOpen) {
            return this.setState({
                createNewArtistModalOpen: true
            })
        }

        if (this.state.createNewArtistModalOpen) {
            if (!this.form.check()) {
                return
            }

            data = {
                artistName: this.state.formValue.artistName,
                artistBio: this.state.formValue.artistBio,
                facebook: this.state.formValue.facebook,
                instagram: this.state.formValue.instagram,
                soundcloud: this.state.formValue.soundcloud
            }
            fetch(`${process.env.REACT_APP_API}/api/create-artist`, {
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
                
                document.cookie.split('; ').forEach(async cookie => {
                    if (cookie.split('=')[1] === undefined || cookie.split('=')[1] === 'undefined') {
                        await eraseCookie(artistId);
                        await setArtistCookie('artistId', jsonData.result._id);
                        return
                    }
                });
                this.getArtists();
                return
            })
            .catch(err => {
                throw new Error(err);
            })

            return this.closeModal();
        }
    }

    getArtists = async () => {
        const token = await authCookie(document.cookie).then(t => t);
        fetch(`${process.env.REACT_APP_API}/api/artists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        })
            .then(artists => {
                return artists.json()
            })
            .then(artists => {
                if (artists.artists.length < 1) {
                    return
                }
                return this.setState({
                    numOfArtists: artists.artists.length,
                    artists: artists.artists
                })
            })
    }

    componentDidMount = async (e) => {
        this.getArtists();
    }

    handleFormDataChange = (value) => {
        this.setState({
            formValue: value
        })
    }

    closeModal = async (e) => {
        return this.setState({
            formValue: {
                artistName: '',
                artistBio: '',
                facebook: '',
                instagram: '',
                soundcloud: ''
            },
            createNewArtistModalOpen: false,
            editArtistModalOpen: false
        })
    }

    closeDrawer = async () => {
        return this.setState({
            artistDrawer: {
                show: false,
                editModalOpen: false,
                artist: {}
            }
        })
    }
    
    render() {

        const btnArray = [
            {
                btnValue: 'Create New Artist',
                btnMobileValue: 'Create',
                cb: this.createNewArtist,
                btnClassPrefix: 'rs-green-btn-sm',
                btnId: 1
            }
        ]

        const model = Schema.Model({
            artistName: StringType().isRequired('This field is required.'),
            artistBio: StringType().isRequired('This field is required.').minLength(10, 'This field cannot be less than than 10 characters.').maxLength(200, 'This field cannot be greater than 200 characters.'),
            facebook: StringType().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?facebook\.com.*$/, 'Must be a Facebook URL. Ex) https://www.facebook.com/(your-profile)'),
            instagram: StringType().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?instagram\.com.*$/, 'Must be a Instagram URL. Ex) https://www.instagram.com/(your-profile)'),
            soundcloud: StringType().pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?soundcloud\.com.*$/, 'Must be a Soundcloud URL. Ex) https://www.soundcloud.com/(your-profile)')
        });

        if (this.state.numOfArtists < 1 && !this.state.createNewArtistModalOpen) {
            return (
                <div className="Campaigns">
                    <Container>
                        <AppHeader />
                        <Content>
                                    <Panel shaded >
                                        <FlexboxGrid justify='space-between'>
                                            <FlexboxGridItem>
                                                <h4>Currently, you have no artists.</h4>
                                                <p>Create an artist to get started.</p>
                                            </FlexboxGridItem>
                                            <FlexboxGridItem style={{ alignSelf: 'center'}}>
                                                <Button classPrefix="rs-orange-btn-sm" onClick={this.createNewArtist} type="submit">Create An Artist</Button>
                                            </FlexboxGridItem>
                                        </FlexboxGrid>
                                    </Panel>
                        </Content>
                    </Container>
                </div>
            )
        }

        return (
            <div className="Artists">
            <Container>
                <AppHeader />
                <Content>
                    <PageNav pageName="Artists" btns={btnArray} />
                    <FlexboxGrid className="ArtistCard" justify="space-between">
                        {this.state.artists.map(artist => {
                            return <ArtistCard cb={this.actionArtist} key={artist._id} artistId={artist._id} date={artist.date.split('T')[0]} artist={artist.artistName} artistImg={artist.imageUrl + '100x100'} artistImgAltTag={artist.artistName} primary={artist.primary}/>
                        })}
                    </FlexboxGrid>        
                </Content>
                <Modal className='Modal' show={this.state.createNewArtistModalOpen} onHide={this.closeModal} size='xs'>
                    <Modal.Header>
                        <Modal.Title>Create A Campaign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form model={model} className='Form' fluid
                        ref={ref => (this.form = ref)}
                        onCheck={formError => { this.setState({ formError: formError }) }}
                        onChange={this.handleFormDataChange}
                        formValue={this.state.formValue}
                    >
                        <FormGroup>
                            <ControlLabel>Artist Name</ControlLabel>
                            <FormControl name="artistName" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Artist Bio</ControlLabel>
                            <FormControl componentClass='textarea' rows={3} name="artistBio"/>
                                </FormGroup>
                        <FormGroup>
                            <ControlLabel>Facebook Link</ControlLabel>
                            <FormControl name="facebook"  type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Instagram Link</ControlLabel>
                            <FormControl name="instagram"  type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Soundcloud Link</ControlLabel>
                            <FormControl name="soundcloud"  type="text"/>
                        </FormGroup>        
                        <FormGroup>
                            <ButtonToolbar className="right">
                                <Button classPrefix="rs-orange-btn-lg"
                                        onClick={this.createNewArtist}
                                        type="submit">Create Artist</Button>
                            </ButtonToolbar>
                        </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
                    <ViewArtist show={this.state.artistDrawer.show} closeDrawer={this.closeDrawer} artistValues={this.state.artistDrawer.artist}/>
                {/* <Modal className='Modal' show={this.state.editArtistModalOpen} onHide={this.closeModal} size='xs'>
                    <Modal.Header>
                        <Modal.Title>Create A Campaign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form model={model} className='Form' fluid
                        ref={ref => (this.form = ref)}
                        onCheck={formError => { this.setState({ formError: formError }) }}
                        onChange={this.handleFormDataChange}
                        formValue={this.state.formValue}
                    >
                        <FormGroup>
                            <ControlLabel>Artist Name</ControlLabel>
                            <FormControl name="artistName" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Artist Bio</ControlLabel>
                            <FormControl componentClass='textarea' rows={3} name="artistBio"/>
                                </FormGroup>
                        <FormGroup>
                            <ControlLabel>Facebook Link</ControlLabel>
                            <FormControl name="facebook"  type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Instagram Link</ControlLabel>
                            <FormControl name="instagram"  type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Soundcloud Link</ControlLabel>
                            <FormControl name="soundcloud"  type="text"/>
                        </FormGroup>        
                        <FormGroup>
                            <ButtonToolbar className="right">
                                <Button classPrefix="rs-orange-btn-lg"
                                        onClick={this.createNewArtist}
                                        type="submit">Create Artist</Button>
                            </ButtonToolbar>
                        </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal> */}
            </Container>
        </div>
        )
  }
}

export default Artists;
