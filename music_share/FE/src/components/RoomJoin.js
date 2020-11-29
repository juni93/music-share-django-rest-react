import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";


const RoomJoin = () => {
    const [roomCode, setRoomCode] = useState("");
    const [isError, setIsError] = useState("");
    const history = useHistory();


    const handleRoomJoin = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: roomCode,
            }),
        };
        fetch("/api/v0/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    history.push(`/room/${roomCode}`);
                } else {
                    setIsError("Room not found.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Join a Room
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              error={isError}
              label="Code"
              placeholder="Enter a Room Code"
              value={roomCode}
              helperText={isError}
              variant="outlined"
              onChange={(e) => setRoomCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleRoomJoin}
            >
              Enter Room
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" to="/" component={Link}>
              Back
            </Button>
          </Grid>
        </Grid>
    );
}

export default RoomJoin;