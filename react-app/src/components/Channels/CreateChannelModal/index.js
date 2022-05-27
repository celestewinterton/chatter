import { useState, useEffect } from "react";
import { Modal } from '../../../context/Modal'
import ChannelForm from "../ChannelForm";

function CreateChannelModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            <ul className='create-channel'
            >
                Channels <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>
            </ul>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChannelForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateChannelModal;