import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormLabel from "@material-ui/core/FormLabel";
import * as Network from "../../helpers/network";
import { store } from "react-notifications-component";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: null,
      addOrRemoveToPoll: true,
      voteToOption: true,
      addOrRemoveUser: true,
      addOrRemoveOption: true,
      reservationSession: true,
      deletePoll: true
    };
  }

  componentDidMount() {
    Network.getRequest("user/info", localStorage.getItem("accessToken"))
      .then(response => {
        this.setState({ notifications: response.notification });
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
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.notifications !== this.state.notifications) {
      this.state.notifications.forEach(notification => {
        const { type } = notification;
        this.setState({
          [type]: false
        });
      });
    }
  }

  handleChange = name => event => {
    const { checked } = event && event.target;
    this.setState({ [name]: checked });
    Network.fetchRequest(
      "/user/notification",
      {
        type: name
      },
      "POST",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        store.addNotification({
          title: "notificationToggle",
          message: "notification successfully toggled",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "notificationToggle",
          message: err.message,
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

  render() {
    return (
      <div style={{ margin: "30px", display: "flex", flexDirection: "column" }}>
        <FormLabel component="legend">Notifications:</FormLabel>
        <FormGroup col>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.addOrRemoveToPoll}
                onChange={this.handleChange("addOrRemoveToPoll")}
                value="addOrRemoveToPoll"
              />
            }
            label="addOrRemoveToPoll"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.voteToOption}
                onChange={this.handleChange("voteToOption")}
                value="addOrRemoveOption"
              />
            }
            label="voteToOption"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.addOrRemoveUser}
                onChange={this.handleChange("addOrRemoveUser")}
                value="addOrRemoveUser"
              />
            }
            label="addOrRemoveUser"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.addOrRemoveOption}
                onChange={this.handleChange("addOrRemoveOption")}
                value="addOrRemoveOption"
              />
            }
            label="addOrRemoveOption"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.reservationSession}
                onChange={this.handleChange("reservationSession")}
                value="reservationSession"
              />
            }
            label="reservationSession"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.deletePoll}
                onChange={this.handleChange("deletePoll")}
                value="deletePoll"
              />
            }
            label="deletePoll"
          />
        </FormGroup>
        <br />
        <a href="/">back to home</a>
      </div>
    );
  }
}

export default Profile;
