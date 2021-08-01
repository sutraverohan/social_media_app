import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import SearchField from "react-search-field";
import { useHistory } from "react-router";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history= useHistory();
  const dumusername = useRef();
  const handle = ()=>{
    localStorage.removeItem("user");
    window.location.reload();
  }
  const handler = (event)=>{
    console.log(dumusername);
      history.push("/profile/"+dumusername.current.value);
      event.preventDefault();
      window.location.reload();
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">UrMedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
      <form onSubmit={handler} className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            type="text"
            ref= {dumusername}
          />
          <input
            type="submit"
            style={{display: "none"}}
          />

        </form>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          
          <Link to="/" style={{ textDecoration: "none" , color: "white"}}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <button onClick={handle} className="topbarLink">LogOut</button>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}