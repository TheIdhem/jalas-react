import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const MySession = props => (
    <div>
        <p>
            <button className="btn btn-info" onClick={() => props.newSessionPage()}>
                ساخت جلسه جدید
            </button>
        </p>
        <p>
            <button className="btn btn-dark" onClick={() => props.createdSessionPage()}>
                جلسات ایجادشده توسط من
            </button>
        </p>
    </div>

);

const mapStateToProps = ({ }) => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            newSessionPage: () => push('/new-session'),
            createdSessionPage: () => push('/created-session')
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySession)