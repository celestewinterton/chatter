import { Modal } from "../../../context/Modal"
import { useState } from "react";
import ChannelForm from "../ChannelForm"
const ChannelCard = ({ channel }) => {
    const [showModal, setShowModal] = useState(false);

    const editChannel = () => {
        setShowModal(true)
    }

    const deleteChannel = () => {

    }


    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChannelForm setShowModal={setShowModal} edit={true} channel={channel} />
                </Modal>
            )}
            <p>{channel.name}<i className="fa-solid fa-pen-to-square" onClick={editChannel}></i><i className="fas fa-minus" onClick={deleteChannel}></i></p>
        </>
    )
}

export default ChannelCard