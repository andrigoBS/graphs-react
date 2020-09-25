import { BiCircle } from "react-icons/bi";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

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
const AddVertex = ({addVertex, handleOnClickAddVertex, theme, onAddVertex}) =>{
    let [vertex, setVertex] = useState("");

    const saveVertex = (event) => {
        event.preventDefault();
        setVertex(event.target.value);
    }

    const onClick = (event) => {
        event.preventDefault();
        onAddVertex(vertex);
    }

    let styles = useStyles();
    return(
        <div>
            <ListItem button onClick={handleOnClickAddVertex}>
                <ListItemIcon>
                    <BiCircle/>
                </ListItemIcon>
                <div className={styles.margins}>
                    <h1 className={addVertex ? styles.optionsFontOpen : styles.optionsFontClose}>Vertice</h1>
                </div>
            </ListItem>

            <ListItem >
                <Collapse in={addVertex}>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField
                                id="vertexName"
                                label="Nome"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={saveVertex}
                            />
                        </ThemeProvider>
                    </div>

                    <div align={"center"}>
                        <Button
                            color={"primary"}
                            onClick={onClick}
                            size={"small"}
                            className={styles.buttonStyle} >
                            Adicionar
                        </Button>
                    </div>
                </Collapse>
            </ListItem>
        </div>
    )
};

export default AddVertex;