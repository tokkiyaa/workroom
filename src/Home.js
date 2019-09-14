import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { db } from "./App";

import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    DialogContent,
    DialogActions
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(10)
    },
    caption: {
        textAlign: "center",
        width: "100%"
    }
});

function RoomCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography fontSize="h4.fontSize">{props.name}</Typography>
            </CardContent>
            <CardContent>
                <Typography>{props.description}</Typography>
            </CardContent>
            <CardActions>
                <Button color="" size="small">
                    <Link to={`/rooms/${props.id}`}>Join</Link>
                </Button>
            </CardActions>
        </Card>
    );
}

function CreateRoomDialog() {
    const [open, setOpen] = React.useState(false);
    const [roomName, setRoomName] = React.useState("");
    const [roomDescription, setRoomDescription] = React.useState("");
    const [roomDuration, setRoomDuration] = React.useState(60);
    const { history, location, match } = useReactRouter();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleRoomNameChange(event) {
        setRoomName(event.target.value);
    }

    function handleRoomDescriptionChange(event) {
        setRoomDescription(event.target.value);
    }

    function handleRoomDurationChange(event) {
        setRoomDuration(event.target.value);
    }

    async function createNewRoomAndJoinRoom() {
        const room = await db.collection("room").add({
            name: roomName,
            description: roomDescription,
            duration: roomDuration,
            startedAt: Date.now(),
            ended: false
        });
        history.push(`/room/${room.id}`);
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
            >
                New Room
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">New Room</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Room Name"
                        type="title"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Room Description"
                        type="text"
                        value={roomDescription}
                        onChange={handleRoomDescriptionChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Duration(min)"
                        type="number"
                        value={roomDuration}
                        onChange={handleRoomDurationChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createNewRoomAndJoinRoom} color="primary">
                        Go
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function Home(props) {
    const { classes, user } = props;

    const [rooms, setRooms] = React.useState([]);

    React.useEffect(() => {
        db.collection("room").onSnapshot(querySnapshot => {
            let currentRooms = [];
            querySnapshot.forEach(doc => {
                console.log(JSON.stringify(doc.id));
                const data = doc.data();
                currentRooms.push({
                    id: doc.id,
                    name: data.name,
                    description: data.description,
                    startedAt: data.startedAt,
                    duration: data.duration
                });
            });
            setRooms(currentRooms);
        });
    });

    return (
        <React.Fragment>
            <Header user={user} />
            <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
                className={classes.root}
            >
                <CreateRoomDialog></CreateRoomDialog>
            </Grid>
            <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
                className={classes.root}
            >
                {(rooms || []).map(room => (
                    <Grid item xs={8}>
                        <RoomCard {...room}></RoomCard>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
