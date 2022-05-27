import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewRoom } from "../../../store/chatRooms";
import { loadUsers } from "../../../store/users";

const GroupForm = ({ setShowModal, edit, group }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [errors, setErrors] = useState({});
    const [members, setMembers] = useState((edit) ? group.members : '')//change later
    const groups = useSelector(state => state.chatRooms.groupRooms.subscribed)

    useEffect(() => {
        dispatch(loadUsers())

    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('members', members)
        formData.append('owner_id', user.id)


        if (edit) {
            dispatch(createNewRoom(formData, group.id,"groups"))
        } else {
            errors = dispatch(createNewRoom(formData))
            dispatch(createNewRoom(formData, "groups"))
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
                        value={members}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='@somebody or somebody@example.com'></input>
                </div>
                <button disabled={Object.keys(errors).length > 0} id='create-group' type="submit">{(edit) ? 'Edit DM' : 'Start DM'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
};

export default GroupForm;
