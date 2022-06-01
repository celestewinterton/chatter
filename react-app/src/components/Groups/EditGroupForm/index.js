import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGroupRoom, editGroupRoom } from "../../../store/chatRooms";
import { loadUsers } from "../../../store/users";
import SearchAutocomplete from "./Autocomplete";
import { useParams } from 'react-router-dom';
import './EditGroupForm.css'

const EditGroupForm = ({ setShowModal, edit, group }) => {
    edit = true
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const usersArr = Object.values(users)
    const params = useParams()
    const singleGroupId = params.id
    const groups = useSelector(state => state.chatRooms.subscribed)
    const singleGroupName = Object.values(groups)?.find(group => group.id == singleGroupId)?.users?.map(user => user?.username)
<<<<<<< HEAD
<<<<<<< HEAD
    const [errors, setErrors] = useState({});
    const [members, setMembers] = useState('')
=======
    // console.log("SSSSSS",singleGroupName)
    const [errors, setErrors] = useState({});
    const [members, setMembers] = useState('')//change later
>>>>>>> 52a9a16 (aedit GrouCard and GroupsPage and add EditGroupForm components)
=======
    const [errors, setErrors] = useState({});
    const [members, setMembers] = useState('')
>>>>>>> 63a6566 (eadd edit groups reducer in chatRooms store)


    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
<<<<<<< HEAD
<<<<<<< HEAD
=======
        edit = true
>>>>>>> 52a9a16 (aedit GrouCard and GroupsPage and add EditGroupForm components)
=======
>>>>>>> 63a6566 (eadd edit groups reducer in chatRooms store)

        if (edit) {
            formData.append('members', members)
            formData.append('user_id', sessionUser.id)
            dispatch(editGroupRoom(formData, singleGroupId))
        } else {
            errors = await dispatch(createGroupRoom(formData))
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
        <form autoComplete="off" className="edit-group-form-container" onSubmit={handleSubmit}>
            <h1 className="groups-title" >{singleGroupName.filter(user => user != sessionUser.username).join(", ")}</h1>
            <div className='channel-form-input-container'>
                <SearchAutocomplete members={members} setMembers={setMembers} />
            </div>
            <div className="buttons-right-container">
                <button className='cancel-btn grey-button' onClick={handleCancelClick}>Cancel</button>
                <button disabled={Object.keys(errors).length > 0} className='green-button' type="submit">{(edit) ? 'Add People' : 'Start DM'}</button>
            </div>

            <ul>
                {singleGroupName.map((user,idx) => (
                    <li key={idx}>
                        <img className="side-nav-img" src="https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png" />
                        {user}
                    </li>
                ))}
            </ul>


        </form>
    );
};

export default EditGroupForm;
