import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { BiCircle} from "react-icons/bi";

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
const RemoveVertex = ({removeVertex,handleOnClickRemoveVertex,theme}) =>{
    let styles = useStyles();
    return(
        <div>
            <ListItem  button onClick={handleOnClickRemoveVertex}>
                <ListItemIcon>
                    <BiCircle/>
                </ListItemIcon>
                <div className={styles.margins}>
                    <h1 className={removeVertex ? styles.optionsFontOpen : styles.optionsFontClose}>Vertice</h1>
                </div>
            </ListItem>

            <ListItem >
                <Collapse in={removeVertex}>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField
                                id="removeVertexName"
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
                            onClick={handleOnClickRemoveVertex}
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
export default RemoveVertex;