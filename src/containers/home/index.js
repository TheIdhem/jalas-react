import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Network from "./../../helpers/network";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      options: [],
      roomId: 0,
      roomIdToReserve: 0
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

  addOptions = options => {
    // console.log(this.state.baseDatePrim, this.state.startTime);
    Network.fetchRequest(
      "/session/vote",
      {
        agreeOptionIds: options,
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
    this.addOptions(options);
  };

  reservSession = sessionId => {
    Network.fetchRequest(
      "/session/rooms/" + this.state.roomIdToReserve + "/reserve",
      {
        optionId: this.state.optioIdToReserve,
        sessionId: sessionId,
        username: "the_idhem",
        startAt: "2019-12-14 19:00:00",
        endAt: "2019-12-14 19:00:00"
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

  handleChangeOption = optionId => {
    this.setState({ optioIdToReserve: optionId });
  };

  render() {
    console.log(this.state.sessions);
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
                    onChange={() => this.handleChange(itemDate.id)}
                  />
                  <div
                    style={{
                      padding: "10px"
                    }}
                  >
                    <input
                      type="radio"
                      name="selectedOptionTime"
                      onChange={() => this.handleChangeOption(itemDate.id)}
                    />
                  </div>
                </div>
                <div>
                  <p>start: {itemDate.startAt}</p>
                  <p>end: {itemDate.endAt}</p>
                </div>
                {item.status == "pending" && (
                  <div>
                    <h1>اتاق‌های موجود</h1>
                    {itemDate.roomsCouldBeReserved &&
                      itemDate.roomsCouldBeReserved.map(item => <p>{item}</p>)}
                  </div>
                )}
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
            <div>
              {item.status == "pending" && (
                <label>
                  اتاق انتخابی:
                  <input
                    value={this.state.roomIdToReserve}
                    name="roomToReserve"
                    onChange={room =>
                      this.setState({ roomIdToReserve: room.target.value })
                    }
                  />
                </label>
              )}
            </div>

            <button onClick={() => this.reservSession(item.id)}>
              رزرو جلسه
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
