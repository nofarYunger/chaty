import React, { useContext, useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import { ResultsDropdown } from ".";
import { AppContext } from "../pages/ChatApp";
import { SearchIcon } from "../assets/imgs";

function ChannelSearch() {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);
const { setToggleContainer } = useContext(AppContext);
  useEffect(() => {
    if (!query) {
      setDirectChannels([]);
      setTeamChannels([]);
    }
  }, [query]);

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });
      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels?.length) setTeamChannels(channels);
      if (users?.length) setDirectChannels(users);
    } catch (error) {
      setQuery("");
      console.log({ error });
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  return (
    <div className="channel-search__container flex center-center">
      <div className="input-wrapper">
        <div className="input-icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          isLoading={isLoading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
}

export default ChannelSearch;
