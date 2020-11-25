import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";

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

    marginTopOpen:{
        marginTop:'20px',
        backgroundColor: theme.palette.primary.main,
    },

    marginTopSecondOpen:{
        marginTop:'-15px',
        backgroundColor: theme.palette.primary.main,
    },

    marginTopClose:{
        marginTop:'-14px'
    },

    colorOpen:{
        backgroundColor: theme.palette.primary.main,
    },

    colorClose:{
        backgroundColor:'#e1e1e1'
    },
}));

const Option = ({open, openPreview, openNext, handleOnOpen, titleLabel, icon, children}) =>{
    let styles = useStyles();

    return(
        <div>
            {openPreview === undefined && <Divider className={open ? styles.colorOpen : styles.colorClose}/>}
            {openPreview !== undefined && <Divider hidden={!open}
                     className={open ? openPreview ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>}
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
            <Divider hidden={openNext} className={open ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};

export default Option;