import React from "react";
import classes from "./ToolBarTile.module.css";
import { Link, useLocation } from "react-router";

function ToolBarTile({
  children,
  iconInactive,
  iconActive,
  href
}) {
  const location = useLocation();
  const isActive = location.pathname === href;
  const icon = isActive ? iconActive : iconInactive;

  return (
    <Link to={href} className={classes.tileWrapper}>
      <div className={classes.labelWrapper}>
        <div className={classes.icon}>
          {icon}
        </div>
        <p className={classes.label}>{children}</p>
      </div>
    </Link>
  )
}

export default ToolBarTile;
