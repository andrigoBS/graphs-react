import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LeftBar from "../leftbar/LeftBar";


const useStyle = makeStyles(theme =>({
    size:{
        marginBottom: '80px'
    },

    color:{
        backgroundColor:'#9c27b0',
        zIndex: theme.zIndex.drawer + 1,
    },

    font:{
        fontFamily: 'Lucida Bright',
        fontWeight:'bold'
    }

}));

const TopBar = () =>{
    let styles = useStyle();
    return(
        <div className={styles.size}>

            <AppBar position="fixed" className={styles.color}>
                <Toolbar variant="dense">
                    <Typography className={styles.font} variant="h5" color="inherit">
                        Graphs React
                    </Typography>
                </Toolbar>
            </AppBar>
            <LeftBar/>
        </div>
    )
};

export default TopBar;