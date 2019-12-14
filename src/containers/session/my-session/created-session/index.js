import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InProgressSessionCard from "./InProgressSessionCard";

const CreatedSession = props => (
    <div>
        <p>
            <InProgressSessionCard />
            <InProgressSessionCard />
            <InProgressSessionCard />
        </p>
        <button onClick={props.prevPage}>
            بازگشت به جلسات من
        </button>
    </div>

);

const mapStateToProps = ({ }) => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            prevPage: () => push('/my-session')
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatedSession)