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
        fontWeigth: 'bold',
        fontFamily: 'Lucida Bright',
    },

    marginPaper: {
        marginTop: "10px"
    }
}));

function App() {
    let styles = useStyles();
    const [showAdjacent, setShowAdjacent] = useState(true);
    const [showIncidence, setShowIncidence] = useState(true);

    const graph = new Graph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addEdge("A","B",2,"AB");
    graph.addEdge("A","C",6,"AC");
    graph.addBow("C","B",5,"CB");
    graph.addVertex("D");
    graph.addBow("D","C",1,"DC");
    graph.addBow("D","B",3,"DB");

    let {links, nodes} = graph.getVertexAndLinks();
    let vertexesNames = nodes.map((node) => node.element);
    let linksNames = links.map((links) => links.id);

  return (
      <React.Fragment>
          <ToolBar>
              <List>
                  <Add graph={graph}/>
                  <Remove/>
                  <Show activeAdjacent={setShowAdjacent} activeIncidence={setShowIncidence}/>
              </List>
          </ToolBar>

          <div align={"center"} className={styles.size}>
              <Paper variant={"outlined"}>
                  <h1 className={styles.font}>Grafo</h1>
                  <GraphSpace links={links} nodes={nodes}/>
              </Paper>

              {showAdjacent && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Matriz de adjacencia</h1>
                  <Matrix heads={vertexesNames} lines={vertexesNames} data={graph.getAdjacentMatrix()}/>
              </Paper>}

              {showIncidence && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Matriz de incidencia</h1>
                  <Matrix heads={linksNames} lines={vertexesNames} data={graph.getIncidenceMatrix()}/>
              </Paper>}
          </div>
      </React.Fragment>
  );
}

export default App;
