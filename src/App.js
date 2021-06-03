import './App.css';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import auth from './auth';
// import checkAuth from './checkAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArtist from './pages/Create_Artist';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/Campaigns/Create_Campaign';
import Error from './pages/Error';

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
          <Route path='/admin/create-campaign' component={auth(CreateCampaign)} />
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export default App;
