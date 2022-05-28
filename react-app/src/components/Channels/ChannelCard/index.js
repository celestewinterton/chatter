import { Modal } from "../../../context/Modal"
import { useState } from "react";
import { useDispatch } from "react-redux";
import ChannelForm from "../ChannelForm"
import { getChannels, deleteChannelRoom } from "../../../store/channels";
const ChannelCard = ({ channel }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const editChannel = () => {
        setShowModal(true)
    }

    const deleteChannel = () => {
        dispatch(deleteChannelRoom(channel.id))
        dispatch(getChannels())
        setShowDeleteModal(false)
    }


    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChannelForm setShowModal={setShowModal} edit={true} channel={channel} />
                </Modal>
            )}
            {showDeleteModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h1>Are you sure you want to delete this channel?</h1>
                    <button onClick={deleteChannel}>Yes</button>
                    <button onClick={() => setShowDeleteModal(false)}>No</button>
                </Modal>
            )}
            <p>{channel.name}<i className="fa-solid fa-pen-to-square" onClick={editChannel}></i><i className="fas fa-minus" onClick={() => setShowDeleteModal(true)}></i></p>
        </>
    )
}

export default ChannelCard