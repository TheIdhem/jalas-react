import React from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";
import Home from "../home";
import MySession from "../session/my-session";
import InvitedSession from "../session/invited-session";
import SessionCard from "../session/invited-session/session-card";
import SingleSession from "../session/invited-session/session-card/single-session";
import NewSession from "../session/my-session/new-session";
import CreatedSession from "../session/my-session/created-session";
import InProgressSession from "../session/my-session/created-session/InProgressSession";
import Login from "../login";
import MaijorContainer from "../majorContainer";
import SessionInfo from "./../session/info";
import NotFound from "./../NotFound";
import ReactNotification from "react-notifications-component";

import "react-notifications-component/dist/theme.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

class App extends React.Component {
  componentWillMount() {
    var accessToken = localStorage.getItem("accessToken");
    if (!accessToken) this.props.history.push("/login");
    else this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <main>
          <Route path="/session/:id" component={SessionInfo} />
          <Route exact path="/" component={MaijorContainer} />
          <Route path="/home" component={Home} />
          <Route path="/my-session" component={MySession} />
          <Route path="/invited-session" component={InvitedSession} />
          <Route path="/session-card" component={SessionCard} />
          <Route path="/single-session" component={SingleSession} />
          <Route path="/new-session" component={NewSession} />
          <Route path="/created-session" component={CreatedSession} />
          <Route
            exact
            path="/in-progress-session"
            component={InProgressSession}
          />
          <Route exact path="/login" component={Login} />
          {/* <Route path="*" component={NotFound} /> */}
        </main>
        <ReactNotification />
      </div>
    );
  }
}

export default withRouter(App);
