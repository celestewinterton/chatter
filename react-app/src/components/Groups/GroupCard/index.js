import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGroupRoom } from "../../../store/chatRooms";
import { useState } from "react";
import { Modal } from "../../../context/Modal"

const GroupCard = ({ group }) => {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const users = group.users.filter(user => user.username)
    const usernames = users.map(user => user.username)
    const filtered = usernames.includes(sessionUser.username)
    const dispatch = useDispatch()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const deleteGroup = () => {
        dispatch(deleteGroupRoom(group.id))
        setShowDeleteModal(false)
        history.push('/')
    }

    return (
        <>

            <div>{filtered ?
                <NavLink className="groups-nav" to={`/groups/${group.id}`}>
                    <img className="side-nav-img" src="https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png" />
                    <div>{usernames.filter(user => user != sessionUser.username).join(", ")}
                        <i className="fas fa-xmark" onClick={() => setShowDeleteModal(true)}></i>
                    </div>

                </NavLink> : null}
                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <h1>Are you sure you want to delete this chatting room?</h1>
                        <button onClick={deleteGroup}>Yes</button>
                        <button onClick={() => setShowDeleteModal(false)}>No</button>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default GroupCard
