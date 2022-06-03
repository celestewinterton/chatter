
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ChannelForm from "../ChannelForm"
import { io } from 'socket.io-client';
import { getChannels, deleteChannelRoom, joinChannelRoom, leaveChannelRoom, socketUpdateChannels } from "../../../store/channels";
import { NavLink } from "react-router-dom";
import ChannelHeader from "../ChannelHeader";
import Chat from "../../Chat";
import { reloadCurrentUser } from "../../../store/session";

let socket;
const ChannelCard = ({ channel, single, nav }) => {
    const user = useSelector(state => state.session.user)
    const subbedChannels = user.subscribed_channels
    const dispatch = useDispatch()
    const history = useHistory()


    const joinChannel = async (e) => {
        e.preventDefault()
        const roomId = 'c' + channel.id
        socket = io()
        socket.emit('join-channel', { 'username': `${user.username}`, 'room': roomId });
        socket.emit('update-channel', { 'username': `${user.username}` })
        await dispatch(joinChannelRoom(channel.id))
        await dispatch(socketUpdateChannels())
        await dispatch(reloadCurrentUser(user.id))
        history.push(`/channels/${channel.id}`)
    }

    const leaveChannel = async () => {
        socket = io()
        socket.emit('update-channel', { 'username': `${user.username}` })
        await dispatch(leaveChannelRoom(channel.id))
        await dispatch(socketUpdateChannels())
        await dispatch(reloadCurrentUser(user.id))
        history.push('/')
    }

    const checkChannels = (id) => {
        for (let channel of subbedChannels) {
            if (channel.id === id) {
                return false
            }
        }
        return true
    }




    return (
        <>


            {!single && !nav &&
                <>
                    <div className="channel-card app-body-hover">
                        <NavLink className="unset" to={`/channels/${channel.id}`}>
                            <div className="channel-information">
                                <h1 className="channel-card-name bold"># {channel.name}</h1>
                                <h1 className="channel-users">{channel.users.length} members</h1>
                            </div>
                        </NavLink>
                        <div className="channel-buttons">
                            <button className="view-channel-button" onClick={(e) => history.push(`/channels/${channel.id}`)}>View</button>
                            {checkChannels(channel.id) && <button className="join-channel-button" onClick={(e) => joinChannel(e)}>Join</button>}
                            {!checkChannels(channel.id) && <button className="leave-channel-button view-channel-button" onClick={(e) => leaveChannel(e)}>Leave</button>}
                        </div>
                    </div>
                </>
            }
            {nav && <NavLink className="channel-nav" to={`/channels/${channel.id}`}><h1 className="channel-card-name grey-hover nav-overflow"># {channel.name}</h1></NavLink>}
        </>
    )
}

export default ChannelCard
