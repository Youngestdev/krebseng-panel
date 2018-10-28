import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import auth0Client from '../Auth/Auth';
// import {ParseDate} from '../Helpers/ParseDate';

class TableRow extends Component {

  render() {
    return (
      <tr>
        {/* TODO: Format Date ! */}
        <td><h5>{this.props.obj.title}</h5></td>
        <td>{this.props.obj.date}</td>
        <td className="right">
          <Link className="btn btn-primary btn-sm" to={`/panel/update-building/${this.props.obj._id}`}>Edit</Link>
          {/*Inline function to execute post request*/}
          <button className="btn btn-danger btn-sm" onClick={() => {
            axios.delete(`http://localhost:8000/panel/building/${this.props.obj._id}`, {
              headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            })
              .then(res => console.log(res.data));
              window.location.reload(true);
          }}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
