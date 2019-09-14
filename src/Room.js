import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { Paper, Typography } from "@material-ui/core";

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

function Room(props) {
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
                <Paper>
                    <Typography component="p">message1</Typography>
                    <Typography component="p">message2</Typography>
                </Paper>
                <Grid className={classes.caption}></Grid>
            </Grid>
        </React.Fragment>
    );
}

Room.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Room);
