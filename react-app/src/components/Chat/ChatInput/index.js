import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const ChatInput = ({ value, onChange, send, group, room, errors }) => {
    let users;
    if (group) {
        users = room.users.map(user => user.username).join(', ')
    } else {
        users = room?.name
    }
    const toolbarOptions = [['bold', 'italic', 'strike'], ['link'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote']];
    const modules = {
        'toolbar': toolbarOptions,
        keyboard: {
            bindings: {
                shift_enter: {
                    key: 13,
                    shiftKey: true,
                    handler: (range, ctx) => {
                        console.log(range, ctx); // if you want to see the output of the binding
                    }
                },
                enter: {
                    key: 13,
                    handler: () => send()
                }
            }
        }
    }


    return (
        <>
            <div className='chat-input'>
                <ReactQuill value={value}
                    modules={modules}
                    placeholder={(errors) ? errors : (group) ? "Message " + users : "Message #" + users}
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