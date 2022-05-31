import CreateChannelModal from "../Channels/CreateChannelModal"
import Channels from "../Channels"
import CreateGroupModal from "../Groups/CreateGroupModal"
import Groups from "../Groups"
import { NavLink } from "react-router-dom"
import "./LeftMenu.css"


const LeftMenu = () => {


    return (
        <>
            <div className="left-navigation-menu">
                <div className="left-menu-header">
                    <NavLink className="unset" to={`/`}>
                        <h1 className="left-menu-title">Chatter</h1>
                    </NavLink>
                </div>
                <div className="channel-container">
                    <CreateChannelModal />
                    <Channels user={true} />
                </div>
                <div className="instant-message-container">
                    {/* <CreateGroupModal /> */}
                    <NavLink className='create-group unset' to={`/groups/new`}>
                        Direct Messages <i className="fas fa-plus"></i>
                    </NavLink>
                    <Groups all={true} />
                </div>
            </div>
        </>
    )
}

export default LeftMenu
