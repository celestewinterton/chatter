import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewRoom } from "../../../store/chatRooms";
import { loadUsers } from "../../../store/users";

const GroupForm = ({ setShowModal, edit }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('')

    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch]);

    console.log("users =======> ", users)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        formData.append('name', name)
        formData.append('owner_id', user.id)


        if (edit) {
        } else {
            errors = dispatch(createNewRoom(formData))
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
                        placeholder='@somebody or somebody@example.com'></input>
                </div>
                <button disabled={Object.keys(errors).length > 0} id='create-group' type="submit">{(edit) ? 'Edit DM' : 'Start DM'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
};

export default GroupForm;
