import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill'
import { io } from 'socket.io-client';
import { loadChatMessages, clearMessages } from '../../store/messages'
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';


let socket;

const Chat = ({ group }) => {
    let type = group ? 'groups' : 'channels'
    let chatMessages;
    let chatRoom;
    let roomId;
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();
    const groupRooms = useSelector(state => state.chatRooms);
    const channelRooms = useSelector(state => state.channels)
    const user = useSelector(state => state.session.user);
    const stateMessages = useSelector(state => state.messages);
    chatMessages = Object.values(stateMessages)


    if (group) {
        chatRoom = groupRooms.subscribed[id];
        roomId = 'g' + id
    } else {
        chatRoom = channelRooms.subscribed[id];
        roomId = 'c' + id
    }






    const sendChat = async (e) => {
        e.preventDefault();
        socket.emit('chat', {
            user: `${user.username}`, userId: `${user.id}`, msg: messageBody, room: roomId, user_image: user.photo, created_at: (new Date()).toLocaleTimeString()
        });
        // const errors = await dispatch(createChatMessage(roomId, messageBody));
        setMessageBody("");
    };




    useEffect(() => {
        if (group) {
            dispatch(loadChatMessages(id, type))
        } else {
            dispatch(loadChatMessages(id, type))
        }

    }, [roomId, dispatch])





    useEffect(() => {
        socket = io();

        socket.emit('join', { 'username': `${user.username}`, 'room': roomId });


        socket.on('chat', (message) => {
            setMessages(messages => [...messages, message]);
        });

        socket.on('edit', (message) => {
            dispatch(loadChatMessages(id, type))
        })

        socket.on('join', (data) => {
            console.log(data)
        })




        return (() => {
            socket.emit('leave', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
            dispatch(clearMessages())
            setMessages([]);

            socket.disconnect();
        })
    }, [roomId, user.firstName, user.lastName, dispatch]);


    return (
        <>
            <div className='chat-room-container'>
                <div className='chat-messages-container'>
                    {chatMessages?.map(msg => {
                        return (
                            <div className='chat-message' id={msg.owner} key={msg.id}>
                                <p className='chat-username'>{msg.user.username}<span className='created-at-msg'>{(new Date(msg.created_at)).toLocaleTimeString()}</span></p>
                                <div className='chat-text' id={msg.id}>
                                    <ChatMessage msg={msg} socket={socket} roomId={roomId} />
                                </div>
                            </div>
                        )

                    })}
                    {messages?.map((message, idx) => (
                        <div
                            className={message.user === 'weStudy-Bot' ? 'center chat-msg' : message.user === user.username ? 'right chat-msg' : 'left chat-msg'}
                            key={idx}>
                            {message.user !== 'weStudy-Bot' &&
                                <div className='profile-pic-div chat-profile-pic'>
                                    <img src={message.user_image} alt={message.user}></img>
                                </div>
                            }
                            <div className='chat-message'>
                                <p className='chat-username'>{message.user}<span className='created-at-msg'>{message.created_at}</span></p>
                                <div className='chat-text' id={message.id} dangerouslySetInnerHTML={{ __html: message.msg }}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='message-editor' id='editor'>
                    <ChatInput value={messageBody} onChange={(e) => setMessageBody(e)} send={sendChat} />
                </div>
            </div>
        </>
    )
}


export default Chat;
