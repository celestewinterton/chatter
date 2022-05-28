

const GroupCard = ({ group }) => {
    const users = group.users.filter(user => user.username)

    return (
        <div>
            <div>{users.length ? users.map((user, i) => user.username + ((users.length - 1 == i) ? "" : ", ")) : ""}</div>
        </div>
    )
}

export default GroupCard
