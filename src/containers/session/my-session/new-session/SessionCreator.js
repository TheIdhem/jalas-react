import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";

class SessionCreator extends React.Component {
    state = {
        startDate: new Date(),
        time: '10:00',
    };

    render() {
        return (
            <div>
                <div>
                    <label>
                        تاریخ انتخابی:
                        <DatePicker
                            selected={this.state.startDate}
                            // onChange={}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        ساعت شروع:
                        <TimePicker
                            // onChange={this.onChange}
                            value={this.state.time}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        ساعت پایان:
                        <TimePicker
                            // onChange={this.onChange}
                            value={this.state.time}
                        />
                    </label>
                </div>
                <div>

                </div>
            </div>
        );
    }
}

export default SessionCreator
