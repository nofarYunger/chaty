import React, { useContext, useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";
import { AppContext } from "../pages/ChatApp";

import { ChannelInfo } from "../assets/imgs";

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = () => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();
  const { setIsEditing } = useContext(AppContext);

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <div className="name-wrapper">
          {members.map(({ user }, i) => (
            <div key={i} className="name-multi">
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={32}
              />
              <p className="name user">{user.fullName || user.id}</p>
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className="name user">and {additionalMembers} more</p>
          )}
        </div>
      );
    }

    return (
      <div className="channel-wrapper">
        <p className="name"># {channel.data.name}</p>
        <span style={{ display: "flex" }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  return (
    <div className="team-channel-header-container">
      <MessagingHeader />
      <div className="right">
        <p className="right-text">{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  );
};

export default ChannelInner;
