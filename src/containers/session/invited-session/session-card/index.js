import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const SessionCard = props => (
    <div>
        <p>
            <button onClick={() => props.singleSessionPage()}>
                ورود به اطلاعات جلسه
            </button>
        </p>
    </div>
);

const mapStateToProps = ({ }) => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            singleSessionPage: () => push('/single-session')
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionCard)