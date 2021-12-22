import React, { useContext, useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import ChatIcon from "../assets/imgs//chatIcon.png";
import LogoutIcon from "../assets/imgs/logout.png";
import { authService } from "../services/authService";
import { AppContext } from "../pages/ChatApp";

const SideBar = ({ onLogout }) => (
  <div className="channel-list-sidebar">
    <div className="icon-container">
      <div className="icon grid-center">
        <img src={ChatIcon} alt="ChatIcon" width="25" />
      </div>
    </div>
    <div className="icon-container logout">
      <div className="icon grid-center" onClick={onLogout}>
        <img src={LogoutIcon} alt="Logout" width="25" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list-header">
    <p className="text">Chaty</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

function ChannelListContent() {
  const { client } = useChatContext();

  const filters = { members: { $in: [client.userID] } };

  const onLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <>
      <SideBar onLogout={onLogout} />
      <div className="list-wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          preview={(preivewProps) => (
            <TeamChannelPreview {...preivewProps} type="team" />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          preview={(preivewProps) => (
            <TeamChannelPreview {...preivewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
}

const ChannelListContainer = () => {
  const { toggleContainer, setToggleContainer } = useContext(AppContext);

  return (
    <>
      <div className="channel-list-container">
        <ChannelListContent />
      </div>

      <div
        className="channel-list-container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#ffeb3b",
        }}
      >
        <div
          className="channel-list-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent />
      </div>
    </>
  );
};

export default ChannelListContainer;
