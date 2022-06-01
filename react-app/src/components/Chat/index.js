import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill'
import { io } from 'socket.io-client';
import { loadChatMessages, clearMessages, removeMessage } from '../../store/messages'
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './Chat.css'
import ChatUserCard from './ChatUserCard';


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
        if (messageBody !== '') {
            socket.emit('chat', {
                user: `${user.username}`, userId: `${user.id}`, msg: messageBody, room: roomId, user_image: user.photo, created_at: (new Date()).toLocaleTimeString()
            });
            setMessageBody("");
        } else {
            setMessageBody('Message cannot be empty, please input a message')
        }
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
            dispatch(loadChatMessages(id, type))
        });

        socket.on('edit', (message) => {
            dispatch(loadChatMessages(id, type))
        })

        socket.on('delete', (message) => {
            dispatch(removeMessage(message.msgId))
        })

        socket.on('join-channel', (data) => {
            console.log(data)
        })




        return (() => {
            socket.emit('leave', { 'username': `${user.firstName} ${user.lastName}`, 'room': roomId });
            dispatch(clearMessages())
            setMessages([]);

            socket.disconnect();
        })
    }, [roomId, user.firstName, user.lastName, dispatch]);
    console.log(chatMessages)


    return (
        <>
            <div className='hope-this-works'>

                <div className='outer-chat-container'>
                    <div className='chat-room-container'>
                        <div className='chat-messages-container'>
                            {chatMessages?.map(msg => {
                                return (
                                    <div className='chat-message' id={msg.owner} key={msg.id}>
                                        <div className='pic-container'>
                                            <ChatUserCard msg={msg} />
                                        </div>
                                        <p className='chat-username'>{msg.user.username}<span className='created-at-msg'>{(new Date(msg.created_at)).toLocaleTimeString()}</span></p>
                                        <div className='chat-text' id={msg.id}>
                                            <ChatMessage msg={msg} socket={socket} roomId={roomId} userId={user.id} />
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='message-editor' id='editor'>
                <ChatInput value={messageBody} onChange={(e) => setMessageBody(e)} send={sendChat} />
            </div>
        </>
    )
}


export default Chat;
