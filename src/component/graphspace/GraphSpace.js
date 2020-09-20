import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    size:{
        width:'50%',
        position: 'center'
    },


}));

const GraphSpace = () =>{
    let styles = useStyles();
    return(
        <div align={"center"} className={styles.size}>
            <Paper className={styles.paperStyle} variant={"outlined"}>
                <h1>Grafo</h1>
            </Paper>
        </div>
    )
};

export default GraphSpace;