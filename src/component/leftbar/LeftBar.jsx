import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const drawerWidth = 200;
const useStyles = makeStyles(theme =>({

    drawerPaper: {
        width: drawerWidth,
    },

}));
const LeftBar = () =>{
    let styles = useStyles();
    return(
        <div>
            <Drawer
                variant="permanent"
                classes={{
                paper: styles.drawerPaper,
            }}>
                <Toolbar/>
                <div>
                    <List>
                        <ListItem>
                            karoline de s g
                        </ListItem>
                    </List>
                </div>

            </Drawer>
        </div>
    )
};

export default LeftBar;