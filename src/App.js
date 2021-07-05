import './App.css';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import auth from './auth';
// import checkAuth from './checkAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArtist from './pages/Create_Artist';
import Campaigns from './pages/Campaigns';
import Profile from './pages/Profile';
import Artists from './pages/Artists';
import Manage from './pages/Manage';
import Error from './pages/Error';
// import UploadArtistImg from './pages/UploadArtistImg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} />
          <Route path='/admin/create-artist' component={auth(CreateArtist)} />
          <Route path='/admin/campaigns' component={auth(Campaigns)} />
          <Route path='/admin/profile' component={auth(Profile)} />
          <Route path='/admin/artists' component={auth(Artists)} />
          <Route path='/admin/manage' component={auth(Manage)} />
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export default App;
