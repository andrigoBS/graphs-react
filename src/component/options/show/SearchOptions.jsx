import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { BiSearchAlt } from "react-icons/bi";

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

const SearchOptions = ({searchOptions,handleOnClickSearchOptions,state}) =>{
    let styles = useStyles();
    return(
        <div>
            <ListItem  button onClick={handleOnClickSearchOptions}>
                <ListItemIcon>
                    <BiSearchAlt/>
                </ListItemIcon>
                <div className={styles.margins}>
                    <h1 className={searchOptions ? styles.optionsFontOpen : styles.optionsFontClose}>Busca</h1>
                </div>
            </ListItem>

            <ListItem >
                <Collapse in={searchOptions}>
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={state.gilad} name="Largura" />}
                                label="Largura"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={state.jason} name="Profundidade" />}
                                label="Profundidade"
                            />
                        </FormGroup>
                    </div>
                </Collapse>
            </ListItem>
        </div>
    )
};

export default SearchOptions;