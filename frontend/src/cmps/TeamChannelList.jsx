import React, { useContext } from "react";
import { AppContext } from "../pages/ChatApp";
import { AddChannel } from "../assets/imgs";

function TeamChannelList({ children, error = false, loading, type }) {

  if (error) {
    if (type !== "team") return null;
    return (
      <div className="team-channel-list">
        <p className="message">
          Connection error , please wait a moment and try again.
        </p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="message loading">
          {type === "team" ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="header">
        <p className="title">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel type={type === "team" ? "team" : "messaging"} />
      </div>
      {children}
    </div>
  );
}

export default TeamChannelList;
