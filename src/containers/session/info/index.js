import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./../../../components/user";
import Option from "./../../../components/option";
import "bootstrap/dist/js/bootstrap.js";
import * as Network from "./../../../helpers/network";
import { store } from "react-notifications-component";

class SessionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null
    };
  }

  getSessionWithId = id => {
    Network.getRequest(
      "session/" + this.props.match.params.id,
      localStorage.getItem("accessToken")
    )
      .then(response => {
        this.setState({ session: response });
      })
      .catch(err => {
        store.addNotification({
          title: "Error on see session",
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

  componentDidMount() {
    this.getSessionWithId();
  }

  render() {
    const { session } = this.state;
    console.log("render");
    console.log(session);

    return (
      <div>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {session && (
                <h5 className="modal-title" id="exampleModalLabel">
                  {session.title}
                </h5>
              )}
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
                <div
                  className="btn-group btn-group-toggle btn-group-vertical"
                  data-toggle="buttons"
                >
                  {session && (
                    <Option
                      sessionStatus={session.status}
                      option={{
                        startAt: session.startAt,
                        endAt: session.startAt
                      }}
                      hiddenVote
                    />
                  )}
                </div>
                <hr />

                <div className="container">
                  <div className="row">
                    {session &&
                      session.users.map((user, index) => (
                        <User user={user} key={index} />
                      ))}
                  </div>
                </div>
                {session && (
                  <div>
                    اتاق رزرو شده:
                    {session.roomId}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionInfo;
