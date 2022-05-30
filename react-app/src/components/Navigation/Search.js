import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { loadUsers } from "../../store/users";


function Search() {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.all)
  const users = useSelector(state => state.users)
  const usersArray = Object.values(users)
  const items = Object.values(channels).concat(Object.values(users))

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch]);

  const handleOnSelect = (item) => {
    console.log(item, item.id);
    // setMembers(item.id)
  };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className="result-wrapper">
        <img className='result-image' src={item?.image ? item.image : null} alt=''></img>
        <span className="result-span">id: {item.id}</span>
        <span className="result-span">username: {item.username}</span>
        {/* <span className="result-span">name: {item.name}</span> */}

      </div>
    );
  };

  return (
    <div className="search-container">
      <ReactSearchAutocomplete
        items={items}
        fuseOptions={{ keys: ["username", "name"] }} // Search on both fields
        resultStringKeyName="username" // String to display in the results
        showIcon={true}
        placeholder={'Search for channels or users'}
        onSelect={handleOnSelect}
        styling={{
          height: "26px",
          borderRadius: "6px",
          border: "1px solid #504e52",
          backgroundColor: "#d1d2d333",
          color: "#d1d2d3",
          boxShadow: "none",
          hoverBackgroundColor: "steelblue",
          clearIconMargin: "3px 8px 0 0",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default Search;
