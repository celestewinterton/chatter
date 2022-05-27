import { useState, useEffect } from "react";
import { Modal } from '../../../context/Modal'
import GroupForm from "../GroupForm";

function CreateGroupModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            <ul className='create-group'
            >
                Direct Messages <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>
            </ul>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <GroupForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateGroupModal;
