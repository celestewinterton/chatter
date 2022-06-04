import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGroupRoom, editGroupRoom } from "../../../store/chatRooms";
import { loadUsers } from "../../../store/users";
import SearchAutocomplete from "./Autocomplete";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client'


let socket;
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
    const [demErrors, setDemErrors] = useState([]);
    const [members, setMembers] = useState('')
    const [storage, setStorage] = useState([]);



    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data;
        const formData = new FormData();
        edit = true

        if (edit) {
            formData.append('members', members)
            formData.append('user_id', sessionUser.id)
            data = await dispatch(editGroupRoom(formData, singleGroupId))
            socket = io()
            socket.emit('create-group', { 'user': 'whatever' })
        } else {
            data = await dispatch(createGroupRoom(formData))
        }

        if (data.errors) {
            alert(data.errors)
        } else {
            setShowModal(false);
        }
    }

    useEffect(() => {
        console.log('rerender')
        setStorage(storage)
    }, [storage]);
    const handleCancelClick = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };



    return (
        <form autoComplete="off" className="edit-group-form-container" onSubmit={handleSubmit}>
            <div className='group-errors'>
                {demErrors.length > 0 && <p className='group-errors'>Error : {demErrors}</p>}
            </div>
            <h1 className="edit-groups-title" >{singleGroupName.filter(user => user != sessionUser.username).join(", ")}</h1>
            <div className='channel-form-input-container'>
                <SearchAutocomplete members={members} setMembers={setMembers} />
            </div>
            <div className="buttons-center-container">
                <button className='cancel-btn grey-button' onClick={handleCancelClick}>Cancel</button>
                <button className='green-button' type="submit">{(edit) ? 'Add People' : 'Start DM'}</button>
            </div>

            <ul>
                {singleGroupName.map((user, idx) => (
                    <li key={idx} >
                        <div className="edit-group-from-users">
                            <img className="side-nav-img" src="https://user-images.githubusercontent.com/96894806/170845227-028c8ef0-17a6-4b92-a334-038e4f6a469b.png" />
                            <div>{user}</div>
                        </div>
                    </li>
                ))}
            </ul>


        </form>
    );
};

export default EditGroupForm;
