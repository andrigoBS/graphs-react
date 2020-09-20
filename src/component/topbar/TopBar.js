import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


const useStyle = makeStyles(theme =>({
    size:{
        marginBottom: '5%'
    },

    color:{
        backgroundColor:'#9c27b0'
    }
}));

const TopBar = () =>{
    let styles = useStyle();
    return(
        <div className={styles.size}>
            <AppBar position="absolute" className={styles.color}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit">
                         Graphs React
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default TopBar;