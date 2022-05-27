import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRooms } from "../../store/chatRooms"
import ChannelCard from "./ChannelCard"


const Channels = ({ all, user }) => {
    const dispatch = useDispatch()
    const allChannels = useSelector(state => state.chatRooms.channels.all)
    const channelsArray = Object.values(allChannels)
    console.log(allChannels)


    useEffect(() => {
        getRooms('channels')
    }, [dispatch, allChannels])

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
