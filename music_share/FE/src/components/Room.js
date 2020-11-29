import React, { useState, useEffect } from "react";


const Room = (props) => {

    const [roomDetails, setRoomDetails] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false
    });
    const roomId = (props.match.params.roomId)

    const getRoomDetails = async () => {
        const response = await fetch(`/api/v0/get-room?roomId=${roomId}`);
        const roomJson = await response.json();
        console.log(roomJson);
        setRoomDetails({
            votesToSkip: roomJson.votes_to_skip,
            guestCanPause: roomJson.guest_can_pause,
            isHost: roomJson.is_host,
        })
    };

    useEffect(() => {
        getRoomDetails();
    }, [])

    return (
        <div>
            <h3>{roomId}</h3>
            <p>votesToSkip: {roomDetails.votesToSkip}</p>
            <p>guestoCanPause: {`${roomDetails.guestCanPause ? 'Yes' : 'No'}`}</p>
            <p>isHost: {roomDetails.isHost ? 'Yes' : 'No'}</p>
        </div>
    )
}

export default Room;