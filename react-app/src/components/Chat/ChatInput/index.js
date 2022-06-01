import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const ChatInput = ({ value, onChange, send, group, room }) => {
    let users;
    if (group) {
        users = room.users.map(user => user.username).join(', ')
    } else {
        users = room?.name
    }
    const toolbarOptions = [['bold', 'italic', 'strike'], ['link'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote'], ['code', 'codeblock']];
    const modules = {
        'toolbar': toolbarOptions,
    }

    return (
        <>
            <div className='chat-input'>
                <ReactQuill value={value}
                    modules={modules}
                    placeholder={(group) ? "Message " + users : "Message " + users}
                    theme='snow'
                    onChange={onChange} />
                <div className='button-div'>
                    <button className='send-button' onClick={send}><i className="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </>
    )
}

export default ChatInput