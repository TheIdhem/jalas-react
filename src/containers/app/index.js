import React from "react";
import { Route, withRouter } from "react-router-dom";
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
          <Route exact path="/" component={MaijorContainer} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/my-session" component={MySession} />
          <Route exact path="/invited-session" component={InvitedSession} />
          <Route exact path="/session-card" component={SessionCard} />
          <Route exact path="/single-session" component={SingleSession} />
          <Route exact path="/new-session" component={NewSession} />
          <Route exact path="/created-session" component={CreatedSession} />
          <Route
            exact
            path="/in-progress-session"
            component={InProgressSession}
          />
          <Route exact path="/login" component={Login} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
