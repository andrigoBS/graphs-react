import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Collapse from '@material-ui/core/Collapse';
import Typography from "@material-ui/core/Typography";
import {GrTest} from "react-icons/gr";
import IconButton from "@material-ui/core/IconButton";
import { CgMoreO } from "react-icons/cg";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Graph from "../../api/graph/Graph";
import GraphView from "../graphview/GraphView";




const useStyles = makeStyles(theme => ({
    size:{
        width:'50%',
    },

    buttonColor:{
        marginBottom: '1%',
        marginRight:'3%',
        color:'#918f8e',
        fontSize:13,
    },

    divPosition:{
        marginTop: '1%'
    }
}));

const GraphSpace = () =>{
    let styles = useStyles();
    let graph = new Graph();

    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addEdge("A","B",2,"AB");
    graph.addEdge("A","C",6,"AC");
    graph.addBow("C","B",5,"CB");
    graph.addVertex("D");
    graph.addBow("D","C",1,"DC");
    graph.addBow("D","B",3,"DB");
   // graph.removeBow("CB");
    // graph.removeEdge("AB");
  //  graph.removeVertex("A");

    const handleOnClick = () => {
        graph.showVertex();
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return(
        <div align={"center"} className={styles.size} >
            <Paper variant={"outlined"}>
                <h1>Grafo</h1>
                <GraphView graph={graph} width={600} height={300}/>
                <Divider/>
                <div className={styles.divPosition} align={"right"}>
                    <Button className={styles.buttonColor} onClick={handleOnClick} startIcon={<GrTest/>}>
                        Testar
                    </Button>
                    <Button className={styles.buttonColor} onClick={handleExpandClick} startIcon={ <CgMoreO />}>
                        Ver detalhes
                    </Button>
                </div>
                <Divider/>
                <Collapse in={expanded} timeout="auto" unmountOnExit  addEndListener={""}>
                    <CardContent>
                        <br/>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                            again without stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Paper>
        </div>
    )
};

export default GraphSpace;