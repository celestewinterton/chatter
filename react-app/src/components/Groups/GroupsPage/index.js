import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGroupRooms } from "../../../store/chatRooms";
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal'
import EditGroupForm from "../EditGroupForm"

const GroupsPage = ({}) => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.chatRooms.subscribed)
    const params = useParams()
    const singleGroupId = params.id
    const singleGroupName = Object.values(groups)?.find(group => group.id == singleGroupId)?.users?.map(user => user?.username)
    const sessionUser = useSelector(state => state.session.user)


    // const group = Object.values(groups).find(group => group.id == groupId)
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
                <h1 className="groups-title" >{singleGroupName.filter(user => user != sessionUser.username).join(", ")}</h1>
                <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>

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
