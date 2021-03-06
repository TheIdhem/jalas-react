import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Home from "../home";
import MySession from "../session/my-session";
import InvitedSession from "../session/invited-session";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import * as Network from "./../../helpers/network";
import { store } from "react-notifications-component";
import { Redirect } from "react-router-dom";

class MajorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      modalSession: {}
    };
  }

  getSession = id => {
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

  componentWillMount() {
    this.setState({ username: localStorage.getItem("username") });
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
        {localStorage.getItem("username") === "admin" && (
          <Redirect to="/quality" />
        )}
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
          <div className="navbar-brand" style={{ backgroundColor: "inherit" }}>
            <ul>
              <a href="/profile">{localStorage.getItem("username")}</a>
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
                  جلسات من
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
                  ساخت جلسه
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
