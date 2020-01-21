import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="card user-card">
          <div className="card-block">
            <div className="user-image">
              <img
                src={require("../containers/img/personel.png")}
                className="img-radius"
                alt="User-Profile-Image"
              />
            </div>
            <h6 className="f-w-600 m-t-25 m-b-10">{this.props.user.name}</h6>
            <hr />
            <p className="text-muted m-t-15">{this.props.user.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(User);
