import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import RemoveVertex from "./RemoveVertex";
import RemoveEdge from "./RemoveEdge";
import RemoveBow from "./RemoveBow";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {purple} from "@material-ui/core/colors";

const useStyles = makeStyles(theme =>({

    marginTopClose:{
        marginTop:'-14px'
    },

    marginTopSecondOpen:{
        marginTop:'-15px',
        backgroundColor:'#9c27b0',
    },


    marginTopOpen:{
        marginTop:'20px',
        backgroundColor:'#9c27b0',
    },


    colorOpen:{
        backgroundColor:'#9c27b0',
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

const theme = createMuiTheme({
    palette: {
        primary: purple,
    },
});

const Remove = () =>{
    let styles = useStyles();

    const [removeVertex,setRemoveVertex] = React.useState(false);

    const handleOnClickRemoveVertex = () => {
        setRemoveVertex(!removeVertex);
    };

    const [removeEdge,setRemoveEdge] = React.useState(false);

    const handleOnClickRemoveEdge = () => {
        setRemoveEdge(!removeEdge);
    };

    const [removeBow,setRemoveBow] = React.useState(false);

    const handleOnClickRemoveBow = () => {
        setRemoveBow(!removeBow);
    };

    return(
        <div>
            <ListItem>
                <h5 className={styles.partsFont}>REMOVER</h5>
            </ListItem>

            <Divider className={removeVertex ? styles.colorOpen :styles.colorClose}/>
            <RemoveVertex removeVertex={removeVertex} handleOnClickRemoveVertex={handleOnClickRemoveVertex} theme={theme}/>
            <Divider hidden={removeEdge} className={removeVertex ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!removeEdge} className={removeEdge ? removeVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <RemoveEdge removeEdge={removeEdge} handleOnClickRemoveEdge={handleOnClickRemoveEdge} theme={theme}/>
            <Divider hidden={removeBow} className={removeEdge ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!removeBow} className={removeBow ? removeEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <RemoveBow removeBow={removeBow} handleOnClickRemoveBow={handleOnClickRemoveBow} theme={theme}/>
            <Divider className={removeBow ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};

export default Remove;