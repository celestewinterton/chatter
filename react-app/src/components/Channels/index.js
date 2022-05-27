


const Channels = ({ all }) => {


    return (
        <>
            <h1>Channels</h1>
            {(all) ? <h1>All channels</h1> : <h1>User Channels</h1>}
        </>
    )
}

export default Channels