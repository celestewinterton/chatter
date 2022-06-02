import { useParams } from "react-router-dom"
import { Modal, DarkModal } from "../../../context/Modal"
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
    let subscribed = false;
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { id } = useParams()
    const channel = useSelector(state => state.channels.all[id])
    const users = channel.users
    for (let channelUser of users) {
        if (channelUser.username === user.username) {
            subscribed = true
        }
    }


    const editChannel = () => {
        setShowModal(true)
    }

    const deleteChannel = async () => {
        history.push('/')
        await dispatch(deleteChannelRoom(channel.id))
        await dispatch(getChannels())
        await dispatch(reloadCurrentUser(user.id))
        socket = io()
        socket.emit('delete-channel', { 'username': `${user.username}` });
        setShowDeleteModal(false)
    }


    return (
        <>
            {showModal && (
                <DarkModal onClose={() => setShowModal(false)}>
                    <ChannelForm setShowModal={setShowModal} edit={true} channel={channel} setShowDeleteModal={setShowDeleteModal} />
                </DarkModal>
            )}
            {showDeleteModal && (
                <DarkModal onClose={() => setShowModal(false)}>
                    <h1>Are you sure you want to delete this channel?</h1>
                    <div className="buttons-right-container">
                        <button className="grey-button" onClick={() => setShowDeleteModal(false)}>No</button>
                        <button className="grey-button" onClick={deleteChannel}>Yes</button>
                    </div>
                </DarkModal>
            )}
            <ChannelHeader single={true} channel={channel} modal={() => setShowModal(true)} />
            < Chat subscribed={subscribed} />
        </>
    )
}

export default ChannelPage
