import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import MatrixOptions from "./MatrixOptions";
import SearchOptions from "./SearchOptions";

const useStyles = makeStyles(theme =>({

    marginTopClose:{
        marginTop:'-14px'
    },

    marginTopSecondOpen:{
        marginTop:'-15px',
        backgroundColor: theme.palette.primary.main,
    },


    marginTopOpen:{
        marginTop:'20px',
        backgroundColor: theme.palette.primary.main,
    },


    colorOpen:{
        backgroundColor: theme.palette.primary.main,
    },

    colorClose:{
        backgroundColor:'#e1e1e1'
    },


    partsFont:{
        fontFamily: "Helvetica",
        color:'#858585',
        fontSize: 10.5
    },
}));


const Show = ({activeAdjacent, activeIncidence}) =>{
    let styles = useStyles();

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.checked });
    };


    const [state2, setState2] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const [showMatrixOptions,setShowMatrixOptions] = React.useState(false);

    const handleOnClickShowMatrixOptions = () => {
        setShowMatrixOptions(!showMatrixOptions);
    };

    const [searchOptions,setSearchOptions] = React.useState(false);

    const handleOnClickSearchOptions = () => {
        setSearchOptions(!searchOptions);
    };

    return(
        <div>
            <ListItem>
                <h5 className={styles.partsFont}>EXIBIR</h5>
            </ListItem>

            <Divider className={showMatrixOptions ? styles.colorOpen :styles.colorClose}/>
            <MatrixOptions showMatrixOptions={showMatrixOptions} handleOnClickShowMatrixOptions={handleOnClickShowMatrixOptions} state={state}/>
            <Divider hidden={searchOptions} className={showMatrixOptions ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!searchOptions} className={searchOptions ? showMatrixOptions ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <SearchOptions searchOptions={searchOptions} handleOnClickSearchOptions={handleOnClickSearchOptions} state={state2}/>
            <Divider  className={searchOptions ? styles.marginTopOpen : styles.marginTopClose}/>

        </div>
    )
};
export default Show;