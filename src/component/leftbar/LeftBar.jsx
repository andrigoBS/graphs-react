import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Add from "./options/add/Add";
import Remove from "./options/remove/Remove";
import Show from "./options/show/Show";

const drawerWidth = 250;

const useStyles = makeStyles(theme =>({
    drawerPaper: {
        width: drawerWidth,
    }
}));


const LeftBar = () =>{
    let styles = useStyles();

    return(
        <div >
            <Drawer
                variant="permanent"
                classes={{
                paper: styles.drawerPaper,
            }}>
                <Toolbar/>
                <div >
                    <List>
                        <Add/>

                        <Remove/>

                        <Show/>
                    </List>
                </div>

            </Drawer>
        </div>
    )
};

export default LeftBar;