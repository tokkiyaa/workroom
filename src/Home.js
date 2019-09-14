import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
                <Typography>Word of the Day</Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" size="small">
                    <Link to="/rooms/1">Join</Link>
                </Button>
            </CardActions>
        </Card>
    );
}

function Home(props) {
    const { classes, user } = props;
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
                <RoomCard></RoomCard>
                <Grid className={classes.caption}></Grid>
            </Grid>
        </React.Fragment>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
