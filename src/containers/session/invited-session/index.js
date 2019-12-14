import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SessionCard from "./session-card";

const InvitedSession = props => (
    <div>
        <p>
            <SessionCard/>
            <SessionCard/>
            <SessionCard/>
        </p>
    </div>
);

const mapStateToProps = ({ }) => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvitedSession)