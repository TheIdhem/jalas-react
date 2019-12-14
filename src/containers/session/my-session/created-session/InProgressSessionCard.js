import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const InProgressSessionCard = props => (
    <div>
        <p>
            <button onClick={() => props.inProgressSessionPage()}>
                ویرایش جلسه
            </button>
        </p>
    </div>
);

const mapStateToProps = ({ }) => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            inProgressSessionPage: () => push('/in-progress-session')
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InProgressSessionCard)