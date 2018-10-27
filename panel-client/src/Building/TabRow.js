import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import auth0Client from '../Auth/Auth';
import {ParseDate} from '../Helpers/ParseDate';

class TableRow extends Component {

  render() {
    return (
      <tr>
        <td><Link to={`/panel/building/${this.props.obj._id}`}>{this.props.obj.title}</Link></td>
        <td>{ParseDate(this.props.obj.date)}</td>
        <td className="right">
          <Link className="btn btn-secondary my-2 my-sm-0" to={`/panel/update-building/${this.props.obj._id}`}>Edit</Link>
          {/*Inline function to execute post request*/}
          <button className="btn btn-danger my-2 my-sm-0" onClick={() => {
            axios.delete(`http://localhost:8000/panel/building/${this.props.obj._id}`, {
              headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
            })
              .then(res => console.log(res.data));
            this.props.history.replace('/panel/buildings');
          }}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
