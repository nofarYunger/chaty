import React, { useContext } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { AppContext } from "../pages/ChatApp";

const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();
  
  const { setIsCreating, setIsEditing, setActiveChannel, setToggleContainer } =
    useContext(AppContext);

  const ChannelPreview = () => (
    <p className="channel-preview-item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userId
    );

    return (
      <div className="channel-preview-item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.name}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };

  return (
    <div
      className={
        "channel-preview-wrapper" && channel?.id === activeChannel?.id
          ? "selected"
          : ""
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer(false);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
