import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Network from "./../../helpers/network";
import Modal from "./../modal";

// css
import "../css/newSession.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      options: [],
      roomId: 0,
      roomIdToReserve: 0,
      modalSession: {}
    };
  }

  getSession = id => {
    // console.log(this.state.baseDatePrim, this.state.startTime);
    Network.getRequest("session", localStorage.getItem("accessToken"))
      .then(response => {
        console.log(response);
        this.setState({ sessions: response });
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

  componentWillMount() {
    this.getSession();
  }

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

  handleChangeOption = optionId => {
    this.setState({ optioIdToReserve: optionId });
  };

  handleClickSession = modalSession => {
    this.setState({
      modalSession
    });
  };

  render() {
    return (
      <div>
        <Modal session={this.state.modalSession} />

        {this.state.sessions &&
          this.state.sessions.map((item, index) => (
            <div className="container">
              {item.status === "pending" ? (
                <div
                  className="alert alert-warning"
                  role="alert"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.handleClickSession(item)}
                  >
                    مشاهده ی جلسه در حال انتظار
                  </button>
                  <label>{item.title}</label>
                </div>
              ) : item.status == "unavailble" ? (
                <div className="alert alert-dark" role="alert">
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.handleClickSession(item)}
                  >
                    مشاهده ی جلسه غیر قابل دسترس
                  </button>
                </div>
              ) : item.status == "successReserved" ? (
                <div className="alert alert-success" role="alert">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.handleClickSession(item)}
                  >
                    مشاهده ی جلسه رزروشده
                  </button>
                </div>
              ) : (
                <div className="alert alert-danger" role="alert">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.handleClickSession(item)}
                  >
                    مشاهده ی جلسه کنسل شده
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
