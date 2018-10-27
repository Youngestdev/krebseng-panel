import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth/Auth'

function NavBar(props) {
  const signOut = () => {
    auth0Client.logout();
    props.history.replace('/')
  };

  return (
      <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/panel/buildings">
        KrebsEng
      </Link>
      {
        !auth0Client.isAuthenticated() && <button className="btn btn-dark" onClick={auth0Client.login}>Sign In</button>
      }

      {
        auth0Client.isAuthenticated() && <div>
            <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
          </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);
