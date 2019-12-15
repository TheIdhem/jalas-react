import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import moment from "moment";
import * as Network from "./../../../../helpers/network";

import "react-datepicker/dist/react-datepicker.css";

class SessionCreator extends React.Component {
  state = {
    baseDate: new Date(),
    baseDatePrim: "",
    startTime: "10:00",
    endTime: "10:00",
    options: [],
    title: "",
    userEmails: [],
    email: ""
  };

  handleChange = date => {
    this.setState({
      baseDate: date,
      baseDatePrim: moment(date).format("YYYY-MM-DD")
    });
    console.log(moment(date).format("YYYY-MM-DD"));
  };

  handleChangeStartDate = date => {
    console.log("salam", moment(date).format("h:mm"));
    this.setState({
      startTime: date
    });
  };

  handleChangeEndDate = date => {
    this.setState({
      endTime: date
    });
  };

  addSession = () => {
    console.log(this.state.title);
    Network.fetchRequest(
      "/session",
      {
        options: this.state.options,
        username: "the_idhem",
        users: this.state.userEmails,
        title: this.state.title
      },
      "POST"
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  addOptions = () => {
    this.setState({
      options: this.state.options.concat([
        {
          startAt: this.state.baseDatePrim + " " + this.state.startTime + ":00",
          endAt: this.state.baseDatePrim + " " + this.state.endTime + ":00"
        }
      ])
    });
  };
  addUserEmail = event => {
    this.setState({ email: event.target.value });
  };

  addUser = () => {
    this.setState({
      userEmails: this.state.userEmails.concat([this.state.email])
    });
  };

  render() {
    return (
      <div>
        <div>
          <label>
            عنوان:
            <input
              value={this.state.title}
              name="title"
              onChange={title => this.setState({ title: title.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            اعضا:
            <input
              value={this.state.email}
              name="title"
              onChange={this.addUserEmail}
            />
          </label>
        </div>
        <div>
          <label>
            تاریخ انتخابی:
            <DatePicker
              selected={this.state.baseDate}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            ساعت شروع:
            <TimePicker
              onChange={this.handleChangeStartDate}
              value={this.state.startTime}
            />
          </label>
        </div>
        <div>
          <label>
            ساعت پایان:
            <TimePicker
              onChange={this.handleChangeEndDate}
              value={this.state.endTime}
            />
          </label>
        </div>
        <div></div>
        <button onClick={() => this.addOptions()}>اضافه کردن زمان</button>
        <button onClick={() => this.addUser()}>اضافه کردن کاربر</button>
        <button onClick={() => this.addSession()}>ساخت جلسه</button>
      </div>
    );
  }
}

export default SessionCreator;
