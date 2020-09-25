import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import RemoveVertex from "./RemoveVertex";
import RemoveEdge from "./RemoveEdge";
import RemoveBow from "./RemoveBow";

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
            <RemoveVertex removeVertex={removeVertex} handleOnClickRemoveVertex={handleOnClickRemoveVertex} />
            <Divider hidden={removeEdge} className={removeVertex ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!removeEdge} className={removeEdge ? removeVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <RemoveEdge removeEdge={removeEdge} handleOnClickRemoveEdge={handleOnClickRemoveEdge}/>
            <Divider hidden={removeBow} className={removeEdge ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!removeBow} className={removeBow ? removeEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <RemoveBow removeBow={removeBow} handleOnClickRemoveBow={handleOnClickRemoveBow}/>
            <Divider className={removeBow ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};

export default Remove;