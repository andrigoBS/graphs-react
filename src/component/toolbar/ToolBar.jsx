import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { BiNetworkChart } from "react-icons/bi";

const drawerWidth = 250;

const useStyle = makeStyles(theme =>({
    size:{
        marginBottom: '80px'
    },

    color:{
        backgroundColor:theme.palette.primary,
        zIndex: theme.zIndex.drawer + 1,
    },

    font:{
        fontFamily: 'Lucida Bright',
        fontWeight:'bold'
    },

    drawerPaper: {
        width: drawerWidth,
    },
    iconSpace:{
        marginLeft:'9px'
    }
}));

const ToolBar = ({children}) =>{
    let styles = useStyle();
    return(
        <React.Fragment>
            <div className={styles.size}>
                <AppBar position="fixed" className={styles.color}>
                    <Toolbar variant="dense">
                        <List>
                            <ListItem>
                                <Typography className={styles.font} variant="h5" color="inherit">
                                    Graphs React
                                </Typography>
                                <BiNetworkChart className={styles.iconSpace} size={28}/>
                            </ListItem>
                        </List>

                    </Toolbar>
                </AppBar>
            </div>
            <Drawer
                variant="permanent"
                classes={{
                    paper: styles.drawerPaper,
                }}>
                <Toolbar/>
                <List>
                    {children}
                </List>
            </Drawer>
        </React.Fragment>
    )
};

export default ToolBar;