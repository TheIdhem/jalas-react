import React from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./../../components/user";
import Option from "./../../components/option";
import "bootstrap/dist/js/bootstrap.js";
import * as Network from "./../../helpers/network";
import moment from "moment";
import DatePickerTemplate from "../../components/datePickerTemplate";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseDate: new Date(),
      baseDatePrim: moment(new Date()).format("YYYY-MM-DD"),
      optionsClickByUser: [],
      startTime: "10:00",
      endTime: "10:00",
      sessionOptions: [],
      newUsersEmail: [],
      newUsers: [],
      optionIdForReserve: 0,
      roomIdToReserve: 0,
      title: ""
    };
  }

  updateSession = sessionId => {
    Network.fetchRequest(
      "/session",
      {
        options: this.state.sessionOptions,
        users: this.state.newUsersEmail,
        title: this.state.title,
        sessionId
      },
      "PUT",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  reservSession = sessionId => {
    console.log(
      sessionId,
      this.state.roomIdToReserve,
      this.state.optionIdForReserve
    );
    Network.fetchRequest(
      "/session/rooms/" + this.state.roomIdToReserve + "/reserve",
      {
        optionId: this.state.optionIdForReserve,
        sessionId: sessionId
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

  toggleOptionVote = optionId => {
    // console.log(this.state.baseDatePrim, this.state.startTime);
    Network.fetchRequest(
      "/session/" + optionId + "/vote",
      {},
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

  handleChange = data => {
    var hasItem = false;
    var options = [];
    this.state.optionsClickByUser.forEach(item => {
      if (item !== data) {
        options.push(item);
      } else hasItem = true;
    });
    if (!hasItem) {
      options.push(data);
    }
    this.setState({ optionsClickByUser: options });
    this.toggleOptionVote(data);
  };

  handleChangeForReserve = optionId => {
    console.log("optionId", optionId);
    this.setState({ optionIdForReserve: optionId });
  };

  handleRoomForReserv = roomIdToReserve => {
    console.log("roomReserved", roomIdToReserve);
    this.setState({ roomIdToReserve });
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

  addUserEmail = event => {
    this.setState({ email: event.target.value });
  };

  addNewUsers = () => {
    console.log("email", this.state.email);
    this.setState({
      newUsersEmail: this.state.newUsersEmail.concat([this.state.email]),
      newUsers: this.state.newUsers.concat({
        name: this.state.email,
        email: this.state.email
      })
    });
  };

  componentWillReceiveProps(props) {
    if (
      this.state.sessionOptions != props.session.options &&
      props.session.users
    )
      this.setState({
        sessionOptions: props.session.options,
        newUsers: props.session.users,
        newUsersEmail: props.session.users.map(item => item.email),
        title: props.session.title
      });
  }

  addNewOptions = () => {
    this.setState({
      sessionOptions: this.state.sessionOptions.concat({
        startAt: this.state.baseDatePrim + " " + this.state.startTime + ":00",
        endAt: this.state.baseDatePrim + " " + this.state.endTime + ":00"
      })
    });
  };

  render() {
    const { session } = this.props;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="card border-dark mb-3 container">
                <div>
                  <div className="form-group">
                    <label for="inputAddress">عنوان</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.title}
                      id="inputAddress"
                      onChange={title =>
                        this.setState({ title: title.target.value })
                      }
                    />
                  </div>
                </div>

                <p>روی چک باکس برای رای گیری و روی دکمه برای انتخاب ساعت</p>
                <div
                  className="btn-group btn-group-toggle btn-group-vertical"
                  data-toggle="buttons"
                >
                  {this.state.sessionOptions &&
                    this.state.sessionOptions.map((itemDate, indexDate) => (
                      <Option
                        handleChangeForReserve={optionId =>
                          this.handleChangeForReserve(optionId)
                        }
                        sessionStatus={session.status}
                        option={itemDate}
                        handleChange={optionId => this.handleChange(optionId)}
                        handleRoomForReserv={roomId =>
                          this.handleRoomForReserv(roomId)
                        }
                      />
                    ))}
                </div>
                <hr />

                <div className="container">
                  <div className="row">
                    {this.state.newUsers &&
                      this.state.newUsers.map((user, index) => (
                        <User user={user} key={index} />
                      ))}
                  </div>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    flex: 1
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      flex: 1
                    }}
                  >
                    <label>
                      <input
                        value={this.state.email}
                        name="title"
                        onChange={this.addUserEmail}
                      />
                      :اعضا
                    </label>
                  </div>
                  <DatePickerTemplate
                    handleChangeStartDateTime={date =>
                      this.handleChangeStartDateTime(date)
                    }
                    handleChangeEndDateTime={date =>
                      this.handleChangeEndDateTime(date)
                    }
                    handleChangeDate={date => this.handleChangeDate(date)}
                    baseDate={this.state.baseDate}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1
                  }}
                >
                  <button className="jumbotron" onClick={this.addNewOptions}>
                    اضافه کردن زمان
                  </button>
                  <button className="jumbotron" onClick={this.addNewUsers}>
                    اضافه کردن کاربر
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.reservSession(session.id)}
              >
                رزرو جلسه
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.updateSession(session.id)}
                data-dismiss="modal"
              >
                ایجاد تغیرات
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Modal);
