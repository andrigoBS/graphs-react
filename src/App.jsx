import React, {useState} from 'react';
import ToolBar from "./component/toolbar/ToolBar";
import GraphSpace from "./component/graphspace/GraphSpace";
import Graph from "./api/graph/Graph";
import Paper from "@material-ui/core/Paper";
import Matrix from "./component/matrix/Matrix";
import {makeStyles} from "@material-ui/core/styles";
import Add from "./component/toolbar/leftBarOptions/Add";
import Remove from "./component/toolbar/leftBarOptions/Remove";
import Show from "./component/toolbar/leftBarOptions/Show";

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

function exampleM2(){
    const h = (vertex1, vertex2) => {
        return Math.abs(vertex1.x - vertex2.x) +
               Math.abs(vertex1.y - vertex2.y);
    }

    let graph = new Graph();

    let vertexes = {
        A:{ x:950, y:231 },
        B:{ x:607, y: 486 },
        C:{ x:891, y: 762 },
        D:{ x:15, y: 747 },
        E:{ x:466, y: 419 },
        F:{ x:615, y: 792 },
        G:{ x:922, y: 738 },
        H:{ x:176, y: 406 },
        I:{ x:272, y: 199 },
        J:{ x:410, y: 894 },
        K:{ x:58, y: 353 },
        L:{ x:199, y: 604 },
        M:{ x:139, y: 203 },
        N:{ x:846, y: 525 },
        O:{ x:203, y: 672 }
    };

    for (let vertexKey in vertexes) {
        graph.addVertex(vertexKey);
    }

    graph.addEdge("A", "B",
        h(vertexes["A"], vertexes["B"]) + 10,
        "AB");
    graph.addEdge("A", "N",
        h(vertexes["A"], vertexes["N"]) + 10,
        "AN");
    graph.addEdge("A", "G",
        h(vertexes["A"], vertexes["G"]) + 10,
        "AG");

    graph.addEdge("B", "E",
        h(vertexes["B"], vertexes["E"]) + 10,
        "BE");
    graph.addEdge("B", "N",
        h(vertexes["B"], vertexes["N"]) + 10,
        "BN");
    graph.addEdge("B", "F",
        h(vertexes["B"], vertexes["F"]) + 10,
        "BF");
    graph.addEdge("B", "J",
        h(vertexes["B"], vertexes["J"]) + 10,
        "BJ");

    return [graph, h];
}

function App() {
    const [shows, setShows] = useState(
        {
            adjacent: false,
            incidence: false,
            prim: false,
            depthSearch: false,
            widthSearch: false,
            roy: false,
            welshPowell: false
        });

    const [graph, setGraph] = useState(getInitialStateGraph());
    const [graphView, setGraphView] = useState(graph.getVertexAndLinks());
    const [vertexesNames, setVertexesNames] = useState(graphView.nodes.map((node) => node.element));
    const [linksNames, setLinksNames] = useState(graphView.links.map((links) => links.id));
    const [{minTree, totalWeight}, setMinTree] = useState(graph.getMinTreePrim());
    const [depthSearch, setDepthSearch] = useState(graph.getDepthSearch(shows.depthSearch));
    const [widthSearch, setWidthSearch] = useState(graph.getWidthSearch(shows.widthSearch));

    const update = () => {
        sessionStorage.setItem("graph", JSON.stringify(graph));
        setGraph(graph);
        let vertexAndLinks = graph.getVertexAndLinks();
        setGraphView(vertexAndLinks);
        setVertexesNames(vertexAndLinks.nodes.map((node) => node.element));
        setLinksNames(vertexAndLinks.links.map((links) => links.id));
        if(shows.prim) setMinTree(graph.getMinTreePrim());
        if(shows.depthSearch) setDepthSearch(graph.getDepthSearch(shows.depthSearch));
        if(shows.widthSearch) setWidthSearch(graph.getWidthSearch(shows.widthSearch));
    };

    const handlerShow = (value, type) => {
        setShows({...shows, [type] : value});
        if(type === "depthSearch") {
            setDepthSearch(graph.getDepthSearch(value));
        }else if(type === "widthSearch") {
            setWidthSearch(graph.getWidthSearch(value));
        }
    };

    let styles = useStyles();
    graph.getComponents();
    // graph.addVertex("A");
    // graph.addVertex("B");
    // graph.addVertex("C");
    // graph.addVertex("D");
    // graph.addBow("A", "D",1);
    // graph.addBow("A","B",3);
    // graph.addBow("B","C",5);
    let [graphM2, h] = exampleM2();
    console.log(graphM2.getMinimumpath("A","J", h));

    return (
      <React.Fragment>
          <ToolBar>
              <Add graph={graph} update={update}/>
              <Remove graph={graph} update={update}/>
              <Show actives={shows} onChange={handlerShow}/>
          </ToolBar>

          <div align={"center"} className={styles.size}>
              <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Grafo</h1>
                  <GraphSpace links={graphView.links} nodes={graphView.nodes}
                              colors={shows.welshPowell? graph.getWelshPowellColors(): undefined}/>
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

              {shows.widthSearch && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Busca em Largura</h1>
                  <GraphSpace links={widthSearch.links} nodes={widthSearch.nodes}/>
              </Paper>}

              {shows.depthSearch && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Busca em Profundidade</h1>
                  <GraphSpace links={depthSearch.links} nodes={depthSearch.nodes}/>
              </Paper>}

              {shows.roy && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Componentes Fortemente Conexos - Roy</h1>
                  {graph.getComponents().map((component) => <GraphSpace links={component.links} nodes={component.nodes}/>)}
              </Paper>}
          </div>
      </React.Fragment>
    );
}

export default App;
