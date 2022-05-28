import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getChannels } from "../../store/channels"
import ChannelCard from "./ChannelCard"


const Channels = ({ all, user }) => {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.channels)
    const channelsArray = Object.values(rooms.subscribed)


    return (
        <>
            {user && channelsArray.map((channel, idx) => {
                return < ChannelCard key={idx} channel={channel} />
            })
            }
        </>
    )
}

export default Channels
