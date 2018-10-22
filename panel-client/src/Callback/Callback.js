import React, {Component} from 'react';
import { withRouter } from 'react-router';
import auth0client from '../Auth/Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth0client.handleAuthentication();
    this.props.history.replace('/buildings');
  }

  render() {
    return (
      <p>Loading Profile</p>
    );
  }
}

export default withRouter(Callback);
