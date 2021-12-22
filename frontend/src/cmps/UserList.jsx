import React, { useState, useEffect, Children } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets/imgs";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <div className="user-item-wrapper" onClick={handleSelected}>
      <div className="name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="name">{user.fullName || user.ids}</p>
        {selected ? <InviteIcon /> : <div className="invite-empty" />}
      </div>
    </div>
  );
};

function UserList({ setSelectedUsers }) {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const res = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (res.users.length) {
          setUsers(res.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setIsError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (isError) {
    return (
      <ListContainer>
        <div className="user-list-msg">
          Error loading , please refresh the page and try again.
        </div>
      </ListContainer>
    );
  }
  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list-msg">No users found.</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading && <div className="user-list-msg">Loading Users...</div>}

      {users?.map((user, idx) => (
        <UserItem
          index={idx}
          key={user.id}
          user={user}
          setSelectedUsers={setSelectedUsers}
        />
      ))}
    </ListContainer>
  );
}

export default UserList;
