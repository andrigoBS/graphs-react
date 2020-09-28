import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme =>({
    optionsFontClose:{
        color:'#6e6e6e',
        fontSize: 18.2,
        fontFamily:"Oswald",
        fontWeight: 'normal'
    },

    optionsFontOpen:{
        color:'#838383',
        fontSize: 18,
        fontFamily:"Oswald",
        fontWeight: 'bold'
    },

    margins:{
        marginTop:'-10px',
        marginBottom:'-10px',
        marginLeft:'-15px'
    },
}));

const Option = ({open, handleOnOpen, titleLabel, icon, children}) =>{
    let styles = useStyles();

    return(
        <div>
            <ListItem button onClick={handleOnOpen}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <div className={styles.margins} align={"center"}>
                    <h1 className={open ? styles.optionsFontOpen : styles.optionsFontClose}>{titleLabel}</h1>
                </div>
            </ListItem>

            <ListItem>
                <Collapse in={open}>
                    {children}
                </Collapse>
            </ListItem>
        </div>
    )
};

export default Option;