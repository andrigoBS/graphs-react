import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";

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

const AddEdge = ({addEdge, handleOnClickAddEdge, theme, onAddEdge}) =>{
    let styles = useStyles();

    let [edge, setEdge] = useState(
        {
            nameEdge: "",
            initialEdge: "",
            finalEdge: "",
            weightEdge: 0
        });

    const save = (event) => {
        event.preventDefault();
        setEdge({ ...edge, [event.target.id]: event.target.value});
    }

    const onClick = (event) => {
        event.preventDefault();
        onAddEdge(edge);
    }

    return(
        <div>
            <ListItem button onClick={handleOnClickAddEdge}>
                <ListItemIcon>
                    <HiOutlineArrowNarrowRight/>
                </ListItemIcon>
                <div className={styles.margins} align={"center"}>
                    <h1 className={addEdge ? styles.optionsFontOpen : styles.optionsFontClose}>Aresta</h1>
                </div>
            </ListItem>

            <ListItem >
                <Collapse in={addEdge}>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField
                                id="nameEdge"
                                label="Nome"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
                            />
                            <TextField
                                id="initialEdge"
                                label="Inicio"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
                            />
                            <TextField
                                id="finalEdge"
                                label="Fim"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
                            />
                            <TextField
                                id="weightEdge"
                                label="Peso"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
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

export default AddEdge;