import React from "react";
import classes from "./Header.module.css";
import YtLogo from '@/components/YtLogo';
import SearchIcon from "@/components/icons/SearchIcon";
import { Link } from "react-router";

function Header() {
  return (
    <div className={classes.header}>
      <Link to="/app">
        <YtLogo />
      </Link>
      <div className={classes.searchIconWrapper}>
        <SearchIcon />
      </div>
    </div>
  );
}

export default Header;
