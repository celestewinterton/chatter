import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGroupRoom, editGroupRoom } from "../../../store/chatRooms";
import { loadUsers } from "../../../store/users";
import SearchAutocomplete from "./Autocomplete";
import { useParams } from 'react-router-dom';

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
    const [errors, setErrors] = useState({});
    const [members, setMembers] = useState('')
    // console.log("SSSSSS",singleGroupName)


    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors;
        const formData = new FormData();
        edit = true

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

    const inputMembers = (e) => {
        const addedMember = e.target.value
        const addedMemberArr = addedMember?.split(" ")
        let addedMemberIdArr = []
        addedMemberArr?.forEach(member => {
            let memberObj = usersArr?.find(user => user?.username == member)
            if (memberObj) addedMemberIdArr.push(memberObj["id"])
        });
        console.log("????", addedMemberIdArr)
        setMembers(addedMemberIdArr.join(" "))
    }

    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form autoComplete="off" className="channel-form-container" onSubmit={handleSubmit}>
            <h1 className="groups-title" >{singleGroupName.filter(user => user != sessionUser.username).join(", ")}</h1>
            <div className='channel-form-input-container'>
                {/* <SearchAutocomplete members={members} setMembers={setMembers} /> */}
                <input
                    name="member"
                    type="text"
                    onChange={inputMembers}
                    placeholder="Find People"></input>
                <button disabled={Object.keys(errors).length > 0} id='create-group' type="submit">{(edit) ? 'Add People' : 'Start DM'}</button>
                <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
            </div>

            <ul>
                {usersArr.map(user => (
                    <li>
                        {user.username}
                    </li>
                ))}
                {/* {singleGroupName.map((user) => (
                    <li>
                        {user}
                    </li>
                ))} */}
            </ul>


        </form>
    );
};

export default EditGroupForm;
