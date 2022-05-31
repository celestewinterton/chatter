import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGroupRooms } from "../../../store/chatRooms";
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal'
import EditGroupForm from "../EditGroupForm"

const GroupsPage = ({ groupName }) => {
    const dispatch = useDispatch()
    const { groupId } = useParams()

    const user = useSelector(state => state.session.user)
    const groups = useSelector(state => state.chatRooms.subscribed)

    const group = Object.values(groups).find(group => group.id == groupId)
    // const members = group.users.map(user => user.username)?.join(", ")
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    useEffect(() => {
        dispatch(getGroupRooms())
    }, [dispatch]);

    return (
        <div className="app-body">
            <div className="groups-header">
                <h1 className="groups-title">members</h1>
                <h1 className="groups-title">{groupName}</h1>
                <p>Add People
                   <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>
                </p>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditGroupForm setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </div>
    )
}


export default GroupsPage
