import React, { useState, useEffect } from "react";
import RoomCreate from "./RoomCreate";
import RoomJoin from "./RoomJoin";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


function HomePage() {
    const [roomCode, setRoomCode] = useState(null);

    const getRoomCode = async() => {
        const response = await fetch("/api/v0/user-in-room");
        const data = response.json();
        setRoomCode(data.code);
    };

    
    useEffect(() => {
        getRoomCode();
    }, []);

    const clearRoomCode = () => {
        setRoomCode(null);
    };

    const renderHP = () => {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        Share The Music
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    };

    return (
        <Router> 
            <Switch>
                <Route exact path='/' render={() => roomCode ? (<Redirect to={`/room/${roomCode}`}/>) : renderHP()}></Route>
                <Route path='/join' component={RoomJoin}/>
                <Route path='/create' component={RoomCreate}/>
                <Route path='/room/:roomCode' render={(props) => {
                        return <Room {...props} leaveRoomCallback={clearRoomCode}/>;
                    }} 
                />
            </Switch>
        </Router>
    )
}

export default HomePage;