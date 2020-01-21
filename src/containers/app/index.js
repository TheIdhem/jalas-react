import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
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
import ReactNotification from "react-notifications-component";
import Profile from "../profile";
import Quality from "../quality";

import Comment from "../comment";

import "react-notifications-component/dist/theme.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

class App extends React.Component {
  render() {
    return (
      <div>
        {!localStorage.getItem("accessToken") && <Redirect to="/login" />}
        <main>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/comment" component={Comment} />
            <Route path="/session/:id" component={SessionInfo} />
            <Route exact path="/" component={MaijorContainer} />
            <Route path="/home" component={Home} />
            <Route path="/my-session" component={MySession} />
            <Route path="/invited-session" component={InvitedSession} />
            <Route path="/session-card" component={SessionCard} />
            <Route path="/single-session" component={SingleSession} />
            <Route path="/new-session" component={NewSession} />
            <Route path="/created-session" component={CreatedSession} />
            <Route path="/quality" component={Quality} />
            <Route
              exact
              path="/in-progress-session"
              component={InProgressSession}
            />
            <Route exact path="/login" component={Login} />
          </Switch>
          {/* <Route path="*" component={NotFound} /> */}
        </main>
        <ReactNotification />
      </div>
    );
  }
}

export default withRouter(App);
