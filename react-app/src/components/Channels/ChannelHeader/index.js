import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { DarkModal } from '../../../context/Modal'

const ChannelHeader = ({ all, single, channel, modal }) => {
    const allChannels = useSelector(state => state.channels.all)
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            {all &&
                <>
                    <div className="channel-header">
                        <h1 className="channel-title">Channel Browser</h1>
                    </div>
                    <div className="channel-search-container muted">
                        <h1>{allChannels && Object.keys(allChannels).length} channels</h1>
                    </div>
                </>

            }
            {single &&
                <div className="channel-header">
                    <h1 className={(channel?.owner_id === user?.id) ? 'channel-title-auth' : "channel-title"} onClick={modal}># {channel?.name}</h1>
                    <div className="member-count" onClick={() => setShowModal(true)}>members {channel?.users.length}</div>
                </div>}

            {showModal && (
                <DarkModal onClose={() => setShowModal(false)}>
                    <>
                        <h1>{channel.name}</h1>
                        <ul>{channel.users.map((user, idx) =>
                            <li className="users-list-item" key={idx}><img className="user-image-nav-2" src={user?.photo} alt=""></img>{user?.username}</li>
                        )}</ul>
                    </>
                </DarkModal>)}
        </>
    )

}

export default ChannelHeader
