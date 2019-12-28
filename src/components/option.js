import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import * as Network from "./../helpers/network";

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userVote: null,
      agreeVotes: 0,
      disAgreeVotes: 0
    };
  }

  voteToOption = (optionId, status) => {
    // console.log(optionId, this.state.startTime);
    Network.fetchRequest(
      "/session/vote",
      {
        status,
        optionId
      },
      "POST",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        console.log(status);
      })
      .catch(err => {
        // console.log(err);
      });
    // this.setState({ userVote: status == "up" ? true : false });
  };

  upVote = () => {
    this.voteToOption(
      this.props.option.id,
      this.state.userVote ? "delete" : "up"
    );
    this.setState({
      userVote: this.state.userVote ? null : true,
      agreeVotes: this.state.userVote
        ? this.state.agreeVotes - 1
        : this.state.agreeVotes + 1,
      disAgreeVotes:
        this.state.userVote == false
          ? this.state.disAgreeVotes - 1
          : this.state.disAgreeVotes
    });
  };

  downVote = () => {
    this.voteToOption(
      this.props.option.id,
      this.state.userVote == false ? "delete" : "down"
    );
    this.setState({
      agreeVotes: this.state.userVote
        ? this.state.agreeVotes - 1
        : this.state.agreeVotes,
      userVote: this.state.userVote == false ? null : false,
      disAgreeVotes:
        this.state.userVote == false
          ? this.state.disAgreeVotes - 1
          : this.state.disAgreeVotes + 1
    });
  };

  componentWillMount() {
    if (!this.props.hiddenVote) {
      var userId = localStorage.getItem("userId");
      var userVoteMap = {};
      this.props.option.votes.map(
        item => (userVoteMap[item.user.id] = item.status)
      );
      this.setState({
        agreeVotes: this.props.option.agreeVotes,
        disAgreeVotes: this.props.option.disAgreeVotes,
        userVote:
          userVoteMap[userId] == "up"
            ? true
            : userVoteMap[userId] == "down"
            ? false
            : null
      });
    }
  }

  render() {
    const { sessionStatus, option, hiddenVote } = this.props;
    console.log(option);
    return (
      <div
        className="btn btn-secondary mt-1"
        onClick={() => this.props.handleChangeForReserve(option.id)}
      >
        <div className=" custom-checkbox mb-3">
          {!hiddenVote ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <FontAwesomeIcon
                className="fas fa-camera fa-3x"
                icon={faSortUp}
                color={this.state.userVote ? "orange" : "white"}
                size={"10x"}
                onClick={this.upVote}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "4%"
                }}
              >
                {this.state.agreeVotes - this.state.disAgreeVotes}
              </div>

              <FontAwesomeIcon
                className="fas fa-camera fa-3x"
                icon={faSortDown}
                color={this.state.userVote == false ? "orange" : "white"}
                size={"10x"}
                onClick={this.downVote}
              />
            </div>
          ) : null}

          <label>
            <p>start: {option.startAt}</p>
            <p>end: {option.endAt}</p>
          </label>
          {!hiddenVote ? <hr /> : null}

          {sessionStatus === "pending" && !hiddenVote && (
            <div>
              <h1>اتاق‌های موجود</h1>
              <div>
                {option.roomsCouldBeReserved &&
                  option.roomsCouldBeReserved.map((item, index) => (
                    <div
                      onClick={() => this.props.handleRoomForReserv(item)}
                      key={index}
                    >
                      <p>{item}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Option);
