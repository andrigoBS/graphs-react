import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AiOutlineMinus } from "react-icons/ai";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme =>({
    distance:{
        marginTop:'12px',
        marginLeft:'10px',
        marginRight:'10px',
        color:'#9c27b0',
    },

    optionsFontClose:{
        color:'#6e6e6e',
        fontSize: 18,
        fontFamily:"Oswald",
        fontWeight: 'normal'
    },

    optionsFontOpen:{
        color:'#838383',
        fontSize: 17,
        fontFamily:"Oswald",
        fontWeight: 'bold'
    },

    margins:{
        marginTop:'-10px',
        marginBottom:'-10px',
        marginLeft:'-15px'
    },

    buttonStyle:{
        marginTop: '10px',
        color:'#9c27b0',
    },
}));
const RemoveBow = ({removeBow,handleOnClickRemoveBow,theme}) =>{
    let styles = useStyles();
    return(
        <div>
            <ListItem button onClick={handleOnClickRemoveBow}>
                <ListItemIcon>
                    <AiOutlineMinus/>
                </ListItemIcon>
                <div className={styles.margins} align={"center"}>
                    <h1 className={removeBow ? styles.optionsFontOpen : styles.optionsFontClose}>Arco</h1>
                </div>
            </ListItem>

            <ListItem >
                <Collapse in={removeBow}>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField
                                id="removeBowName"
                                label="Nome"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                            />
                        </ThemeProvider>
                    </div>

                    <div align={"center"}>
                        <Button
                            color={"primary"}
                            onClick={handleOnClickRemoveBow}
                            size={"small"}
                            className={styles.buttonStyle} >
                            Remover
                        </Button>
                    </div>
                </Collapse>
            </ListItem>
        </div>
    )
};
export default RemoveBow;