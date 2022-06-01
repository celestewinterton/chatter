import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const ChatInput = ({ value, onChange, send }) => {

    const toolbarOptions = [['bold', 'italic', 'strike'], ['link'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote'], ['code', 'codeblock']];
    const modules = {
        'toolbar': toolbarOptions,
    }

    return (
        <>
            <div className='chat-input'>
                <ReactQuill value={value}
                    modules={modules}
                    theme='snow'
                    onChange={onChange} />
                <button onClick={send}>Send</button>
            </div>
        </>
    )
}

export default ChatInput