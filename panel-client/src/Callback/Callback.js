import React, {Component} from 'react';
import { withRouter } from 'react-router';
import auth0client from '../Auth/Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth0client.handleAuthentication();
    this.props.history.replace('/panel/buildings');
  }

  render() {
    return (
      <div className="container">
        <p>Loading Profile</p>
      </div>
    );
  }
}

export default withRouter(Callback);
