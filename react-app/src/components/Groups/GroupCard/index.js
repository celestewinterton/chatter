import { useSelector } from "react-redux";


const GroupCard = ({ group }) => {
    const currentUser = useSelector(state => state.session.user)
    const users = group.users.filter(user => user.username)
    const usernames = users.map(user => user.username)
    const filtered = usernames.includes(currentUser.username)

    return (
        <div>
            <div>{filtered ? users[0].image + usernames.join(", ") : null}</div>
        </div>
    )
}

export default GroupCard
