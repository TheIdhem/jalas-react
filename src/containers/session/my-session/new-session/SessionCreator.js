import React from "react";
import moment from "moment";
import * as Network from "./../../../../helpers/network";
import Option from "./../../../../components/option";
import User from "./../../../../components/user";
import DatePickerTemplate from "../../../../components/datePickerTemplate";

import "react-datepicker/dist/react-datepicker.css";

class SessionCreator extends React.Component {
  state = {
    baseDate: new Date(),
    baseDatePrim: moment(new Date()).format("YYYY-MM-DD"),
    startTime: "10:00",
    endTime: "10:00",
    options: [],
    title: "",
    userEmails: [],
    email: ""
  };

  handleChangeDate = date => {
    this.setState({
      baseDate: date,
      baseDatePrim: moment(date).format("YYYY-MM-DD")
    });
    console.log(moment(date).format("YYYY-MM-DD"));
  };

  handleChangeStartDateTime = date => {
    // console.log("salam", moment(date).format("h:mm"));
    this.setState({
      startTime: date
    });
  };

  handleChangeEndDateTime = date => {
    this.setState({
      endTime: date
    });
  };

  addSession = () => {
    console.log(this.state.title, this.state.options);
    Network.fetchRequest(
      "/session",
      {
        options: this.state.options,
        users: this.state.userEmails,
        title: this.state.title
      },
      "POST",
      localStorage.getItem("accessToken")
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "flex-end",
          margin: 100
        }}
      >
        <div>
          <label>
            <input
              value={this.state.title}
              name="title"
              onChange={title => this.setState({ title: title.target.value })}
            />
            :عنوان
          </label>
        </div>
        <div>
          <label>
            <input
              value={this.state.email}
              name="title"
              onChange={this.addUserEmail}
            />
            :اعضا
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignSelf: "center",
            width: "100%"
          }}
        >
          <DatePickerTemplate
            handleChangeStartDateTime={date =>
              this.handleChangeStartDateTime(date)
            }
            handleChangeEndDateTime={date => this.handleChangeEndDateTime(date)}
            handleChangeDate={date => this.handleChangeDate(date)}
            baseDate={this.state.baseDate}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            flexWrap: "wrap",
            width: "100%"
          }}
        >
          {this.state.options.map((item, index) => (
            <Option
              handleChangeForReserve={optionId => console.log("mohem nist")}
              sessionStatus={"pending"}
              option={item}
              key={index}
              handleChange={optionId => console.log("mohemNist")}
              handleRoomForReserv={roomId => console.log("aslan mohem nist")}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            width: "100%",
            flexWrap: "wrap"
          }}
        >
          {this.state.userEmails.map((item, index) => (
            <User user={{ name: item, email: item }} key={item} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "30%"
          }}
        >
          <button onClick={() => this.addOptions()}>اضافه کردن زمان</button>
          <button onClick={() => this.addUser()}>اضافه کردن کاربر</button>
          <button onClick={() => this.addSession()}>ساخت جلسه</button>
        </div>
      </div>
    );
  }
}

export default SessionCreator;
