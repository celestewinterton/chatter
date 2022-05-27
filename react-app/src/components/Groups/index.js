import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Groups.css'

const Groups = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div className="group-container">
      <div className="group-headers">
        <div className="group-header-1">
          <div>John Smith</div>
          <div>Members</div>
        </div>
        <div className="group-header-2">
          <div>+ Add a bookmark</div>
          <div></div>
        </div>
      </div>
      <div className="group-message-history">Display messages here...
      {/* <div>{messages?.map(message => message)}</div> */}
        <div>Example message </div>
        <div>Example message </div>
        <div>Example message </div>
        <div>Example message </div>
        <div>Example message </div>
        <div>Example message </div>
      </div>
      <div className="group-message-form">New message field</div>
    </div>
  )
}

export default Groups
