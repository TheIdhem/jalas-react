import React from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./../../components/user";
import Option from "./../../components/option";
import "bootstrap/dist/js/bootstrap.js";
import * as Network from "./../../helpers/network";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      optionIdForReserve: 0,
      roomIdToReserve: 0
    };
  }

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
    this.state.options.forEach(item => {
      if (item !== data) {
        options.push(item);
      } else hasItem = true;
    });
    if (!hasItem) {
      options.push(data);
    }
    this.setState({ options });
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
                      value={session.title}
                      id="inputAddress"
                    />
                  </div>
                </div>

                <p>روی چک باکس برای رای گیری و روی دکمه برای انتخاب ساعت</p>
                <div
                  className="btn-group btn-group-toggle btn-group-vertical"
                  data-toggle="buttons"
                >
                  {session.options &&
                    session.options.map((itemDate, indexDate) => (
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
                    {session.users &&
                      session.users.map((user, index) => (
                        <User user={user} key={index} />
                      ))}
                  </div>
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
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Modal);
