import { useContext } from "react";
import UserContext from "../components/UserContext";

const UserInfo = () => {
  const { user, signOut } = useContext(UserContext);

  return (
    <div className="user-info">
      <p>
        Hello, <strong>{user}</strong>
      </p>
      <p>Welcome to our app</p>
      <button className="btn" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;
