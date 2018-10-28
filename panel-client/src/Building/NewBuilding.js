import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth/Auth';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

class NewBuilding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      address: '',
      neighborhood: '',
      date: moment()
    };
    this.updateDate = this.updateDate.bind(this);
  }

  updateDate(date) {
    this.setState({
      date: date,
    });
  }

  updateDescription(value) {
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

  async submit() {
    this.setState({
      disabled: true,
    });
    const building = {
      title: this.state.title,
      address: this.state.address,
      neighborhood: this.state.neighborhood,
      date: this.state.date,
      user: auth0Client.getProfile().name
    };
    axios.post('http://localhost:8000/panel/building', building, {
      headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
    })
      .then(res => console.log(res.data));

    this.props.history.push('/panel/buildings');

  }

  render() {
    return (
      <div className="row border-primary">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Building</div>
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
                    placeholder="Building title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    name="address"
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateDescription(e.target.value)
                    }}
                    className="form-control"
                    placeholder="Building Address."
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
                    className="form-control"
                    placeholder="Building Neighborhood."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
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
                    this.submit()
                  }}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(NewBuilding);
