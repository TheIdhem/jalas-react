import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as Network from "./../../helpers/network";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  login = () => {
    Network.fetchRequest(
      "/login",
      {
        username: this.state.username,
        password: this.state.password
      },
      "POST"
    )
      .then(response => {
        localStorage.setItem("accessToken", "Bearer " + response.token);
        localStorage.setItem("userId", response.user.id);
        localStorage.setItem("userName", response.user.username);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClick = () => {
    this.login();
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundImage:
            "url(" +
            "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2009/1/29/1233246280180/Ayatollah-Khomeini-Irania-001.jpg?width=620&quality=85&auto=format&fit=max&s=df274f83f281f657c165f51a184699a1" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default withRouter(Login);
