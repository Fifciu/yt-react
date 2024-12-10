import React from "react";
import classes from "./ToolBar.module.css";
import ToolBarTile from "../ToolBarTile/ToolBarTile";
import SearchIcon from '@/components/icons/SearchIcon';
import HomeIcon from "@/components/icons/HomeIcon";
import ShortsIcon from "@/components/icons/ShortsIcon";
import SubscriptionsIcon from "@/components/icons/SubscriptionsIcon";
import ProfileIcon from "../icons/ProfileIcon";
import { UserContext } from "../context/UserContext";

function ToolBar() {
  const userData = React.useContext(UserContext);
  const userAvatar = userData.items?.[0]?.snippet?.thumbnails?.default?.url;

  return (
    <div className={classes.toolbar}>
      <ToolBarTile href="/app" iconActive={<HomeIcon isActive={true}/>} iconInactive={<HomeIcon />}>Home</ToolBarTile>
      <ToolBarTile href="/app/shorts" iconActive={<ShortsIcon />} iconInactive={<ShortsIcon />}>Shorts</ToolBarTile>
      <ToolBarTile href="/app/subscriptions" iconActive={<SubscriptionsIcon isActive={true} />} iconInactive={<SubscriptionsIcon />}>Subscriptions</ToolBarTile>
      <ToolBarTile href="/app/me" isAvatar={true}iconActive={<ProfileIcon isActive={true} photoSrc={userAvatar} />} iconInactive={<ProfileIcon photoSrc={userAvatar} />}>Me</ToolBarTile>
    </div>
  );
}

export default ToolBar;
