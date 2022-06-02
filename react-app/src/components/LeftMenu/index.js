import CreateChannelModal from "../Channels/CreateChannelModal"
import Channels from "../Channels"
import CreateGroupModal from "../Groups/CreateGroupModal"
import Groups from "../Groups"
import { NavLink } from "react-router-dom"
import "./LeftMenu.css"
import { useState, useEffect } from "react"
import { DarkModal } from '../../context/Modal'
import ChannelForm from "../Channels/ChannelForm";


const LeftMenu = () => {
    const [showChannels, setShowChannels] = useState(true)
    const [showGroups, setShowGroups] = useState(true)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => setShowModal(false);
    }, []);

    return (
        <>
            <div className="left-navigation-menu">
                <div className="left-menu-header">
                    <NavLink className="unset" to={`/`}>
                        <h1 className="left-menu-title">chatter</h1>
                    </NavLink>
                    <NavLink className='left-navigation-icon' to='/groups/new'>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </NavLink>
                </div>
                <div className="channel-container">
                    <div className="left-menu-label">
                        <button className='left-menu-button unset' onClick={e => showChannels ? setShowChannels(false) : setShowChannels(true)}>
                            <i className="fa-solid fa-caret-down" style={showChannels ? null : { transform: "rotate(270deg)" }}></i>Channels
                        </button>
                        <i className="fas fa-plus" onClick={() => setShowModal(true)}></i>
                        {showModal && (
                            <DarkModal onClose={() => setShowModal(false)}>
                                <ChannelForm setShowModal={setShowModal} />
                            </DarkModal>
                        )}
                    </div>
                    {showChannels && <Channels user={true} />}
                    <div className='grey-hover'>
                        {showChannels &&
                            <NavLink className='left-menu-add' to='/'>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                Browse Channels
                            </NavLink>}
                    </div>
                </div>
                <div className="instant-message-container">
                    {/* <CreateGroupModal /> */}
                    <div className="left-menu-label">
                        <button className='left-menu-button unset' onClick={e => showGroups ? setShowGroups(false) : setShowGroups(true)}>
                            <i className="fa-solid fa-caret-down" style={showGroups ? null : { transform: "rotate(270deg)" }}></i>Direct Messages
                        </button>
                        <NavLink className='unset' to={`/groups/new`}><i className="fas fa-plus"></i></NavLink>
                    </div>
                    {showGroups && <Groups all={true} />}
                    <div className='grey-hover'>
                        {showGroups &&
                            <NavLink className='left-menu-add' to='/groups/new'>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                Add Teammates
                            </NavLink>}
                    </div>
                </div>
            </div>
        </>
    )
}



export default LeftMenu
