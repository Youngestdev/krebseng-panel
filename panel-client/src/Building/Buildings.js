import React, {Component} from 'react';
import axios from 'axios';
import TableRow from "./TabRow";


class Buildings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
    };
  }

  async componentDidMount() {
    const buildings = (await axios.get('http://localhost:8000/panel/buildings')).data;
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
      <div className="container">
        <div className="row">
          {this.state.buildings === null && <p> Loading Buildings</p>}
          <div className="card-header">
            <h3>Button should go here</h3>
          </div>
          <table className="table table-striped">
            <thead>
            <tr>
              <td>Title</td>
              <td>Date</td>
              <td>Action</td>
            </tr>
            </thead>
            <tbody>
            {this.tabRow()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Buildings;
