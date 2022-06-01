import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getChannels } from "../../store/channels"
import ChannelCard from "./ChannelCard"
import ChannelHeader from "./ChannelHeader"
import ChannelPage from "./ChannelPage"
import './Channels.css'


const Channels = ({ all, user, single }) => {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.channels)
    const subbedChannels = useSelector(state => state.session.user.subscribed_channels)
    const channelsArray = Object.values(rooms.subscribed)
    const subscribedChannelsArray = Object.values(subbedChannels)
    const allChannelsArray = Object.values(rooms.all)

    return (
        <>

            {user && subscribedChannelsArray?.map((channel, idx) => {
                return < ChannelCard key={idx} channel={channel} nav={true} />
            })
            }
            {all && <ChannelHeader all={true} />}
            {all && <div className="channel-container">
                {allChannelsArray?.map((channel, idx) => {
                    return < ChannelCard key={idx} channel={channel} all={true} />
                })}
            </div>}
            {single && <ChannelPage />}
        </>
    )
}

export default Channels
