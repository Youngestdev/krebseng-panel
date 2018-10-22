import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import {Route} from 'react-router-dom'
import NewBuilding from "./Building/NewBuilding";
import Buildings from "./Building/Buildings";
import Building from "./Building/Building";
import Callback from "./Callback/Callback";
import SecuredRoute from "./SecuredRoute/SecuredRoute";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/buildings' component={Buildings}/>
        <Route exact path='/panel/building/:id' component={Building}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute path='/new-building' component={NewBuilding}/>
      </div>
    );
  }
}

export default App;
