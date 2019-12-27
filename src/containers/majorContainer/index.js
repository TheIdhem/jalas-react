import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Home from "../home";
import MySession from "../session/my-session";
import InvitedSession from "../session/invited-session";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import * as Network from "./../../helpers/network";

class MajorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
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

  componentWillMount() {
    this.getSession();
  }

  handleClickSession = modalSession => {
    this.setState({
      modalSession
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Jalas
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* tabview */}
        <header className="container">
          <div className="jumbotron mt-4">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  صفحه‌ی اصلی
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  جلسات من
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  جلسات دعوت‌شده
                </a>
              </li>
            </ul>
            <hr />
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <Home />
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                .<MySession />.
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <InvitedSession />.
              </div>
            </div>
          </div>
        </header>

        {/* delete this part */}
        <link
          href={
            "https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          }
          rel="stylesheet"
        />
      </div>
    );
  }
}

export default withRouter(MajorContainer);
