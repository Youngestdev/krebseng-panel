import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import TableRow from './TabRow';
import auth0Client from '../Auth/Auth';


class Buildings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
    };
  }

  async componentDidMount() {
    const buildings = (await axios.get('http://localhost:8000/panel/buildings', {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
    })).data;
    this.setState({
      buildings,
    })
  }

  tabRow() {
    return this.state.buildings.map((object, id) => {
      return <TableRow obj={object} key={id}/>
    })
  }

  render() {
    return (
        <div className="container jumbotron">
          {this.state.buildings === null && <p> Loading Buildings</p>}
          <Link className="btn btn-primary btn-md" to="/panel/new-building" role="button">
            Add New Building
          </Link>
          <hr className="my-4" />
          <table className="table table-bordered container">
            <thead className="table-primary">
            <tr>
              <td>Title</td>
              <td>Date</td>
              <td className="right">Action</td>
            </tr>
            </thead>
            <tbody>
            {this.tabRow()}
            </tbody>
          </table>
        </div>
    )
  }
}

export default withRouter(Buildings);
