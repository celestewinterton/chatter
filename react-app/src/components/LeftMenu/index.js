import CreateChannelModal from "../Channels/CreateChannelModal"
import Channels from "../Channels"
import CreateGroupModal from "../Groups/CreateGroupModal"
import Groups from "../Groups"

const LeftMenu = () => {
    return (
        <>
            <div className="left-navigation-menu">
                <div className="channel-container">
                    <CreateChannelModal />
                    <Channels user={true} />
                </div>
                <div className="instant-message-container">
                    <CreateGroupModal />
                    <Groups all={true} />
                </div>
            </div>
        </>
    )
}

export default LeftMenu