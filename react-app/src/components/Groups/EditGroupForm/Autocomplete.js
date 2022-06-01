import React from "react";
import { useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from "react-search-autocomplete";


function SearchAutocomplete({ members, setMembers }) {
    const users = useSelector(state => state.users)
    const usersArr = Object.values(users)
    // To Do:
    // allow user to autofill multiple users
    // Search for existing groups with same users, pull up that thread

    const handleOnSelect = (item) => {
        console.log(item, item.id);
        setMembers(item.id)
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
        <div>
            <ReactSearchAutocomplete
                items={usersArr}
                fuseOptions={{ keys: ["username"] }} // Search on both fields
                resultStringKeyName="username" // String to display in the results
                showIcon={false}
                placeholder={'<i class="fa fa-search"></i> Find members'}
                onSelect={handleOnSelect}
                styling={{
                    borderRadius: "5px",
                    backgroundColor: "#1a1d21",
                    border: "2px solid #d1d2d3",
                    color: "#d1d2d3",
                    boxShadow: "none",
                    hoverBackgroundColor: "steelblue",
                    clearIconMargin: "3px 8px 0 0",
                    zIndex: 2,
                    height: "38px",
                }}
            />
        </div>
    );
}

export default SearchAutocomplete;
