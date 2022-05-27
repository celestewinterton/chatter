import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRooms } from "../../store/chatRooms"
import ChannelCard from "./ChannelCard"


const Channels = ({ all, user }) => {
    const dispatch = useDispatch()
    const allChannels = useSelector(state => state.chatRooms.channels.all)
    useEffect(() => {
        dispatch(getRooms('channels'))
    })


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