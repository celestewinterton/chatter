import { useParams } from "react-router-dom"
import { Modal } from "../../../context/Modal"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteChannelRoom, getChannels } from "../../../store/channels";
import { reloadCurrentUser } from "../../../store/session";
import { io } from 'socket.io-client'
import ChannelForm from "../ChannelForm";
import ChannelHeader from "../ChannelHeader";
import Chat from "../../Chat";

let socket;
const ChannelPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { id } = useParams()
    const channel = useSelector(state => state.channels.all[id])


    const editChannel = () => {
        setShowModal(true)
    }

    const deleteChannel = async () => {
        await dispatch(deleteChannelRoom(channel.id))
        await dispatch(getChannels())
        await dispatch(reloadCurrentUser(user.id))
        socket = io()
        socket.emit('delete-channel', { 'username': `${user.username}` });
        history.push('/')
        setShowDeleteModal(false)
    }


    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChannelForm setShowModal={setShowModal} edit={true} channel={channel} setShowDeleteModal={setShowDeleteModal} />
                </Modal>
            )}
            {showDeleteModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h1>Are you sure you want to delete this channel?</h1>
                    <button onClick={deleteChannel}>Yes</button>
                    <button onClick={() => setShowDeleteModal(false)}>No</button>
                </Modal>
            )}
            <ChannelHeader single={true} channel={channel} modal={() => setShowModal(true)} />
            <Chat />
        </>
    )
}

export default ChannelPage