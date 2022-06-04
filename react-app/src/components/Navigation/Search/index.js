import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useEffect } from "react";
import { loadUsers } from "../../../store/users";

import { useHistory, useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { getChannels, joinChannelRoom, leaveChannelRoom } from "../../../store/channels";
import { reloadCurrentUser } from "../../../store/session";


let socket;

const Search = ({query, setQuery, setSearchResults}) => {
  const sessionUser = useSelector(state => state.session.user)
  const users = useSelector(state => state.users)
  const channels = useSelector(state => state.channels.all)
  const groups = useSelector(state => state.chatRooms.subscribed)
  const subscribedGroups = Object.values(groups)?.filter(group => group.users.map(user => user.username).includes(sessionUser.username))
  const dispatch = useDispatch()

  const subbedChannels = sessionUser.subscribed_channels
  const history = useHistory()

  const joinChannel = async (e, channel) => {
      e.preventDefault()
      const roomId = 'c' + channel.id
      socket = io()
      socket.emit('join-channel', { 'username': `${sessionUser.username}`, 'room': roomId });
      await dispatch(joinChannelRoom(channel.id))
      await dispatch(getChannels())
      await dispatch(reloadCurrentUser(sessionUser.id))
      history.push(`/channels/${channel.id}`)
  }

  const leaveChannel = async (e, channel) => {
      await dispatch(leaveChannelRoom(channel.id))
      await dispatch(getChannels())
      await dispatch(reloadCurrentUser(sessionUser.id))
      history.push('/')
  }

  const checkChannels = (id) => {
      for (let channel of subbedChannels) {
          if (channel.id === id) {
              return false
          }
      }
      return true
  }


  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch]);

  const groupResults = subscribedGroups.filter(
    group => ((group?.users?.filter(user => user.id != sessionUser.id)).map(user => user.username).join(", ")).toLowerCase().includes(query?.toLowerCase())
  )

  const userResults = Object.values(users)?.filter(
    user => user?.username?.toLowerCase().includes(query?.toLowerCase())
  );

  const channelResults = Object.values(channels)?.filter(
    channels => channels?.name?.toLowerCase().includes(query?.toLowerCase())
  );

  const formatResult = result => {
    const index = result.toUpperCase().indexOf(query?.toUpperCase());
    const len = query.length;

    const subStringOne = result.slice(0, index);
    const match = result.slice(index, index + len);
    const subStringTwo = result.slice(index+len);

    return (
      <span>{subStringOne}<span className='match'>{match}</span>{subStringTwo}</span>
    )
  }

  return (
    <div className='search-results'
      onClick={e=>e.stopPropagation()}>

        {/* Use this section if we make user profile pages */}
        {/* <ul>{userResults.length ? userResults.map(user =>
          <li key={`search-card-${user.id}`}>
            <div className='search-results-item blue-hover'>
              <img className='side-nav-img' src={user?.image ? user.image : "https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png"} alt=''></img>
              <NavLink className='search-result-text' to={`/`} onClick={e => {
                setSearchResults(false)
                setQuery('')
                }}>
                {formatResult(`${user?.username}`)}
              </NavLink>
            </div>
          </li>)
        : null}</ul> */}

        <ul>{groupResults.length ? groupResults.map(group =>
          <li key={`search-card-${group.id}`}>
            <div className='search-results-item blue-hover'>
              <div className='search-img-and-name'>
                <img className='side-nav-img' src={group.users[0]?.image ? group.users[0]?.image : "https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png"} alt=''></img>
                <NavLink className='search-result-text' to={`/groups/${group.id}`} onClick={e => {
                  setSearchResults(false)
                  setQuery('')
                  }}>
                  {formatResult(`${group?.users?.filter(user => user.id != sessionUser.id).map(user => user.username).join(", ")}`)}
                </NavLink>
              </div>
            </div>
          </li>)
        : null}</ul>

        <ul>{channelResults.length ? channelResults.map(channel =>
          <li key={`search-card-${channel.id}`}>
            <div className='search-results-item blue-hover'>
              <NavLink className='search-result-text' to={`/channels/${channel.id}`} onClick={e => {
                setSearchResults(false)
                setQuery('')
                }}>
                {formatResult(`# ${channel?.name}`)}
              </NavLink>
              {checkChannels(channel.id) && <button className="green-button" onClick={(e) => joinChannel(e, channel)}>Join</button>}
              {!checkChannels(channel.id) && <button className="grey-button" onClick={(e) => leaveChannel(e, channel)}>Leave</button>}
            </div>
          </li>)
        : null}</ul>
    </div>
  )
}

export default Search;
