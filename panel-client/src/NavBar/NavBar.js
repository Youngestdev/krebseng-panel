import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0client from '../Auth/Auth'

function NavBar(props) {
  const signOut = () => {
    auth0client.logout();
    props.history.replace('/')
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        KrebsEng
      </Link>
      {
        !auth0client.isAuthenticated() && <button className="btn btn-dark" onClick={auth0client.login}>Sign In</button>
      }
      {
        auth0client.isAuthenticated() && <div>
            <label htmlFor="profile" className="mr-2 text-white">{auth0client.getProfile().name}</label>
            <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
          </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);
