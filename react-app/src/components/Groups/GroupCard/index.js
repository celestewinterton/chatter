import { useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGroupRoom } from "../../../store/chatRooms";
import { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal"


const GroupCard = ({ group, all, single, modal, nav }) => {
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state => state.chatRooms.subscribed)
    const { groupId } = useParams()
    // if (single) group = Object.values(groups)?.find(group => group.id == groupId)
    const params = useParams()
    const singleGroupId = params.id
    const singleGroupName = Object.values(groups)?.find(group => group.id == singleGroupId)?.users?.map(user => user?.username)
    const usernames = group?.users?.map(user => user?.username)
    const filtered = usernames?.includes(sessionUser?.username)
    const groupName = usernames?.filter(user => user != sessionUser.username).join(", ")
    const history = useHistory()
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const users = group.users.filter(user => user.username)
>>>>>>> dfbdf86 (fixing merge conflicts)
=======
>>>>>>> befa05e (moves some things around in groups to match channels logic)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log("GROUPCARD ===> ", single, all)
>>>>>>> dfbdf86 (fixing merge conflicts)
=======
>>>>>>> befa05e (moves some things around in groups to match channels logic)
=======
    console.log("==========> ",  singleGroupName, groupId)
>>>>>>> 1108619 (groups title showing on single group page again)
=======
    console.log("==========> ",  singleGroupName, singleGroupId, groupId)
>>>>>>> b4c041d (updated model for group cascade delte)

    const deleteGroup = () => {
        dispatch(deleteGroupRoom(group.id))
        console.log("Deleteing ===>", group.id)
        setShowDeleteModal(false)
        history.push('/')
    }

    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <>
            <div>{filtered && nav ?
<<<<<<< HEAD
=======
        <div>
            {filtered && nav ?
>>>>>>> dfbdf86 (fixing merge conflicts)
=======
        <>
            <div>{filtered && nav ?
>>>>>>> befa05e (moves some things around in groups to match channels logic)
            <NavLink className="groups-nav" to={`/groups/${group.id}`}>
                <img className="side-nav-img" src="https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png" />
                <div>
=======
            <NavLink className="groups-nav grey-hover" to={`/groups/${group.id}`}>
                <div className="groups-nav-name">
                    <img className="side-nav-img" src="https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png" />
>>>>>>> 42eb557 (fixing up left navbar)
                    <div>{groupName}</div>
                </div>
                <div>
                    <i className="fas fa-xmark" onClick={() => setShowDeleteModal(true)}></i>
                </div>
            </NavLink> : null}


            {single &&
            <div className="groups-header">
<<<<<<< HEAD
                <h1 className="groups-title" onClick={modal}>{groupName}</h1>
<<<<<<< HEAD
            </div>
            }

                {showDeleteModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <h1>Are you sure you want to delete this chatting room?</h1>
                        <button onClick={deleteGroup}>Yes</button>
                        <button onClick={() => setShowDeleteModal(false)}>No</button>
                    </Modal>
                )}
=======
>>>>>>> dfbdf86 (fixing merge conflicts)
=======
                <h1 className="groups-title" onClick={modal}>{singleGroupName.filter(user => user != sessionUser.username).join(", ")}</h1>
>>>>>>> 1108619 (groups title showing on single group page again)
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
