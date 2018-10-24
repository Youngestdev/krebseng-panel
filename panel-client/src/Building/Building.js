import React, {Component} from 'react';
import axios from 'axios';

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: null,
    };
  }

  async componentDidMount() {
    const { match: { params }} = this.props;
    const building = (await axios.get(`http://localhost:8000/panel/building/${params.id}`)).data;
    this.setState({
      building,
    })
  }

  render() {
    const {building} = this.state;
    if ( building === null) return <p>Loading</p>;
    return (
      <div className="container">
        <div className="col">
          <blockquote>
            Next up, fix the building display page.
          </blockquote>
          <hr/>
          <h1 className="display-3">{building.title}</h1><hr/>
          <h3>Address</h3>
          <b>{building.address}</b><hr/>
        </div>
      </div>
    )
  }
}


export default Building;
