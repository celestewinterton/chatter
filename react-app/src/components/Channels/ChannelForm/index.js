import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import channelsReducer, { createChannelRoom, editChannelRoom, getChannels, leaveChannelRoom } from "../../../store/channels";
import { reloadCurrentUser } from "../../../store/session";
import { io } from 'socket.io-client'

let socket;
const ChannelForm = ({ setShowModal, edit, channel, setShowDeleteModal }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [name, setName] = useState((edit) ? channel.name : '')
    const [topic, setTopic] = useState((edit) ? channel.topic : '')
    const [description, setDescription] = useState((edit) ? channel.description : '')
    const { id } = useParams()
    const channels = useSelector(state => state.channels.all[id])
    // const channels = Object.values(channelsObj)
    console.log('channel =====>', channels?.owner_id)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('name', name)
        formData.append('topic', topic)
        formData.append('description', description)
        formData.append('owner_id', user.id)


        if (edit) {
            errors = await dispatch(editChannelRoom(formData, channel.id))
        } else {
            errors = await dispatch(createChannelRoom(formData))
            socket = io()
            socket.emit('create-channel', { 'user': user.username })
        }

        if (errors) {
            setErrors(errors.errors)
        } else {
            await dispatch(reloadCurrentUser(user.id))
            setShowModal(false);
        }
        

    }

    const deleteChannel = () => {
        setShowDeleteModal(true)
    }

    const leaveChannel = async () => {
        await dispatch(leaveChannelRoom(channel.id))
        await dispatch(getChannels())
        await dispatch(reloadCurrentUser(user.id))
        history.push('/')
    }

    const handleCancelClick = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };


    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <>
            {(edit) ? <h1>Edit a Channel</h1> : <h1>Create a Channel</h1>}
            <form autoComplete="off" className="channel-form-container" onSubmit={handleSubmit}>
                <div className='channel-form-input-container'>
                    <div className='form-element-container'>
                        <div className="form-errors">
                            {errors.name && <p>{errors.name}</p>}
                        </div>
                        <input
                            type='text'
                            className="dark-input"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Channel Name'></input>
                    </div>

                    <div className='form-element-container'>
                        <div className="form-errors">
                            {errors.topic && <p>{errors.topic}</p>}
                        </div>
                        <input
                            className="dark-input"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            placeholder='Channel Topic'></input>
                    </div>
                    <div className='form-element-container'>
                        <textarea
                            className="dark-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Channel Description'></textarea>

                    </div>
                    <div className="buttons-right-container">
                        <button className='cancel-btn grey-button' onClick={handleCancelClick}>Cancel</button>
                        <button id='create-channel' className="green-button" type="submit">{(edit) ? 'Save' : 'Create Channel'}</button>
                    </div>
                    <div className="line channel-line">
                        {edit && <button className="leave-button grey-button" onClick={leaveChannel}>Leave Channel</button>}
                        {(edit) && user?.id === channels?.owner_id &&  <button className="delete-button grey-button" onClick={deleteChannel}>Delete Channel</button>
                        }
                    </div>
                </div>
            </form>
        </>
    );
};

export default ChannelForm;
