import { useSelector } from "react-redux"

const ChannelHeader = ({ all, single, channel, modal }) => {
    const allChannels = useSelector(state => state.channels.all)

    return (
        <>
            {all &&
                <>
                    <div className="channel-header">
                        <h1 className="channel-title">Channel Browser</h1>
                    </div>
                    <div className="channel-search-container muted">
                        <h1>{allChannels && Object.keys(allChannels).length} channels</h1>
                    </div>
                </>

            }
            {single &&
                <div className="channel-header">
                    <h1 className="channel-title" onClick={modal}># {channel?.name}</h1>

                </div>}
        </>
    )

}

export default ChannelHeader
