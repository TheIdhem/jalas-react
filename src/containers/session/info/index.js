import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./../../../components/user";
import Option from "./../../../components/option";
import "bootstrap/dist/js/bootstrap.js";
import * as Network from "./../../../helpers/network";
import moment from "moment";

class SessionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null
    };
  }

  //   getSessionWithId = id => {
  //     // console.log(this.state.baseDatePrim, this.state.startTime);
  //     console.log("hahhahahahahaaaaa", this.props.match.params.id);
  //     Network.getRequest(
  //       "session/" + this.props.match.params.id,
  //       localStorage.getItem("accessToken")
  //     )
  //       .then(response => {
  //         console.log("/session/id");
  //         console.log(response);
  //         this.setState({ session: response });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

  //   componentDidMount() {
  //     console.log("OOOOMAAADAAAAAM");
  //     this.getSessionWithId();
  //   }

  render() {
    const { session } = this.state;
    // if (!session) return <div />;
    return <div>salam</div>;

    // return (
    //   <div>
    //     <div>
    //       <div>
    //         <div>
    //           {session && <h5 className="modal-title">{session.title}</h5>}
    //           <button
    //             type="button"
    //             className="close"
    //             data-dismiss="modal"
    //             aria-label="Close"
    //           >
    //             <span aria-hidden="true">&times;</span>
    //           </button>
    //         </div>
    //         <div className="modal-body">
    //           <div className="card border-dark mb-3 container">
    //             <div>
    //               <div className="form-group">
    //                 <label>عنوان</label>
    //                 <input
    //                   type="text"
    //                   className="form-control"
    //                   value={this.state.title}
    //                   id="inputAddress"
    //                   onChange={title =>
    //                     this.setState({ title: title.target.value })
    //                   }
    //                 />
    //               </div>
    //             </div>

    //             <div
    //               className="btn-group btn-group-toggle btn-group-vertical"
    //               data-toggle="buttons"
    //             >
    //               {session &&
    //                 session.sessionOptions &&
    //                 session.sessionOptions.map((itemDate, indexDate) => (
    //                   <Option
    //                     key={indexDate}
    //                     handleChangeForReserve={optionId =>
    //                       this.handleChangeForReserve(optionId)
    //                     }
    //                     sessionStatus={session.status}
    //                     option={itemDate}
    //                     handleRoomForReserv={roomId =>
    //                       this.handleRoomForReserv(roomId)
    //                     }
    //                   />
    //                 ))}
    //             </div>
    //             <hr />

    //             <div className="container">
    //               <div className="row">
    //                 {session &&
    //                   session.newUsers &&
    //                   session.newUsers.map((user, index) => (
    //                     <User user={user} key={index} />
    //                   ))}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default SessionInfo;
