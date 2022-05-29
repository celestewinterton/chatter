import ChatInput from "../ChatInput"
import Parser from 'html-react-parser';
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ msg, socket, roomId }) => {
    const user = useSelector(state => state.session.user);
    const [edit, setEdit] = useState(false)
    const [message, setMessageBody] = useState(msg.message)

    const editMessage = async (e, msgId) => {
        e.preventDefault()
        console.log(msgId)
        console.log(message)
        socket.emit('edit', {
            user: `${user.username}`, userId: `${user.id}`, msgId: msgId, msg: message, room: roomId, created_at: (new Date()).toLocaleTimeString()
        });
        setEdit(false)
    }

    return (
        <>
            {(edit) ? <ChatInput value={message} onChange={(e) => setMessageBody(e)} send={(e) => editMessage(e, msg.id)} /> : Parser(msg.message)}
            {(!edit) ? <button onClick={(e) => setEdit(true)}>Edit</button> : null}
        </>
    )
}

export default ChatMessage