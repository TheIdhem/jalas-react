import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SessionCreator from "./SessionCreator";

const NewSession = props => (
  <div>
    <p>
      <SessionCreator />
    </p>
    <button onClick={props.prevPage}>بازگشت به جلسات من</button>
  </div>
);

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      prevPage: () => push("/my-session")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NewSession);
