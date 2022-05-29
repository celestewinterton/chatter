import { Modal } from "../../../context/Modal"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ChannelForm from "../ChannelForm"
import { getChannels, deleteChannelRoom, joinChannelRoom } from "../../../store/channels";
import { NavLink } from "react-router-dom";
import ChannelHeader from "../ChannelHeader";
const ChannelCard = ({ channel, single }) => {
    const dispatch = useDispatch()
    const history = useHistory()
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

    const joinChannel = (e) => {
        e.preventDefault()
        dispatch(joinChannelRoom(channel.id))
        history.push(`/channels/${channel.id}`)
    }

    console.log(channel)


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

            {single && <ChannelHeader single={true} channel={channel} modal={() => setShowModal(true)} />}
            {!single && <NavLink to={`/channels/${channel.id}`}>
                <div className="channel-card">
                    <div className="channel-information">
                        <h1 className="channel-card-name">#{channel.name}</h1>
                        <h1 className="channel-users">{channel.users.length} members</h1>
                    </div>
                    <div className="channel-buttons">
                        <button className="view-channel-button">View</button>
                        <button className="join-channel-button" onClick={(e) => joinChannel(e)}>Join</button>
                    </div>

                </div></NavLink>
            }

        </>
    )
}

export default ChannelCard