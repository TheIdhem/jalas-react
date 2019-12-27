import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sessionStatus, option } = this.props;
    return (
      <div
        className="btn btn-secondary mt-1"
        onClick={() => this.props.handleChangeForReserve(option.id)}
      >
        <div className=" custom-checkbox mb-3">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FontAwesomeIcon
              className="fas fa-camera fa-3x"
              icon={faSortUp}
              color={"white"}
              size={"fa-10x"}
            />
            <FontAwesomeIcon
              className="fas fa-camera fa-3x"
              icon={faSortDown}
              color={"white"}
              size={"fa-10x"}
            />
          </div>

          <label for={"customControlValidation1"}>
            <p>start: {option.startAt}</p>
            <p>end: {option.endAt}</p>
          </label>
          <hr />

          {sessionStatus === "pending" && (
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
