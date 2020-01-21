import React, { Component } from "react";
import PropTypes from "prop-types";
import "./comment.css";
import * as Network from "../../helpers/network";
import { store } from "react-notifications-component";

class Comment extends Component {
  static propTypes = {
    id: PropTypes.number,
    senderId: PropTypes.number,
    sessionId: PropTypes.number,
    content: PropTypes.string,
    parentCommentId: PropTypes.string,
    replies: PropTypes.array,
    handleParent: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      showReplies: false,
      newReply: ""
    };
  }

  handleShowReplies = () => {
    this.setState(prevState => ({
      showReplies: !prevState.showReplies
    }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSendReply = () => {
    const content = this.state.newReply;
    const sessionId = this.props.sessionId;
    const parentCommentId = this.props.id;
    console.log("salam", this.props.sessionId);
    Network.fetchRequest(
      "/comment",
      {
        content: content,
        sessionId: sessionId,
        parentCommentId: parentCommentId
      },
      "POST",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        let comments = [];
        const objectArray = Object.entries(response);
        objectArray.forEach(([key, value]) => {
          comments.push(value);
        });
        this.props.handleParent(comments);
        store.addNotification({
          title: "replyCreation",
          message: "reply successful created",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "replyCreation",
          message: "reply creation got error",
          type: "danger",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
  };

  handleRemoveComment = () => {
    const commentId = this.props.id;
    Network.fetchRequest(
      "/comment/" + commentId,
      {},
      "DELETE",
      localStorage.getItem("accessToken")
    )
      .then(response => {
        let comments = [];
        const objectArray = Object.entries(response);
        objectArray.forEach(([key, value]) => {
          comments.push(value);
        });
        this.props.handleParent(comments);
        store.addNotification({
          title: "commentDelete",
          message: "comment successful deleted",
          type: "success",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(response);
      })
      .catch(err => {
        store.addNotification({
          title: "commentDelete",
          message: "comment deletion got error",
          type: "danger",
          // insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        console.log(err);
      });
  };

  render() {
    const senderId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const replies =
      this.props.replies &&
      this.props.replies.map(reply => {
        return (
          <Comment
            key={reply.id}
            senderId={reply.senderId}
            content={reply.content}
            id={reply.id}
            sessionId={this.props.sessionId}
            parentCommentId={reply.parentCommentId}
            replies={reply.replies}
            handleParent={this.props.handleParent}
          />
        );
      });
    return (
      <>
        <div className="comment">
          <div className="comment-sender">{username}</div>
          <div className="comment-content">{this.props.content}</div>
          <button type="button" onClick={() => this.handleShowReplies()}>
            نمایش پاسخ‌ها
          </button>
          {
            //todo (senderId === sessionOwner || senderId === this.props.senderId) &&
            <button type="button" onClick={() => this.handleRemoveComment()}>
              حذف پاسخ
            </button>
          }
        </div>
        {this.state.showReplies && (
          <>
            <div className="comment-replies">{replies}</div>
            <div className="reply-box">
              <input
                type="textarea"
                name="newReply"
                onChange={this.handleChange}
              />
              <button type="button" onClick={() => this.handleSendReply()}>
                ثبت پاسخ جدید
              </button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Comment;
