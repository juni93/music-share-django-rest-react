import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import RoomCreate from "./RoomCreate";


const Room = (props) => {

    const [roomDetails, setRoomDetails] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
        showSettings: false,
    });
    const roomCode = (props.match.params.roomCode);
    const history = useHistory();

    const getRoomDetails = async () => {
        const response = await fetch(`/api/v0/get-room?roomCode=${roomCode}`);
        if(!response.ok) {
            props.leaveRoomCallback();
            props.history.push("/");
        }else{
            const roomJson = await response.json();
            setRoomDetails({
                votesToSkip: roomJson.votes_to_skip,
                guestCanPause: roomJson.guest_can_pause,
                isHost: roomJson.is_host,
            });
        };
    };

    const handleLeaveRoom = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/v0/leave-room", requestOptions).then((_response) => {
            props.leaveRoomCallback();
            props.history.push("/");
        });
    }

    useEffect(() => {
        getRoomDetails();
    }, []);

    const updateShowRoomSettings = (value) => {
        setRoomDetails({...roomDetails, showSettings: value});
    }

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <RoomCreate
                        update={true}
                        votesToSkip={roomDetails.votesToSkip}
                        guestCanPause={roomDetails.guestCanPause}
                        roomCode={roomCode}
                        updateCallback={getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => updateShowRoomSettings(false)}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    };

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateShowRoomSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
          );
    }

   
    return (
        <>
        {roomDetails.showSettings && renderSettings()};
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {roomDetails.votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {`${roomDetails.guestCanPause ? 'Yes' : 'No'}`}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {`${roomDetails.isHost ? 'Yes' : 'No'}`}
                </Typography>
            </Grid>
            {roomDetails.isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLeaveRoom}
                >
                    Leave Room
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default Room;