import React from "react";
import { useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from "react-search-autocomplete";


function Search() {
  const users = useSelector(state => state.users)
  const usersArr = Object.values(users)


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
      </div>
    );
  };

  return (
    <div className="search-container">
      <ReactSearchAutocomplete
        items={usersArr}
        fuseOptions={{ keys: ["username"] }} // Search on both fields
        resultStringKeyName="username" // String to display in the results
        showIcon={true}
        placeholder={'Search for channels or users'}
        onSelect={handleOnSelect}
        styling={{
          // margin: "8px 0px",
          height: "26px",
          borderRadius: "6px",
          border: "1px solid #504e52",
          backgroundColor: "#d1d2d333",
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
