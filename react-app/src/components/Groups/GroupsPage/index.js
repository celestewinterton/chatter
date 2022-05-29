import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGroupRooms } from "../../../store/chatRooms";
import { useParams } from 'react-router-dom';


const GroupsPage = ({single}) => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    const user = useSelector(state => state.session.user)
    const groups = useSelector(state => state.chatRooms.subscribed)
    const group = Object.values(groups).find(group => group.id == groupId)
    const members = group.users.map(user => user.username)

    useEffect(() => {
        dispatch(getGroupRooms())
    }, [dispatch]);

    return (
        <div className="app-body">
            <div className="groups-header">
                <h1 className="groups-title">{members.join(", ")}</h1>
            </div>
        </div>
    )
}


export default GroupsPage
