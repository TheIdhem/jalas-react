import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Network from "./../../helpers/network";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      options: []
    };
  }

  getSession = id => {
    // console.log(this.state.baseDatePrim, this.state.startTime);
    Network.getRequest("/session?username=the_idhem")
      .then(response => {
        console.log(response);
        this.setState({ sessions: response });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addOptions = () => {
    // console.log(this.state.baseDatePrim, this.state.startTime);
    Network.fetchRequest(
      "/session/vote",
      {
        agreeOptionIds: this.state.options,
        disAgreeOptionIds: [],
        username: "the_idhem"
      },
      "POST"
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getSession();
  }

  handleChange = data => {
    var hasItem = false;
    var options = [];
    this.state.options.forEach(item => {
      if (item != data) {
        options.push(item);
      } else hasItem = true;
    });
    if (!hasItem) {
      options.push(data);
    }
    this.setState({ options });
    this.addOptions();
  };

  render() {
    console.log(this.state.options);
    return (
      <div>
        {this.state.sessions.map((item, index) => (
          <div
            style={{
              border: "solid 2px black",
              borderRadius: "50px",
              padding: "50px"
            }}
            key={index}
          >
            <p>title: {item.title}</p>
            <p> انتخاب‌ها</p>
            {item.options.map((itemDate, indexDate) => (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    top: "10px"
                  }}
                  key={indexDate}
                >
                  <input
                    type="checkbox"
                    name="selectedOptionTime"
                    // value={this.props.id}
                    // checked={this.props.selectedOptionTime == this.props.id}
                    onChange={() => this.handleChange(itemDate.id)}
                  />
                </div>
                <div>
                  <p>start: {itemDate.startAt}</p>
                  <p>end: {itemDate.endAt}</p>
                </div>
              </div>
            ))}
            <p>افراد حاضر در جلسه:</p>
            {item.users.map((name, indexName) => (
              <p key={indexName}>{name.name}</p>
            ))}

            <p>وضعیت:</p>
            {item.status}

            <p>اتاق</p>
            {item.roomId}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
