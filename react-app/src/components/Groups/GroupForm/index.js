import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGroupRoom, editGroupRoom } from "../../../store/chatRooms";
import { loadUsers } from "../../../store/users";
import SearchAutocomplete from "./Autocomplete";
import DropdownMultipleCombobox from "./Downshift";

const GroupForm = ({ setShowModal, edit, group }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [errors, setErrors] = useState({});
    const [members, setMembers] = useState((edit) ? group.members : '')//change later

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
            dispatch(editGroupRoom(formData, group.id))
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
        <form autoComplete="off" className="group-create-container" onSubmit={handleSubmit}>
            <div className='group-create-input-container'>
                <SearchAutocomplete members={members} setMembers={setMembers} />
                <DropdownMultipleCombobox  members={members} setMembers={setMembers}/>
                <button disabled={Object.keys(errors).length > 0} id='create-group' type="submit">{(edit) ? 'Edit DM' : 'Start DM'}</button>
                {/* <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button> */}
            </div>
        </form>
    );
};

export default GroupForm;
