import React, {useState} from 'react';
import ToolBar from "./component/toolbar/ToolBar";
import GraphSpace from "./component/graphspace/GraphSpace";
import Graph from "./api/graph/Graph";
import Paper from "@material-ui/core/Paper";
import Matrix from "./component/matrix/Matrix";
import {makeStyles} from "@material-ui/core/styles";
import Add from "./component/options/add/Add";
import Remove from "./component/options/remove/Remove";
import Show from "./component/options/show/Show";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
    size:{
        width:'60%',
        marginLeft: '30%',
    },

    font:{
        color:'#7f7d7c',
        fontWeight: 'bold',
        fontFamily: 'Lucida Bright',
    },

    marginPaper: {
        marginTop: "10px"
    }
}));

const getInitialStateGraph = () => {
    let graph = new Graph();
    let storage = sessionStorage.getItem("graph");
    if(storage){
        graph.vertexes = JSON.parse(storage).vertexes;
    }

    return graph;
};
function App() {

    let styles = useStyles();
    const [showAdjacent, setShowAdjacent] = useState(true);
    const [showIncidence, setShowIncidence] = useState(true);
    const [showMinTree, setShowMinTree] = useState(true);
    const [graph, setGraph] = useState(getInitialStateGraph());
    const [graphView, setGraphView] = useState(graph.getVertexAndLinks());
    const [vertexesNames, setVertexesNames] = useState(graphView.nodes.map((node) => node.element));
    const [linksNames, setLinksNames] = useState(graphView.links.map((links) => links.id));

    const update = () => {
        sessionStorage.setItem("graph", JSON.stringify(graph));
        setGraph(graph);
        let vertexAndLinks = graph.getVertexAndLinks();
        setGraphView(vertexAndLinks);
        setVertexesNames(vertexAndLinks.nodes.map((node) => node.element));
        setLinksNames(vertexAndLinks.links.map((links) => links.id));
    };

   let {minTree, totalWeight} = graph.getMinTreePrim();
   minTree = minTree.getVertexAndLinks();

  return (
      <React.Fragment>
          <ToolBar>
              <List>
                  <Add graph={graph} update={update}/>
                  <Remove graph={graph} update={update}/>
                  <Show/>
              </List>
          </ToolBar>

          <div align={"center"} className={styles.size}>
              <Paper variant={"outlined"}>
                  <h1 className={styles.font}>Grafo</h1>
                  <GraphSpace links={graphView.links} nodes={graphView.nodes}/>
              </Paper>

              {showAdjacent && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Matriz de adjacencia</h1>
                  <Matrix heads={vertexesNames} lines={vertexesNames} data={graph.getAdjacentMatrix()}/>
              </Paper>}

              {showIncidence && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Matriz de incidencia</h1>
                  <Matrix heads={linksNames} lines={vertexesNames} data={graph.getIncidenceMatrix()}/>
              </Paper>}

              {showMinTree && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Árvore minima</h1>
                  <GraphSpace links={minTree.links} nodes={minTree.nodes} totalWeight={totalWeight}/>
              </Paper>}
          </div>
      </React.Fragment>
  );
}

export default App;
