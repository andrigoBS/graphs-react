import React, {useEffect, useState} from 'react';
import {ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink, updateSimulation} from 'react-vis-force';
import {makeStyles, useTheme} from "@material-ui/core";
import {createSimulation} from "react-vis-force/src/utils/d3-force";

const style = makeStyles(theme => ({
    fontNode: {
        fontSize: "8px",
    },
    fontLink: {
        fontSize: "5px",
    }
}));

const nodeLabelRelativePosition = {
    x: (node) => -3,
    y: (node) => 3
};

const createNodeView = (node) => ({
    id: node.element,
    label: node.element
});

const createLinkView = (link) => ({
    source: link.initialVertex,
    target: link.finalVertex,
    strokeWidth: "0.3%",
});

const config = (height, width) => {
    let rects = document.getElementsByTagName("rect");
    for (let i = 0; i < rects.length; i++) {
        rects[i].setAttribute("transform", "scale(1.5)");
        // console.log(rects[i].getAttribute("transform"));
    }
    let gs = document.getElementsByTagName("g");
    for (let i = 0; i < gs.length; i++) {
        let transform = gs[i].getAttribute("transform");
        if(transform && transform.includes("matrix")){
            gs[i].setAttribute("transform","matrix(4 0 0 4 "+width*-1.5+" "+height*-1.5+")");
            // console.log(gs[i].getAttribute("transform"));
        }
    }
};

const GraphView = ({nodes, links, height}) => {
    const graphConfig = {
        width: "85%",
        height: height,
        // animate: true
    };

    const classes = style();
    const theme = useTheme();

    const [textProps, setTextProps] = useState({text: "", x:"0", y:"0"});
    const [shouldUpdate, setShould] = useState(false);

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

        config(options.height, options.width);

        setShould(false);

        simulation.strength = options.strength;
        simulation.shouldRun = true;

        return shouldUpdate? createSimulation(options) : updateSimulation(simulation, options);
    };

    useEffect(() => setShould(true), [nodes, links, height]);

    return <ForceGraph zoom showLabels
                       simulationOptions={graphConfig}
                       labelOffset={nodeLabelRelativePosition}
                       className={classes.fontNode}
                       updateSimulation={onUpdateSimulation}>
        {nodes.map(node => <ForceGraphNode node={createNodeView(node)}
                                           fill={theme.palette.primary.main}
                                           key={node.element}
                                           showLabel zoomable={"true"}/>)}
        {links.map(link => link.directed?
            <ForceGraphArrowLink link={createLinkView(link)}
                                 onMouseEnter={event => linkEnter(event, link)}
                                 key={link.id}
                                 zoomable={"true"}/> :
            <ForceGraphLink link={createLinkView(link)}
                            onMouseEnter={event => linkEnter(event, link)}
                            key={link.id}
                            zoomable={"true"}/>)}
        <text className={classes.fontLink} zoomable={"true"} x={textProps.x} y={textProps.y}>
            {textProps.text}
        </text>
    </ForceGraph>
};

export default GraphView;