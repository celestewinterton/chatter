import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewRoom } from "../../../store/chatRooms";

const ChannelForm = ({ setShowModal, edit }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('')
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')



    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user.id)
        let errors;
        const formData = new FormData();
        formData.append('name', name)
        formData.append('topic', topic)
        formData.append('description', description)
        formData.append('owner_id', user.id)


        if (edit) {
        } else {
            errors = dispatch(createNewRoom(formData, 'channels'))

        }

        if (errors) {
            console.log(errors)
        }


        setShowModal(false);

    }


    const handleCancelClick = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };


    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form autoComplete="off" className="channel-form-container" onSubmit={handleSubmit}>
            <div className='channel-form-input-container'>

                <div className='form-element-container'>
                    <input
                        type='text'
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Channel Name'></input>
                </div>

                <div className='form-element-container'>
                    <input
                        className="input-field"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder='Channel Topic'></input>
                </div>
                <div className='form-element-container'>
                    <textarea
                        className="input-field"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Channel Description'></textarea>
                </div>
                <button disabled={Object.keys(errors).length > 0} id='create-channel' type="submit">{(edit) ? 'Edit Channel' : 'Create Channel'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
};

export default ChannelForm;