import React from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

class DatePickerTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "flex-end",
          alignContent: "center",
          alignSelf: "center",
          height: "100%"
        }}
      >
        <div>
          <label>
            <DatePicker
              selected={this.props.baseDate}
              onChange={date => this.props.handleChangeDate(date)}
            />
            :تاریخ انتخابی
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <label>
            <TimePicker
              onChange={date => this.props.handleChangeStartDateTime(date)}
              value={this.props.startTime}
            />
            :ساعت شروع
          </label>
        </div>
        <div>
          <label>
            <TimePicker
              onChange={date => this.props.handleChangeEndDateTime(date)}
              value={this.props.endTime}
            />
            :ساعت پایان
          </label>
        </div>
      </div>
    );
  }
}

export default withRouter(DatePickerTemplate);
