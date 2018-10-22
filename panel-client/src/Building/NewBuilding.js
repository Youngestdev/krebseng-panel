import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth/Auth';
import axios from 'axios';

class NewBuilding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      address: '',
      neighborhood: '',
      date: Date.now()
    };
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
      date: Date.now()
    }
    axios.post('http://localhost:8000/panel/building', building, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })
      .then(res => console.log(res.data));

    // this.props.history.push('/');

  }

  render() {
    return (
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
                    onBlur={(e) => {this.updateTitle(e.target.value)}}
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
                    onBlur={(e) => {this.updateDescription(e.target.value)}}
                    className="form-control"
                    placeholder="Give more context to your question."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="neighborhood">neighborhood:</label>
                  <input
                    name="neighborhood"
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateNeighborhood(e.target.value)}}
                    className="form-control"
                    placeholder="Building title."
                  />
                </div>
                {/*<input type="date" name="date" id="date"/>*/}
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewBuilding);
