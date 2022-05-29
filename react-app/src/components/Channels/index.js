import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getChannels } from "../../store/channels"
import ChannelCard from "./ChannelCard"
import ChannelHeader from "./ChannelHeader"
import './Channels.css'


const Channels = ({ all, user, single }) => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const rooms = useSelector(state => state.channels)
    const channelsArray = Object.values(rooms.subscribed)
    const allChannelsArray = Object.values(rooms.all)
    const singleChannel = rooms.all[channelId]



    return (
        <>

            {user && channelsArray.map((channel, idx) => {
                return < ChannelCard key={idx} channel={channel} />
            })
            }
            {all && <ChannelHeader all={true} />}
            {all && <div className="channel-container">
                {allChannelsArray.map((channel, idx) => {
                    return < ChannelCard key={idx} channel={channel} all={true} />
                })}
            </div>}
            {single && <ChannelCard channel={singleChannel} single={true} />}
        </>
    )
}

export default Channels
