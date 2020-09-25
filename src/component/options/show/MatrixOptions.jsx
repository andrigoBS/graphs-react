import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { SiMatrix } from "react-icons/si";

const useStyles = makeStyles(theme =>({

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

}));
const MatrixOptions = ({showMatrixOptions,handleOnClickShowMatrixOptions,state}) =>{
    let styles = useStyles();
    return(
        <div>
            <ListItem  button onClick={handleOnClickShowMatrixOptions}>
                <ListItemIcon>
                    <SiMatrix/>
                </ListItemIcon>
                <div className={styles.margins}>
                    <h1 className={showMatrixOptions ? styles.optionsFontOpen : styles.optionsFontClose}>Matrizes</h1>
                </div>
            </ListItem>

            <ListItem >
                <Collapse in={showMatrixOptions}>
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={state.gilad} name="Matriz de Incidência"/>}
                                label="Matriz de Incidência"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={state.jason} name="Matriz de Adjacência" />}
                                label="Matriz de Adjacência"
                            />
                        </FormGroup>
                    </div>
                </Collapse>
            </ListItem>
        </div>
    )
};
export default MatrixOptions;