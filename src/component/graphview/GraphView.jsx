import React, {useState} from 'react';
import { ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink } from 'react-vis-force';
import {makeStyles} from "@material-ui/core/styles";

const style = makeStyles(theme => ({
    fontNode: {
        fontSize: "8px",
    },
    fontLink: {
        fontSize: "5px",
    }
}));

const GraphView = ({graph, width, height}) => {
    const classes = style();
    let graphView = graph.getVertexAndLinks();
    let nodes = graphView.nodes;
    let links = graphView.links;

    let [textProps, setTextProps] = useState({text: "", x:"0", y:"0"});

    const linkEnter = (event, link) => {
        event.preventDefault();
        let line = event.target;
        let x = (line.x1.baseVal.value + line.x2.baseVal.value)/2 - 5;
        let y = (line.y1.baseVal.value + line.y2.baseVal.value)/2;
        let text = link.id + "(" + link.weight + ")";
        let newProps = {text: text, x:x+"", y:y+""};
        console.log(newProps);
        setTextProps(newProps);
    }

    return <ForceGraph zoom
                       simulationOptions={{ height: height, width: width, animate: true }}
                       labelOffset={{x(node){return -3;}, y(node){return 3;}}}
                       className={classes.fontNode}>
        {nodes.map(node => <ForceGraphNode node={{ id: node.element, label: node.element }} fill={"#9c27b0"} showLabel />)}
        {links.map(link => link.directed?
            <ForceGraphArrowLink link={{source: link.initialVertex, target: link.finalVertex}}
                                 onMouseEnter={event => linkEnter(event, link)}/> :
            <ForceGraphLink link={{source: link.initialVertex, target: link.finalVertex}}
                            onMouseEnter={event => linkEnter(event, link)}/>)}
        <text className={classes.fontLink} zoomable x={textProps.x} y={textProps.y}>{textProps.text}</text>
    </ForceGraph>
};

export default GraphView;