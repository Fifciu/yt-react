import React from "react";
import classes from "./Header.module.css";
import YtLogo from '@/components/YtLogo';
import DesktopSearch from '@/components/DesktopSearch';
import SearchIcon from "@/components/icons/SearchIcon";
import { Link } from "react-router";
import { UIContext } from "../context/UIContext";
import HamburgerIcon from "../icons/HamburgerIcon";

function Header() {
  const { setIsMobileSearchOpen } = React.useContext(UIContext);

  return (
    <div className={classes.header}>
      <Link to="/app" className={classes.logoSection}>
        <button className={classes.desktopHamburgerIcon}><HamburgerIcon /></button>
        <div className={classes.logoWrapper}>
          <YtLogo />
        </div>
      </Link>
      <button className={classes.mobileSearchIconWrapper} onClick={() => setIsMobileSearchOpen(true)}>
        <SearchIcon/>
      </button>
      <DesktopSearch />
      <div>Right panel</div>
    </div>
  );
}

export default Header;
