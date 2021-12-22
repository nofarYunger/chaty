import React, { useRef, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { Auth, ChannelContainer, ChannelListContainer } from "../cmps";

import useTouch from "../cmps/UseTouch";

const apiKey = "7yg4xgu23a9f";

const cookies = new Cookies();

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

export const AppContext = React.createContext();

const ChatApp = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [createType, setCreateType] = useState("");
  const [toggleContainer, setToggleContainer] = useState(false);

  const appWrapper = useRef(null);

  // opens and closes the sidemenu on swipe
  useTouch(appWrapper, (direction) => {
    if (direction === "right") setToggleContainer(true);
    if (direction === "left") setToggleContainer(false);
  });

  const state = {
    isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
    createType,
    setCreateType,
    toggleContainer,
    setToggleContainer,
  };

  if (!authToken) return <Auth />;

  return (
    <AppContext.Provider value={state}>
      <div ref={appWrapper} className="chat-app flex">
        <Chat client={client} theme="team light">
          <ChannelListContainer />
          <ChannelContainer />
        </Chat>
      </div>
    </AppContext.Provider>
  );
};
export default ChatApp;
