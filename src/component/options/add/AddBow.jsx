import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import { ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AiOutlineMinus } from "react-icons/ai";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>({
    distance:{
        marginTop:'12px',
        marginLeft:'10px',
        marginRight:'10px',
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
    },
}));

const AddBow = ({addBow, handleOnClickAddBow, onAddBow}) =>{
    let styles = useStyles();

    let [bow, setBow] = useState(
        {
            nameBow: "",
            initialBow: "",
            finalBow: "",
            weightBow: 0
        });

    const save = (event) => {
        event.preventDefault();
        setBow({...bow, [event.target.id]: event.target.value});
    };

    const onClick = (event) => {
        event.preventDefault();
        onAddBow(bow);
    };

    return(
        <div>
            <ListItem button onClick={handleOnClickAddBow}>
                <ListItemIcon>
                    <AiOutlineMinus/>
                </ListItemIcon>
                <div className={styles.margins} align={"center"}>
                    <h1 className={addBow ? styles.optionsFontOpen : styles.optionsFontClose}>Arco</h1>
                </div>
            </ListItem>

            <ListItem>
                <Collapse in={addBow}>
                    <div>
                            <TextField
                                id="nameBow"
                                label="Nome"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
                            />
                            <TextField
                                id="initialBow"
                                label="Inicio"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
                            />
                            <TextField
                                id="finalBow"
                                label="Fim"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
                            />
                            <TextField
                                id="weightBow"
                                label="Peso"
                                type="text"
                                variant="outlined"
                                size={"small"}
                                className={styles.distance}
                                color={"primary"}
                                onChange={save}
                            />
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
export default AddBow;