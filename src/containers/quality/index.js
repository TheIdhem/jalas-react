import React from "react";
import { Redirect } from "react-router-dom";
import * as Network from "../../helpers/network";
import { store } from "react-notifications-component";

class Quality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityInfo: {}
    };
  }

  getReport = () => {
    Network.getRequest("report/all", localStorage.getItem("accessToken"))
      .then(response => {
        this.setState({ qualityInfo: response });
      })
      .catch(err => {
        store.addNotification({
          title: "GetQuality",
          message: "get error on got quality",
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

  componentDidMount() {
    this.getReport();
  }

  render() {
    return (
      <div style={{ margin: "30px", display: "flex", flexDirection: "column" }}>
        {(!localStorage.getItem("accessToken") && <Redirect to="/login" />) ||
          (localStorage.getItem("username") !== "admin" && <Redirect to="/" />)}
        <h1>
          میانگین زمانی ساختن جلسه:
          {this.state.qualityInfo.averageTimeOfCreateSession}
        </h1>
        <h1>
          تعداد جلسات رزرو شده: {this.state.qualityInfo.numberOfSessionReserved}
        </h1>
        <h1>
          تعداد جلسات لغو شده: {this.state.qualityInfo.numberOfSessionCancled}
        </h1>
      </div>
    );
  }
}

export default Quality;
