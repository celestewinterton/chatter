import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getChannels } from "../../store/channels"
import ChannelCard from "./ChannelCard"
import ChannelHeader from "./ChannelHeader"
import './Channels.css'


const Channels = ({ all, user, single }) => {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.channels)
    const subbedChannels = useSelector(state => state.session.user)
    const channelsArray = Object.values(rooms.subscribed)
    const subscribedChannelsArray = subbedChannels.subscribed_channels
    const allChannelsArray = Object.values(rooms.all)


    return (
        <>

            {user && subscribedChannelsArray.map((channel, idx) => {
                return < ChannelCard key={idx} channel={channel} nav={true} />
            })
            }
            {all && <ChannelHeader all={true} />}
            {all && <div className="channel-container">
                {allChannelsArray.map((channel, idx) => {
                    return < ChannelCard key={idx} channel={channel} all={true} />
                })}
            </div>}
            {single && <ChannelCard channel={rooms} single={true} />}
        </>
    )
}

export default Channels
