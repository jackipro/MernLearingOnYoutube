import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export class EditExercises extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:9999/exercises/" + this.props.match.params.id)
      .then(respone => {
        this.setState({
          username: respone.data.username,
          description: respone.data.description,
          duration: respone.data.duration,
          data: new Date(respone.data.date)
        });
      })
      .catch(err => console.log(err));

    axios.get("http://localhost:9999/users/").then(respone => {
      if (respone.data.length > 0) {
        this.setState({
          users: respone.data.map(user => user.username)
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    console.log(exercise);
    axios
      .post(
        "http://localhost:9999/exercises/updated/" + this.props.match.params.id,
        exercise
      )
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <label>Username: </label>
          <select
            ref="userInput"
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}
          >
            {this.state.users.map(user => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              value={this.state.description}
              required
              className="form-control"
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes) </label>
            <input
              type="text"
              value={this.state.duration}
              required
              className="form-control"
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit exercise log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercises;
