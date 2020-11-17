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
    const tableH = (vertex1, vertex2) => {
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
        tableH(vertexes["A"], vertexes["B"]) + 10,
        "AB");
    graph.addEdge("A", "N",
        tableH(vertexes["A"], vertexes["N"]) + 10,
        "AN");
    graph.addEdge("A", "G",
        tableH(vertexes["A"], vertexes["G"]) + 10,
        "AG");

    graph.addEdge("B", "E",
        tableH(vertexes["B"], vertexes["E"]) + 10,
        "BE");
    graph.addEdge("B", "N",
        tableH(vertexes["B"], vertexes["N"]) + 10,
        "BN");
    graph.addEdge("B", "F",
        tableH(vertexes["B"], vertexes["F"]) + 10,
        "BF");
    graph.addEdge("B", "J",
        tableH(vertexes["B"], vertexes["J"]) + 10,
        "BJ");

    graph.addEdge("C", "G",
        tableH(vertexes["C"], vertexes["G"]) + 10,
        "CG");
    graph.addEdge("C", "F",
        tableH(vertexes["C"], vertexes["F"]) + 10,
        "CF");

    graph.addEdge("D", "K",
        tableH(vertexes["D"], vertexes["K"]) + 10,
        "DK");
    graph.addEdge("D", "H",
        tableH(vertexes["D"], vertexes["H"]) + 10,
        "DH");
    graph.addEdge("D", "L",
        tableH(vertexes["D"], vertexes["L"]) + 10,
        "DL");
    graph.addEdge("D","O",
        tableH(vertexes["D"],vertexes["O"]) + 10,
        "DO");
    graph.addEdge("D","J",
        tableH(vertexes["D"],vertexes["J"]) + 10,
        "DJ");

    graph.addEdge("E","I",
        tableH(vertexes["E"],vertexes["I"]) + 10,
        "EI");

    graph.addEdge("E","L",
        tableH(vertexes["E"],vertexes["L"]) + 10,
        "EL");

    graph.addEdge("F","J",
        tableH(vertexes["F"],vertexes["J"]) + 10,
        "FJ");

    graph.addEdge("F","N",
        tableH(vertexes["F"],vertexes["N"]) + 10,
        "FN");

    graph.addEdge("G","N",
        tableH(vertexes["G"],vertexes["N"]) + 10,
        "GN");


    graph.addEdge("H","I",
        tableH(vertexes["H"],vertexes["I"]) + 10,
        "HI");
    graph.addEdge("H","L",
        tableH(vertexes["H"],vertexes["L"]) + 10,
        "HL");


    graph.addEdge("I","M",
        tableH(vertexes["I"],vertexes["M"]) + 10,
        "IM");


    graph.addEdge("J","O",
        tableH(vertexes["J"],vertexes["O"]) + 10,
        "JO");


    graph.addEdge("K","M",
        tableH(vertexes["K"],vertexes["M"]) + 10,
        "KM");

    graph.addEdge("L","O",
        tableH(vertexes["L"],vertexes["O"]) + 10,
        "LO");

    const h = (name1, name2) => {
        return tableH(vertexes[name1], vertexes[name2])
    }

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
            aStar: false,
            roy: false,
            welshPowell: false,
            exampleM2: false,
        });

    const [graph, setGraph] = useState(getInitialStateGraph());
    const [graphView, setGraphView] = useState(graph.getVertexAndLinks());
    const [vertexesNames, setVertexesNames] = useState(graphView.nodes.map((node) => node.element));
    const [linksNames, setLinksNames] = useState(graphView.links.map((links) => links.id));
    const [{minTree, totalWeight}, setMinTree] = useState(graph.getMinTreePrim());
    const [depthSearch, setDepthSearch] = useState(graph.getDepthSearch(shows.depthSearch));
    const [widthSearch, setWidthSearch] = useState(graph.getWidthSearch(shows.widthSearch));
    const [h, setH] = useState({h: () => {}});
    const [aStar, setAStar] = useState(graph.getVertexAndLinks());

    const update = (newGraph) => {
        let thisGraph =  (newGraph || graph);
        sessionStorage.setItem("graph", JSON.stringify(thisGraph));
        setGraph(thisGraph);
        let vertexAndLinks = thisGraph.getVertexAndLinks();
        setGraphView(vertexAndLinks);
        setVertexesNames(vertexAndLinks.nodes.map((node) => node.element));
        setLinksNames(vertexAndLinks.links.map((links) => links.id));
        if(shows.prim) setMinTree(thisGraph.getMinTreePrim());
        if(shows.depthSearch) setDepthSearch(thisGraph.getDepthSearch(shows.depthSearch));
        if(shows.widthSearch) setWidthSearch(thisGraph.getWidthSearch(shows.widthSearch));
        if(shows.aStar) setAStar(thisGraph.getMinimumPath(shows.aStar.start, shows.aStar.end))
    };

    const handlerShow = (value, type) => {
        setShows({...shows, [type] : value});
        if(type === "depthSearch") {
            setDepthSearch(graph.getDepthSearch(value));
        }else if(type === "widthSearch") {
            setWidthSearch(graph.getWidthSearch(value));
        }else if(type === "aStar"){
            setAStar(graph.getMinimumPath(value.start, value.end, h.h));
        }else if(type === "exampleM2"){
            let [graphM2, h] = exampleM2();
            setH({h: h});
            update(graphM2);
        }
    };

    let styles = useStyles();

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

              {shows.aStar && <Paper variant={"outlined"} className={styles.marginPaper}>
                  <h1 className={styles.font}>Busca A*</h1>
                  <GraphSpace links={aStar.links} nodes={aStar.nodes}/>
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
