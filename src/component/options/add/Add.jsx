import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import AddVertex from "./AddVertex";
import AddEdge from "./AddEdge";
import AddBow from "./AddBow";
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

const Add = ({graph}) =>{
    let styles = useStyles();

    const [adds, setAdds] = React.useState({addVertex: false, addBow: false, addEdge: false});

    const handleOnClickAdd = (name) => {
        setAdds({ ...adds, [name]: !adds[name]});
    }

    const handleAddVertex = (vertex) => {
        console.log(vertex);
        handleOnClickAdd("addVertex");
        graph.addVertex(vertex);
    }

    const handleAddEdge = (edge) => {
        console.log(edge);
        handleOnClickAdd("addEdge");
    }

    const handleAddBow = (bow) => {
        console.log(bow);
        handleOnClickAdd("addBow");
    }

    let {addVertex, addBow, addEdge} = adds;

    return(
        <div>
            <ListItem>
                <h5 className={styles.partsFont}>ADICIONAR</h5>
            </ListItem>

            <Divider className={addVertex ? styles.colorOpen :styles.colorClose}/>
            <AddVertex addVertex={addVertex}
                       handleOnClickAddVertex={() => handleOnClickAdd("addVertex")}
                       theme={theme}
                       onAddVertex={handleAddVertex}/>
            <Divider hidden={addEdge} className={addVertex? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!addEdge}
                     className={addEdge ? addVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <AddEdge addEdge={addEdge}
                     handleOnClickAddEdge={() => handleOnClickAdd("addEdge")}
                     theme={theme}
                     onAddEdge={handleAddEdge}/>
            <Divider hidden={addBow} className={addEdge ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!addBow}
                     className={addBow ? addEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <AddBow addBow={addBow}
                    handleOnClickAddBow={() => handleOnClickAdd("addBow")}
                    theme={theme}
                    onAddBow={handleAddBow}/>
            <Divider className={addBow ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};
export default Add;