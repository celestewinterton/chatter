import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRooms } from "../../store/chatRooms"
import ChannelCard from "./ChannelCard"


const Channels = ({ all, user }) => {
    const dispatch = useDispatch()
    const allChannels = useSelector(state => state.chatRooms.channels.all)

    const loadChannels = async () => {
        await dispatch(getRooms('channels'))
    }
    useEffect(() => {
       loadChannels()
    }, [])


    return (
        <>

            {user && Object.values(allChannels).map((channel) => {
                return < ChannelCard channel={channel} />
            })
            }
        </>
    )
}

export default Channels
