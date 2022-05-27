import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewRoom, getRooms } from "../../store/chatRooms";
import { loadUsers } from "../../store/users";


const Groups = ({ all }) => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.chatRooms.groupRooms.subscribed)
  useEffect(() => {
    dispatch(getRooms())
  }, [dispatch]);

  return (
      <>
          <h1>Groups</h1>
          {(all) ? <h1>Direct messages</h1> : <h1>User messages</h1>}
      </>
  )
}

export default Groups

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './Groups.css'

// const Groups = () => {
//   const [loaded, setLoaded] = useState(false);
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user)

//   return (
//     <div className="group-container">
//       <div className="group-headers">
//         <div className="group-header-1">
//           <div>John Smith</div>
//           <div>Members</div>
//         </div>
//         <div className="group-header-2">
//           <div>+ Add a bookmark</div>
//           <div></div>
//         </div>
//       </div>
//       <div className="group-message-history">Display messages here...
//       {/* <div>{messages?.map(message => message)}</div> */}
//         <div>Example message </div>
//         <div>Example message </div>
//         <div>Example message </div>
//         <div>Example message </div>
//         <div>Example message </div>
//         <div>Example message </div>
//       </div>
//       <div className="group-message-form">New message field</div>
//     </div>
//   )
// }

// export default Groups
