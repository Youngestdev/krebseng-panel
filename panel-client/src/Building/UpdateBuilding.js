import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import auth0Client from "../Auth/Auth";
import {ParseDate} from "../Helpers/ParseDate";

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
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const {match: {params}} = this.props;
    const building = (await axios.get(`http://localhost:8000/panel/building/${params.id}`));
    this.setState({
      building: building.data
    });
  }

  handleChange(prop, e) {
    this.setState({prop: e.target.value})
  }

  // TODO: It'll be commented out once I fix the browser related problem.
  // updateDate(value) {
  //   this.setState({
  //     date: value,
  //   });
  // }

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

  async update() {
    this.setState({
      disabled: true,
    });
    const {match: {params}} = this.props;
    const building = {
      title: this.state.title,
      address: this.state.address,
      neighborhood: this.state.neighborhood,
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
                    value={this.state.building.title}
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
                    placeholder="Building Address"
                    value={this.state.building.address}
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
                    value={this.state.building.neighborhood}
                  />
                </div>
                {/*Seems a browser related issue is affecting the date update funciton hhre. It's a TODO*/}
                {/*<div className="form-group">*/}
                  {/*<label htmlFor="date">Date:</label>*/}
                  {/*<input*/}
                    {/*name="date"*/}
                    {/*disabled={this.state.disabled}*/}
                    {/*type="date"*/}
                    {/*data-date=""*/}
                    {/*data-date-format="DD MM YYYY"*/}
                    {/*onBlur={(e) => {*/}
                      {/*this.updateDate(e.target.value)*/}
                    {/*}}*/}
                    {/*className="form-control"*/}
                    {/*value={ParseDate(this.state.building.date)}*/}
                  {/*/>*/}
                {/*</div>*/}
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    this.update()
                  }}>
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


export default withRouter(UpdateBuilding);
