import React, { useState } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

const SearchBar = ({ callBackFunc }) => {
  const [value, setValue] = useState("");

  let timeout;

  const handleValueChange = e => {
    setValue(e.target.value);
    // we need to have some delay in this function because it will fire every time user will enter a word
    //1. Clear Time out
    // 2. New Timeout
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callBackFunc(value);
    }, 500);
    // here will call out call back function from parent and pass the search phrase
  };

  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search"
            value={value}
            onChange={handleValueChange}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
