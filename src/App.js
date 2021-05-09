import './App.css';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Error from './pages/Error';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' component={Login} exact />
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export default App;
