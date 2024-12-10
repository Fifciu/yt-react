import React from "react";
import classes from "./MobileSearch.module.css";
import ArrowIcon from "../icons/ArrowIcon";
import SearchIcon from "../icons/SearchIcon";

function MobileSearch() {
  return (
    <div className={classes.search}>
      <button className={classes.searchCloseBtn}><ArrowIcon /></button>
      <div className={classes.searchWrapper}>
        <input type="search" placeholder="Search in YouTube"/>
        <button><span><SearchIcon /></span></button>
      </div>
      <button><ArrowIcon /></button>
    </div>
  );
}

export default MobileSearch;
