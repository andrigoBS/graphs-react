import React, {useState} from 'react';
import { ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink, updateSimulation} from 'react-vis-force';
import {makeStyles, useTheme} from "@material-ui/core";

const style = makeStyles(theme => ({
    fontNode: {
        fontSize: "8px",
    },
    fontLink: {
        fontSize: "5px",
    },
    nodeColor: {
        color: theme.palette.primary
    }
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

    const theme = useTheme();

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

    const onUpdateSimulation = (simulation, options) => {
        const pxToFloat = (px) => {
            return px.includes("px")? parseFloat(px.substring(0, px.length-2)) : px;
        };

        let forceGraph = document.getElementsByClassName("rv-force__svg")[0];
        let {height, width} = getComputedStyle(forceGraph);

        options.height = pxToFloat(height);
        options.width = pxToFloat(width);

        return updateSimulation(simulation, options);
    };

    return <ForceGraph zoom
                       simulationOptions={graphConfig}
                       labelOffset={nodeLabelRelativePosition}
                       className={classes.fontNode}
                       updateSimulation={onUpdateSimulation}>
        {nodes.map(node => <ForceGraphNode node={createNodeView(node)} fill={theme.palette.primary.main} showLabel />)}
        {links.map(link => link.directed?
            <ForceGraphArrowLink link={createLinkView(link)} onMouseEnter={event => linkEnter(event, link)}/> :
            <ForceGraphLink link={createLinkView(link)} onMouseEnter={event => linkEnter(event, link)}/>)}

        <text className={classes.fontLink} zoomable x={textProps.x} y={textProps.y}>
            {textProps.text}
        </text>
    </ForceGraph>
};

export default GraphView;