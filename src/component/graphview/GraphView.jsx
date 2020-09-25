import React, {useState} from 'react';
import { ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink } from 'react-vis-force';
import {makeStyles} from "@material-ui/core/styles";

const style = makeStyles(theme => ({
    fontNode: {
        fontSize: "8px",
    },
    fontLink: {
        fontSize: "5px",
    },
}));

const nodeLabelRelativePosition = {
    x(node){
        return -3;
    },
    y(node){
        return 3;
    }
};

const createNodeView = (node) => {
    return {
        id: node.element,
        label: node.element
    };
};

const createLinkView = (link) => {
    return {
        source: link.initialVertex,
        target: link.finalVertex
    };
};

const GraphView = ({nodes, links, height}) => {
    const graphConfig = {
        width: "85%",
        height: height,
        animate: true
    };

    const classes = style();

    let [textProps, setTextProps] = useState({text: "", x:"0", y:"0"});

    const linkEnter = (event, link) => {
        event.preventDefault();
        let line = event.target;
        let x = (line.x1.baseVal.value + line.x2.baseVal.value)/2 - 5;
        let y = (line.y1.baseVal.value + line.y2.baseVal.value)/2;
        let text = link.id + "(" + link.weight + ")";
        let newProps = {text: text, x:x+"", y:y+""};
        setTextProps(newProps);
    };

    return <ForceGraph zoom
                       simulationOptions={graphConfig}
                       labelOffset={nodeLabelRelativePosition}
                       className={classes.fontNode}>
        {nodes.map(node => <ForceGraphNode node={createNodeView(node)} fill={"#9c27b0"} showLabel />)}
        {links.map(link => link.directed?
            <ForceGraphArrowLink link={createLinkView(link)} onMouseEnter={event => linkEnter(event, link)}/> :
            <ForceGraphLink link={createLinkView(link)} onMouseEnter={event => linkEnter(event, link)}/>)}

        <text className={classes.fontLink} zoomable x={textProps.x} y={textProps.y}>
            {textProps.text}
        </text>
    </ForceGraph>
};

export default GraphView;