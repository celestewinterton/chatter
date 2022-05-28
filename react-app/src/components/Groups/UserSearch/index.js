import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Search = ({query, setQuery, setSearchResults}) => {
  const users = useSelector(state => state.users)

  const userResults = Object.values(users)?.filter(
    user => user?.username?.toLowerCase().includes(query?.toLowerCase())
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
            <div className='search-results-li'>
              <img className='search-results-image' src={user?.image ? user.image : null} alt=''></img>
              <NavLink className='unset link search-result-text' to={`/events/${user}`} onClick={e => {
                setSearchResults(false)
                setQuery('')
                }}>
                {formatResult(`${user?.username}`)}
              </NavLink>
            </div>
          </li>)
        : <div>No Items</div>}</ul>
    </div>
  )
}

export default Search;
