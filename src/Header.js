import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

function MyAppBar(props) {
    const { classes, user, login } = props;
    const [drawer, setDrawer] = useState(false);

    const handleMenu = event => {
        setDrawer(true);
    };
    const handleClose = () => {
        setDrawer(false);
    };
    const logout = event => {
        console.log("logout");
        firebase.auth().signOut();
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        onClick={handleMenu}
                        color="inherit"
                        aria-label="Menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                    >
                        WorkRoom
                    </Typography>
                    {user ? (
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            to={login || "/login"}
                            component={Link}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer open={drawer} onClose={handleClose}>
                <List>
                    <ListItem button to="/" component={Link}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <Divider />
                    <ListItem button to="/about" component={Link}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyAppBar);
