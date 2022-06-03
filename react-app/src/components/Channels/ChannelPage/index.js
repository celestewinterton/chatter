import { useParams } from "react-router-dom"
import { Modal, DarkModal } from "../../../context/Modal"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteChannelRoom, getChannels, joinChannelRoom } from "../../../store/channels";
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
    const users = channel?.users
    // console.log('channel =====>', channel.owner_id)
    if (users) {

        for (let channelUser of users) {
            if (channelUser.username === user.username) {
                subscribed = true
            }
        }
    }

    const joinChannel = async (e) => {
        e.preventDefault()
        const roomId = 'c' + channel.id
        socket = io()
        socket.emit('join-channel', { 'username': `${user.username}`, 'room': roomId });
        await dispatch(joinChannelRoom(channel.id))
        await dispatch(getChannels())
        await dispatch(reloadCurrentUser(user.id))
    }

    const notJoin = async (e) => {
        e.preventDefault()
        history.push("/")
    }


    const editChannel = () => {
        setShowModal(true)
    }

    const deleteThisChannel = async () => {
        history.push('/')
        await dispatch(deleteChannelRoom(channel.id))
        await dispatch(getChannels())
        await dispatch(reloadCurrentUser(user.id))
        socket = io()
        socket.emit('delete-channel', { 'username': `${user.username}`, 'channelId': `${channel.id}` });
        setShowDeleteModal(false)
    }


    return (
        <>
            {showModal && user.id === channel.owner_id && (
                <DarkModal onClose={() => setShowModal(false)}>
                    <ChannelForm setShowModal={setShowModal} edit={true} channel={channel} setShowDeleteModal={setShowDeleteModal} />
                </DarkModal>
            )}

            {showDeleteModal && (
                <DarkModal onClose={() => setShowModal(false)}>
                    <h1>Are you sure you want to delete this channel?</h1>
                    <div className="buttons-right-container">
                        <button className="grey-button" onClick={() => setShowDeleteModal(false)}>No</button>
                        <button className="grey-button" onClick={deleteThisChannel}>Yes</button>
                    </div>
                </DarkModal>
            )}
            <ChannelHeader single={true} channel={channel} modal={() => setShowModal(true)} />
            < Chat subscribed={subscribed} />
            {!subscribed &&
                <div className="need-to-join">
                    {/* <div> */}
                        <p>You are not a member of this channel</p>
                    {/* </div> */}
                    <div>
                        <button className="joinchannel-button" onClick={joinChannel}>Join Channel</button>
                        <button className="joinchannel-button cancel" onClick={notJoin} >Cancel</button>
                    </div>
                </div>
            }
        </>
    )
}

export default ChannelPage
