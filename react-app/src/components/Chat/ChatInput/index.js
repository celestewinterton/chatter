import ReactQuill from 'react-quill'

const ChatInput = ({ value, onChange, send }) => {

    return (
        <>
            <div className='chat-input'>
                <ReactQuill value={value}
                    onChange={onChange} />
                <button onClick={send}>Send</button>
            </div>
        </>
    )
}

export default ChatInput