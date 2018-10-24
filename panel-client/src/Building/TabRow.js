import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td><Link to={`/panel/building/${this.props.obj._id}`}>{this.props.obj.title}</Link></td>
        <td>{this.props.obj.date}</td>
        <td>TODO: Actions dropdown menu with the <b>Edit</b>and<b>Delete</b> option.</td>
      </tr>
    );
  }
}


export default TableRow;
