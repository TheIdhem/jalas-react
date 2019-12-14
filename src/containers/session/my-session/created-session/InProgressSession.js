import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TimeOption from "../../time-option";

const InProgressSession = props => (
    <div>
        <p>
            <TimeOption/>
            <TimeOption/>
            <TimeOption/>
        </p>
        <p>
            "لیست مدعوین"
        </p>
        <p>
            <button>
                تکمیل و اعلام جلسه به مدعوین
            </button>
        </p>
    </div>

);

const mapStateToProps = ({ }) => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            prevPage: () => push('/invited-session')
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InProgressSession)