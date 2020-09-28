import React, {useState} from 'react';
import ToolBar from "./component/toolbar/ToolBar";
import GraphSpace from "./component/graphspace/GraphSpace";
import Graph from "./api/graph/Graph";
import Paper from "@material-ui/core/Paper";
import Matrix from "./component/matrix/Matrix";
import {makeStyles} from "@material-ui/core/styles";
import Add from "./component/toolbar/leftBarOptions/Add";
import Remove from "./component/toolbar/leftBarOptions/Remove";
import Show from "./component/toolbar/leftBarOptions/show/Show";

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
    const [shows, setShows] = useState(
        {
            adjacent: false,
            incidence: false,
            prim: false,
            widthSearch: "",
            depthSearch: "",
            roy: false
        });

    const [graph, setGraph] = useState(getInitialStateGraph());
    const [graphView, setGraphView] = useState(graph.getVertexAndLinks());
    const [vertexesNames, setVertexesNames] = useState(graphView.nodes.map((node) => node.element));
    const [linksNames, setLinksNames] = useState(graphView.links.map((links) => links.id));
    const [{minTree, totalWeight}, setMinTree] = useState(graph.getMinTreePrim());

    const update = () => {
        sessionStorage.setItem("graph", JSON.stringify(graph));
        setGraph(graph);
        let vertexAndLinks = graph.getVertexAndLinks();
        setGraphView(vertexAndLinks);
        setVertexesNames(vertexAndLinks.nodes.map((node) => node.element));
        setLinksNames(vertexAndLinks.links.map((links) => links.id));
        setMinTree(graph.getMinTreePrim());
    };

    const handlerShow = (value, type) => {
        setShows({...shows, [type] : value});
    }

    let styles = useStyles();

    return (
      <React.Fragment>
          <ToolBar>
              <Add graph={graph} update={update}/>
              <Remove graph={graph} update={update}/>
              <Show onChange={handlerShow} actives={shows}/>
          </ToolBar>

          <div align={"center"} className={styles.size}>
              <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Grafo</h1>
                  <GraphSpace links={graphView.links} nodes={graphView.nodes}/>
              </Paper>

              {shows.adjacent && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Matriz de adjacência</h1>
                  <Matrix heads={vertexesNames} lines={vertexesNames} data={graph.getAdjacentMatrix()}/>
              </Paper>}

              {shows.incidence && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Matriz de incidência</h1>
                  <Matrix heads={linksNames} lines={vertexesNames} data={graph.getIncidenceMatrix()}/>
              </Paper>}

              {shows.prim && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Árvore Geradora Mínima - Prim</h1>
                  <GraphSpace links={minTree.links} nodes={minTree.nodes} totalWeight={totalWeight}/>
              </Paper>}
          </div>
      </React.Fragment>
    );
}

export default App;
