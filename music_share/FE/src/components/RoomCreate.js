import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const RoomCreate = (props) => {
	console.log(props);
	/* const defaultSettings = {
		votesToSkip: 2,
		guestCanPause: true,
		update: false,
		roomCode: null,
		updateCallback: () => {},
	}; */

	const [roomSettings, setRoomSettings] = useState({
		guestCanPause: props.guestCanPause,
		votesToSkip: props.votesToSkip,
		errorMsg: "",
		successMsg: "",
	})
    
    const history = useHistory();

    const handleRoomCreate = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: roomSettings.votesToSkip,
                guest_can_pause: roomSettings.guestCanPause,
            }),
        };
        fetch("/api/v0/create-room", requestOptions)
			.then((response) => response.json())
			.then((data) => history.push(`/room/${data.code}`))
    }

    const handleUpdateRoom = () => {
		const requestOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			votes_to_skip: roomSettings.votesToSkip,
			guest_can_pause: roomSettings.guestCanPause,
			code: props.roomCode,
			}),
		};
		console.log(requestOptions);
		fetch("/api/v0/update-room", requestOptions)
			.then((response) => {
				if (response.ok) {
					setRoomSettings({...roomSettings, successMsg: "Room updated successfully!"});
				} else {
					setRoomSettings({...roomSettings, errorMsg: "Error updating room..."});
				}
				props.updateCallback();
			});
    }
	
	const updateRoomButtons = () => {
		return (
			<Grid item xs={12} align="center">
				<Button color="primary" variant="contained" onClick={handleUpdateRoom}>
					Update Room
				</Button>
			</Grid>
		);
	};

	const createRoomButtons = () => {
		return (
			<Grid container spacing={1}>
				<Grid item xs={12} align="center">
					<Button color="primary" variant="contained" onClick={handleRoomCreate} >
						Create A Room
					</Button>
				</Grid>
				<Grid item xs={12} align="center">
					<Button color="secondary" variant="contained" to="/" component={Link}>
						Back
					</Button>
				</Grid>
			</Grid>
		);
	};
	const title = props.update ? "Update Room Settings" : "Create New Room";
  
    return (
        <Grid container spacing={1}>
			 <Grid item xs={12} align="center">
				<Collapse in={roomSettings.errorMsg != "" || roomSettings.successMsg != ""}>
					{roomSettings.successMsg != "" ? (
						<Alert severity="success" onClose={() => setRoomSettings({...roomSettings, successMsg: "" })}>
						{roomSettings.successMsg}
						</Alert>
					) : (
						<Alert severity="error" onClose={() => setRoomSettings({...roomSettings, errorMsg: "" })}>
							{roomSettings.errorMsg}
						</Alert>
					)}
				</Collapse>
			</Grid>
			<Grid item xs={12} align="center">
				<Typography component="h4" variant="h4">
					{title}
				</Typography>
			</Grid>
			<Grid item xs={12} align="center">
				<FormControl component="fieldset">
				<FormHelperText>
					<div align="center">Guest Control of Playback State</div>
				</FormHelperText>
				<RadioGroup
					row
					defaultValue={roomSettings.guestCanPause}
					onChange={(e) => setRoomSettings({...roomSettings, guestCanPause: e.target.value === "true" ? true : false})}
				>
					<FormControlLabel
					value="true"
					control={<Radio color="primary" />}
					label="Play/Pause"
					labelPlacement="bottom"
					/>
					<FormControlLabel
					value="false"
					control={<Radio color="secondary" />}
					label="No Control"
					labelPlacement="bottom"
					/>
				</RadioGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12} align="center">
				<FormControl>
					<TextField
						required={true}
						type="number"
						onChange={(e) => setRoomSettings({...roomSettings, votesToSkip: e.target.value})}
						defaultValue={roomSettings.votesToSkip}
						inputProps={{
						min: 1,
						style: { textAlign: "center" },
						}}
					/>
					<FormHelperText>
						<div align="center">Votes Required To Skip Song</div>
					</FormHelperText>
				</FormControl>
			</Grid>
			{props.update ? updateRoomButtons() : createRoomButtons()}
			{/* <Grid item xs={12} align="center">
				<Button color="primary" variant="contained" onClick={handleRoomCreate}>
					Create A Room
				</Button>
			</Grid>
			<Grid item xs={12} align="center">
				<Button color="secondary" variant="contained" to="/" component={Link}>
				Back
				</Button>
			</Grid> */}
        </Grid>
      );
}

export default RoomCreate;