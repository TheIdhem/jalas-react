import React from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./../../components/user";
import Option from "./../../components/option";
import "bootstrap/dist/js/bootstrap.js";
import * as Network from "./../../helpers/network";
import moment from "moment";
import DatePickerTemplate from "../../components/datePickerTemplate";
import { store } from "react-notifications-component";
import Comment from "../comment";

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
      title: "",
      newComment: "",
      comments: this.props.session.comments,
      session: undefined
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.session.id !== this.props.session.id ||
      prevProps.session.options !== this.props.session.options ||
      prevProps.session.users !== this.props.session.users
    ) {
      this.setState({
        comments: this.props.session.comments || [],
        sessionOptions: this.props.session.options || [],
        newUsers: this.props.session.users || []
      });
    }
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
        store.addNotification({
          title: "sessionUpdated",
          message: "session updated",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      })
      .catch(err => {
        store.addNotification({
          title: "Error on update session",
          message: err.message,
          type: "danger",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
    this.props.getAllSession();
  };

  reservSession = sessionId => {
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
        store.addNotification({
          title: "sessionReservation",
          message: "session successfully reserved",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "sessionReservation",
          message: err.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
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
    if (this.state.sessionOptions !== props.session.options) {
      this.setState({
        sessionOptions: props.session.options,
        newUsers: props.session.users,
        newUsersEmail:
          props.session.users && props.session.users.map(item => item.email),
        title: props.session.title
      });
    }
    this.getSession(props.session.id);
  }

  addNewOptions = () => {
    this.setState({
      sessionOptions: this.state.sessionOptions.concat({
        startAt: this.state.baseDatePrim + " " + this.state.startTime + ":00",
        endAt: this.state.baseDatePrim + " " + this.state.endTime + ":00"
      })
    });
  };

  getSession = sessionId => {
    console.log("getSession", sessionId);
    if (sessionId)
      Network.getRequest(
        "session/" + sessionId,
        localStorage.getItem("accessToken")
      )
        .then(response => {
          this.setState({ sessionOptions: response.options });
        })
        .catch(err => {
          console.log(err);
        });
  };

  handleSendComment = () => {
    const content = this.state.newComment;
    const sessionId = this.props.session.id;
    Network.fetchRequest(
      "/comment",
      {
        content: content,
        sessionId: sessionId
      },
      "POST",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        let comments = [];
        const objectArray = Object.entries(response);
        objectArray.forEach(([key, value]) => {
          comments.push(value);
        });
        this.setState({
          comments: comments
        });
        store.addNotification({
          title: "commentCreation",
          message: "comment successful created",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "commentCreation",
          message: "comment creation got error",
          type: "danger",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  setComments = comments => {
    this.setState({
      comments
    });
  };

  handleClose = () => {
    Network.getRequest("session", localStorage.getItem("accessToken"))
      .then(response => {
        this.setState({ sessions: response });
      })
      .catch(err => {
        store.addNotification({
          title: "GetSession",
          message: "get error on got sessions",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
  };

  removeOption = id => {
    Network.fetchRequest(
      "/session/option/" + id,
      {},
      "DELETE",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        let options = [];
        const objectArray = Object.entries(response);
        objectArray.forEach(([key, value]) => {
          options.push(value);
        });
        this.setState({
          sessionOptions: options
        });
        store.addNotification({
          title: "optionDelete",
          message: "option successful deleted",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "optionDelete",
          message: "option deletion got error",
          type: "danger",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
  };

  cancelSession = id => {
    Network.fetchRequest(
      "/session/status",
      {
        sessionId: id,
        status: "cancled"
      },
      "POST",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        let users = [];
        const objectArray = Object.entries(response);
        objectArray.forEach(([key, value]) => {
          users.push(value);
        });
        this.setState({
          newUsers: users
        });
        store.addNotification({
          title: "canclation",
          message: "successfully cancled",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "canclation",
          message: err.message,
          type: "danger",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
  };

  removeUser = id => {
    Network.fetchRequest(
      "/user/" + id + "/session/" + this.props.session.id,
      {},
      "DELETE",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        let users = [];
        const objectArray = Object.entries(response);
        objectArray.forEach(([key, value]) => {
          users.push(value);
        });
        this.setState({
          newUsers: users
        });
        store.addNotification({
          title: "userDelete",
          message: "user successful deleted",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "userDelete",
          message: err.message,
          type: "danger",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
  };

  render() {
    const { session } = this.props;
    const comments =
      this.state.comments &&
      this.state.comments.map(comment => (
        <Comment
          key={comment.id}
          id={comment.id}
          replies={comment.replies}
          sessionId={session.id}
          content={comment.content}
          parentCommentId={comment.parentCommentId}
          senderId={comment.sender.id}
          handleParent={this.setComments}
        />
      ));
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {session.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.handleClose()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="card border-dark mb-3 container">
                <div>
                  <div className="form-group">
                    <label>عنوان</label>
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
                      <>
                        <button onClick={() => this.removeOption(itemDate.id)}>
                          حذف گزینه
                        </button>
                        <Option
                          key={indexDate}
                          handleChangeForReserve={optionId =>
                            this.handleChangeForReserve(optionId)
                          }
                          sessionStatus={session.status}
                          option={itemDate}
                          handleRoomForReserv={roomId =>
                            this.handleRoomForReserv(roomId)
                          }
                          hiddenVote={!itemDate.id}
                        />
                      </>
                    ))}
                </div>
                <hr />

                <div className="container">
                  <div className="row">
                    {this.state.newUsers &&
                      this.state.newUsers.map((user, index) => (
                        <div className="col-md-4">
                          <button
                            type="button"
                            onClick={() => this.removeUser(user.id)}
                          >
                            حذف کاربر
                          </button>

                          <User user={user} key={index} />
                        </div>
                      ))}
                  </div>
                </div>
                {session.status === "successReserved" && session && (
                  <div>
                    اتاق رزرو شده:
                    {session.roomId}
                  </div>
                )}
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
                <div className="comment-container">{comments}</div>
                <div className="comment-box">
                  <input
                    type="textarea"
                    name="newComment"
                    onChange={this.handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => this.handleSendComment()}
                  >
                    ثبت نظر جدید
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => this.handleClose()}
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.cancelSession(session.id)}
              >
                {session.status === "successReserved"
                  ? "لغو جلسه"
                  : "لغو رای‌گیری"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Modal);
