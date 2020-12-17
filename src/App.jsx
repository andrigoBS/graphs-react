import exampleM2 from "./api/graph/ExampleM2";
import Graph from "./api/graph/Graph";
import React, {useState} from 'react';
import ToolBar from "./component/toolbar/ToolBar";
import GraphSpace from "./component/graphspace/GraphSpace";
import Paper from "@material-ui/core/Paper";
import Matrix from "./component/matrix/Matrix";
import {makeStyles} from "@material-ui/core/styles";
import Add from "./component/toolbar/leftBarOptions/Add";
import Remove from "./component/toolbar/leftBarOptions/Remove";
import Show from "./component/toolbar/leftBarOptions/Show";
import GeneticPrincipalSpace from "./component/genetic/GeneticPrincipalSpace";
import GeneticSecondSpace from "./component/genetic/GenericSecondSpace";
import GeneticSolution from "./api/graph/GeneticSolution";

const useStyles = makeStyles(theme => ({
    size:{
        width:'70%',
        marginLeft: '22%',
        "@media(max-width: 1366px)": {
            width:'60%',
            marginLeft: '30%',
        },
        "@media(max-width: 900px)": {
            width:'55%',
            marginLeft: '40%',
        }
    },
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
            depthSearch: false,
            widthSearch: false,
            aStar: false,
            roy: false,
            welshPowell: false,
            exampleM2: false,
            fordFulkerson: false,
            genetic: false,
            generation: false
        });

    const [graph, setGraph] = useState(getInitialStateGraph());
    const [graphView, setGraphView] = useState(graph.getVertexesAndLinks());
    const [vertexesNames, setVertexesNames] = useState(graphView.nodes.map((node) => node.element));
    const [linksNames, setLinksNames] = useState(graphView.links.map((links) => links.id));
    const [{minTree, totalWeight}, setMinTree] = useState(graph.getMinTreePrim());
    const [depthSearch, setDepthSearch] = useState(graph.getDepthSearch(shows.depthSearch));
    const [widthSearch, setWidthSearch] = useState(graph.getWidthSearch(shows.widthSearch));
    const [aStar, setAStar] = useState(graph.getVertexesAndLinks());
    const [genetic, setGenetic] = useState(new GeneticSolution(graph, '', 0, 0, 0));

    const update = (newGraph) => {
        let thisGraph =  (newGraph || graph);
        sessionStorage.setItem("graph", JSON.stringify(thisGraph));
        setGraph(thisGraph);
        let vertexAndLinks = thisGraph.getVertexesAndLinks();
        setGraphView(vertexAndLinks);
        setVertexesNames(vertexAndLinks.nodes.map((node) => node.element));
        setLinksNames(vertexAndLinks.links.map((links) => links.id));
        if(shows.prim) setMinTree(thisGraph.getMinTreePrim());
        if(shows.depthSearch) setDepthSearch(thisGraph.getDepthSearch(shows.depthSearch));
        if(shows.widthSearch) setWidthSearch(thisGraph.getWidthSearch(shows.widthSearch));
        if(shows.aStar) setAStar(thisGraph.getMinimumPath(shows.aStar.start, shows.aStar.end));
        if(shows.genetic) setGenetic(new GeneticSolution(graph,
                                                         shows.genetic.start,
                                                         shows.genetic.populationSize,
                                                         shows.genetic.mutationRate,
                                                         shows.genetic.crossingRate)
                                                  .start(shows.genetic.amountGeneration));
    };

    const handlerShow = (value, type) => {
        setShows({...shows, [type] : value});
        if(type === "exampleM2"){
            update(exampleM2());
        }else{
            update();
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
              <PatternPart title={"Grafo"} show={true}>
                  <GraphSpace links={graphView.links} nodes={graphView.nodes}
                              colors={shows.welshPowell? graph.getWelshPowellColors(): undefined}/>
              </PatternPart>

              <PatternPart title={"Matriz de adjacência"} show={shows.adjacent}>
                  <Matrix heads={vertexesNames} lines={vertexesNames} data={graph.getAdjacentMatrix()}/>
              </PatternPart>

              <PatternPart title={"Matriz de incidência"} show={shows.incidence}>
                  <Matrix heads={linksNames} lines={vertexesNames} data={graph.getIncidenceMatrix()}/>
              </PatternPart>

              <PatternPart title={"Árvore Geradora Mínima - Prim"} show={shows.prim}>
                  <GraphSpace links={minTree.links} nodes={minTree.nodes} totalWeight={totalWeight}/>
              </PatternPart>

              <PatternPart title={"Busca em Largura"} show={shows.widthSearch}>
                  <GraphSpace links={widthSearch.links} nodes={widthSearch.nodes}/>
              </PatternPart>

              <PatternPart title={"Busca em Profundidade"} show={shows.depthSearch}>
                  <GraphSpace links={depthSearch.links} nodes={depthSearch.nodes}/>
              </PatternPart>

              <PatternPart title={"Busca A*"} show={shows.aStar}>
                  <GraphSpace links={aStar.links} nodes={aStar.nodes}/>
              </PatternPart>

              <PatternPart title={"Componentes Fortemente Conexos - Roy"} show={shows.roy}>
                  {graph.getComponents().map((component) => <GraphSpace links={component.links} nodes={component.nodes}/>)}
              </PatternPart>

              <PatternPart title={"Algoritmo Genético"} show={shows.genetic}>
                    <GeneticPrincipalSpace genetic={genetic} handlerShow={handlerShow}/>
              </PatternPart>

              <PatternPart show={shows.generation} title={"Histórico da geração " + shows.generation.generation}>
                  <GeneticSecondSpace generationObject={shows.generation} />
              </PatternPart>

              <PatternPart title={"Fluxo de rede - Ford e Fulkerson"} show={shows.fordFulkerson}>
                  <h2>Inicio: {shows.fordFulkerson.start}</h2>
                  <h2>Fim: {shows.fordFulkerson.end}</h2>
                  <h2>Fluxo maximo: {graph.getFordFulkerson(shows.fordFulkerson.start, shows.fordFulkerson.end)}</h2>
              </PatternPart>
          </div>
      </React.Fragment>
    );
}

const partStyle = makeStyles(theme => ({
    font:{
        color:'#7f7d7c',
        fontWeight: 'bold',
        fontFamily: 'Lucida Bright',
    },

    marginPaper: {
        marginTop: "10px"
    }
}));

const PatternPart = ({show, title, children}) => {
    let styles = partStyle();
    return show? <Paper variant={"outlined"} className={styles.marginPaper}>
            <h1 className={styles.font}>{title}</h1>
        {children}
        </Paper> : "";
}

export default App;
