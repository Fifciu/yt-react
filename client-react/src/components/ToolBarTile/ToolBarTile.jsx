import React from "react";
import classes from "./ToolBarTile.module.css";
import { Link, useLocation } from "react-router";

function ToolBarTile({
  children,
  iconInactive,
  iconActive,
  href,
  isAvatar
}) {
  const location = useLocation();
  const isActive = location.pathname === href;
  const icon = isActive ? iconActive : iconInactive;

  const labelWrapperClassnames = `${classes.labelWrapper}${isAvatar ? ` ${classes.labelWrapperAvatar}` : ''}`;
  const iconClassnames = `${classes.icon}${isAvatar ? ` ${classes.iconAvatar}` : ''}`;

  return (
    <Link to={href} className={classes.tileWrapper}>
      <div className={labelWrapperClassnames}>
        <div className={iconClassnames}>
          {icon}
        </div>
        <p className={classes.label}>{children}</p>
      </div>
    </Link>
  )
}

export default ToolBarTile;
