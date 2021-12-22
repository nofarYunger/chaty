import React, { useContext } from "react";

import { Channel, MessageTeam, useChatContext } from "stream-chat-react";
import { AppContext } from "../pages/ChatApp";

import { ChannelInner, CreateChannel, EditChannel } from "./";

const ChannelContainer = () => {
  const { isCreating, isEditing, setIsEditing } = useContext(AppContext);

  if (isCreating) {
    return (
      <div className="channel-container">
        <CreateChannel />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel-container">
        <EditChannel />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty-container">
      <p>This is the beginning of your chat history.</p>
      <p>Send messages, attachments, links, emojis, and more!</p>
    </div>
  );

  return (
    <div className="channel-container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, idx) => (
          <MessageTeam key={idx} {...messageProps} />
        )}
      >
        <ChannelInner  />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
