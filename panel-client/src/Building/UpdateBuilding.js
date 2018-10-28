import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import auth0Client from '../Auth/Auth';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

class UpdateBuilding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: null,
      disabled: false,
      title: '',
      address: '',
      neighborhood: '',
      date: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async componentDidMount() {
    const {match: {params}} = this.props;
    const building = (await axios.get(`http://localhost:8000/panel/building/${params.id}`, {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}}));
    this.setState({
      building: building.data,
      title: building.data.title,
      address: building.data.address,
      neighborhood: building.data.neighborhood,
      date: moment()
    });
  }

  // TODO: It'll be commented out once I fix the browser related problem.
  // STATUS: Still working on it.
  updateDate(date) {
    this.setState({
      date: date,
    });
  }

  updateAddress(value) {
    this.setState({
      address: value,
    });
  }

  updateNeighborhood(value) {
    this.setState({
      neighborhood: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async update() {
    this.setState({
      disabled: true,
    });
    const {match: {params}} = this.props;
    const building = {
      title: this.state.title,
      address: this.state.address,
      neighborhood: this.state.neighborhood,
      date: this.state.date,
    };
    axios.put(`http://localhost:8000/panel/building/${params.id}`, building, {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
    })
      .then(res => console.log(res.data));

    this.props.history.push('/panel/buildings');
  }


  render() {
    if (this.state.building === null) return <p>Loading</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Update Building</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    name="title"
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateTitle(e.target.value)
                    }}
                    className="form-control"
                    placeholder="Building title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    name="address"
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateAddress(e.target.value)
                    }}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Building Address"
                    value={this.state.address}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="neighborhood">neighborhood:</label>
                  <input
                    name="neighborhood"
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateNeighborhood(e.target.value)
                    }}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Building Neighborhood."
                    value={this.state.neighborhood}
                  />
                </div>
                <div className="form-group">
                {/* TODO: Fix date updating bug.*/}
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.updateDate}
                    name="date"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    this.update()
                  }}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(UpdateBuilding);
