import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TimeOption from "../../../time-option";

const SingleSession = props => (
    <div>
        <p>
          <TimeOption/>
          <TimeOption/>
          <TimeOption/>
        </p>
        <button onClick={props.prevPage}>
             بازگشت به لیست جلسات دعوت‌شده
        </button>
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
)(SingleSession)