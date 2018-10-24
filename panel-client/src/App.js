import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import {Route, withRouter} from 'react-router-dom'
import NewBuilding from "./Building/NewBuilding";
import Buildings from "./Building/Buildings";
import Building from "./Building/Building";
import auth0Client from "./Auth/Auth";
import Callback from "./Callback/Callback";
import SecuredRoute from "./SecuredRoute/SecuredRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
   }
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
	this.setState({checkingSession: false});
	return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
    this.setState({checkingSession: false});
  }

  render() {
    return (
      <div>
        <NavBar/>
        <SecuredRoute path='/panel/new-building' component={NewBuilding} checkingSession={this.state.checkingSession}/>
        <SecuredRoute exact path='/panel/buildings' component={Buildings} checkingSession={this.state.checkingSession}/>
        <Route exact path='/panel/building/:id' component={Building}/>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default withRouter(App);
