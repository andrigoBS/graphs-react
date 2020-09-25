import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import AddVertex from "./AddVertex";
import AddEdge from "./AddEdge";
import AddBow from "./AddBow";

const useStyles = makeStyles(theme =>({
    marginTopClose:{
        marginTop:'-14px'
    },

    marginTopSecondOpen:{
        marginTop:'-15px',
        backgroundColor:theme.palette.primary.main,
    },


    marginTopOpen:{
        marginTop:'20px',
        backgroundColor:theme.palette.primary.main,
    },


    colorOpen:{
        backgroundColor:theme.palette.primary.main,
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


const Add = ({graph, update}) =>{
    let styles = useStyles();

    const [adds, setAdds] = React.useState({addVertex: false, addBow: false, addEdge: false});

    const handleOnClickAdd = (name) => {
        setAdds({ ...adds, [name]: !adds[name]});
    };

    const handleAddVertex = (vertex) => {
        console.log(vertex);
        handleOnClickAdd("addVertex");
        graph.addVertex(vertex);
        update();
    };

    const handleAddEdge = (edge) => {
        console.log(edge);
        handleOnClickAdd("addEdge");
        graph.addEdge(edge.initialEdge, edge.finalEdge, edge.weightEdge, edge.nameEdge);
        update();
    };

    const handleAddBow = (bow) => {
        console.log(bow);
        handleOnClickAdd("addBow");
        graph.addBow(bow.initialBow, bow.finalBow, bow.weightBow, bow.nameBow);
        update();
    };

    let {addVertex, addBow, addEdge} = adds;

    return(
        <div>
            <ListItem>
                <h5 className={styles.partsFont}>ADICIONAR</h5>
            </ListItem>

            <Divider className={addVertex ? styles.colorOpen :styles.colorClose}/>
            <AddVertex addVertex={addVertex}
                       handleOnClickAddVertex={() => handleOnClickAdd("addVertex")}
                       onAddVertex={handleAddVertex}/>
            <Divider hidden={addEdge} className={addVertex? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!addEdge}
                     className={addEdge ? addVertex ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <AddEdge addEdge={addEdge}
                     handleOnClickAddEdge={() => handleOnClickAdd("addEdge")}
                     onAddEdge={handleAddEdge}/>
            <Divider hidden={addBow} className={addEdge ? styles.marginTopOpen : styles.marginTopClose}/>

            <Divider hidden={!addBow}
                     className={addBow ? addEdge ? styles.marginTopOpen  : styles.marginTopSecondOpen : styles.marginTopClose}/>
            <AddBow addBow={addBow}
                    handleOnClickAddBow={() => handleOnClickAdd("addBow")}
                    onAddBow={handleAddBow}/>
            <Divider className={addBow ? styles.marginTopOpen : styles.marginTopClose}/>
        </div>
    )
};
export default Add;