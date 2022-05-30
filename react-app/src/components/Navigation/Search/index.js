import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useEffect } from "react";
import { loadUsers } from "../../../store/users";

const Search = ({query, setQuery, setSearchResults}) => {
  const users = useSelector(state => state.users)
  const channels = useSelector(state => state.channels.all)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch]);

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
        <ul>{userResults.length ? userResults.map(user =>
          <li key={`search-card-${user.id}`}>
            <div className='search-results-item'>
              <img className='side-nav-img' src={user?.image ? user.image : "https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png"} alt=''></img>
              <NavLink className='search-result-text' to={`/`} onClick={e => {
                setSearchResults(false)
                setQuery('')
                }}>
                {formatResult(`${user?.username}`)}
              </NavLink>
            </div>
          </li>)
        : null}</ul>
        <ul>{channelResults.length ? channelResults.map(channel =>
          <li key={`search-card-${channel.id}`}>
            <div className='search-results-item'>
              <NavLink className='search-result-text' to={`/channels/${channel.id}`} onClick={e => {
                setSearchResults(false)
                setQuery('')
                }}>
                {formatResult(`# ${channel?.name}`)}
              </NavLink>
            </div>
          </li>)
        : null}</ul>
    </div>
  )
}

export default Search;
