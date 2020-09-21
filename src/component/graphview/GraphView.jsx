import React from 'react';
import { ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink } from 'react-vis-force';

const GraphView = ({graph, width, height}) => {
    let graphView = graph.getVertexAndLinks();
    console.log(graph, graphView);
    let nodes = [];
    for (let i = 0; i < graphView.nodes.length; i++){
        let node = graphView.nodes[i];
        node.color = "#9c27b0";
        nodes[i] = node;
    }
    let links = graphView.links;

    console.log(nodes, links);

    return <ForceGraph simulationOptions={{ height: height, width: width }}>
        {nodes.map(node => <ForceGraphNode node={{ id: node.element, label: node.element }} fill={node.color} />)}
        {links.map(link => link.directed?
            <ForceGraphLink link={{ source: link.initialVertex, target: link.finalVertex }}/> :
            <ForceGraphArrowLink link={{ source: link.initialVertex, target: link.finalVertex }}/>)}
    </ForceGraph>
}


export default GraphView;