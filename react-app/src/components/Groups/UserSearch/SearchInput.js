import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Search from '.';

function SearchInput(){
  // const users = group.users.filter(user => user.username)
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(false);

  useEffect(() => {
  if (!query.length) return setSearchResults(false);
  setSearchResults(true)
  }, [query])

  return (
    <div>
      {<div>
        <input
          className='search-input'
          placeholder='@somebody (Search)'
          value={query}
          onChange={e=>setQuery(e.target.value)}
          onClick={e => e.stopPropagation}/>
          {searchResults && <Search query={query} setQuery={setQuery} setSearchResults={setSearchResults}/>}
      </div>}
    </div>
  )
}

export default SearchInput;
