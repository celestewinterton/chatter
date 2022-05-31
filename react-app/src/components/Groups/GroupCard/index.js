import { useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGroupRoom } from "../../../store/chatRooms";
import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal"
import GroupsPage from "../GroupsPage";

const GroupCard = ({ group, all, single, modal, nav }) => {
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state => state.chatRooms.subscribed)
    const params = useParams()
    const singleGroupId = params.id
    const singleGroupName = Object.values(groups)?.find(group => group.id == singleGroupId)?.users?.map(user => user?.username)
    const usernames = group?.users?.map(user => user?.username)
    const filtered = usernames?.includes(sessionUser?.username)
    const groupName = usernames?.filter(user => user != sessionUser.username).join(", ")

    const history = useHistory()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const deleteGroup = () => {
        dispatch(deleteGroupRoom(group.id))
        setShowDeleteModal(false)
        history.push('/')
    }

    return (
        <>
            <div>{filtered && nav ?
                <NavLink className="groups-nav grey-hover" to={`/groups/${group.id}`}>
                    <div className="groups-nav-name">
                        <img className="side-nav-img" src="https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png" />
                        <div>{groupName}</div>
                    </div>
                    <div>
                        <i className="fas fa-xmark" onClick={() => setShowDeleteModal(true)}></i>
                    </div>
                </NavLink> : null}


                {single &&
                    <div className="groups-header">
                        {/* <h1 className="groups-title" onClick={modal}>{singleGroupName.filter(user => user != sessionUser.username).join(", ")}</h1> */}
                        <GroupsPage />
                    </div>
                }


                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <h1>Are you sure you want to delete this message thread?</h1>
                        <button onClick={deleteGroup}>Yes</button>
                        <button onClick={() => setShowDeleteModal(false)}>No</button>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default GroupCard
