import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const GroupCard = ({ group }) => {
    const sessionUser = useSelector(state => state.session.user)
    const users = group.users.filter(user => user.username)
    const usernames = users.map(user => user.username)
    const filtered = usernames.includes(sessionUser.username)

    return (
        <div>{filtered ?
            <NavLink className="groups-nav" to={`/groups/${group.id}`}>
                <img className="side-nav-img" src="https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png" />
                <div>{usernames.filter(user => user != sessionUser.username).join(", ")}</div>
            </NavLink> : null}
        </div>
    )
}

export default GroupCard
