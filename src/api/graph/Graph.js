class Vertex{
    constructor(element) {
        this.element = element;
        this.nodes = {};
    }
}

class Node{
    constructor(id, weight, finalVertex) {
        this.id = id;
        this.weight = weight;
        this.finalVertex = finalVertex;
    }
}

export default class Graph{
    constructor() {
        this.vertexes = {};
    }

    addVertex(element){
        this.vertexes[element] = new Vertex(element);
    }

    removeVertex(element){
        if(this.vertexes[element]){
            for(let key in this.vertexes){
                delete this.vertexes[key].nodes[element];
            }
            delete this.vertexes[element];
        }
    }

    addBow(element1, element2, weight, id){
        if(this.vertexes[element1] && this.vertexes[element2]){
            this.vertexes[element1].nodes[element2] = new Node(id, weight, element2);
        }
    }

    removeBow(id){
        walkLinksId(this.vertexes, id, (element, key, keyNodes) => {
            delete this.vertexes[key].nodes[keyNodes];
            return true;
        });
    }

    addEdge(element1, element2, weight, id){
        this.addBow(element1, element2, weight, id);
        this.addBow(element2, element1, weight, id);
    }

    removeEdge(id){
        let count = 0;
        walkLinksId(this.vertexes, id, (element, key, keyNodes) => {
            delete this.vertexes[key].nodes[keyNodes];
            count++;
            return count === 2;
        });
    }

    isAdjacent(element1, element2){
        return this.vertexes[element1] && this.vertexes[element1].nodes[element2];
    }

    getWeight(id){
        walkLinksId(this.vertexes, id, (element, key, keyNodes) => {
            return element.weight;
        });
    }

    getAdjacentMatrix(){
        let matrix = [];
        let keys = Object.keys(this.vertexes);
        for(let i = 0; i < keys.length; i++){
            matrix[i] = [];
            for(let j = 0; j < keys.length; j++){
                matrix[i][j] = i !== j && this.isAdjacent(keys[i], keys[j])? 1 : 0;
            }
        }
        return matrix;
    }

    getIncidenceMatrix(){
        let verticesKeys = Object.keys(this.vertexes);
        let linksId = getLinksId(this.vertexes);
        let matrix = [];
        for (let i = 0; i < verticesKeys.length; i++) {
            matrix[i] = Array(linksId.length);
            for(let j = 0; j < linksId.length; j++) {
                matrix[i][j] = 0;
            }
        }
        for (let i = 0; i < verticesKeys.length; i++) {
            for(let j = 0; j < verticesKeys.length; j++) {
                if (this.isAdjacent(verticesKeys[i], verticesKeys[j])) {
                    let idInit = this.vertexes[verticesKeys[i]].nodes[verticesKeys[j]].id;
                    let linkIndex = linksId.indexOf(idInit);
                    matrix[i][linkIndex] = 1;
                    if (this.isAdjacent(verticesKeys[j], verticesKeys[i])){
                        matrix[j][linkIndex] = 1;
                    }else {
                        matrix[j][linkIndex] = -1;
                    }
                }
            }
        }
        return matrix;
    }

    getMinTreePrim(){
        let keys = Object.keys(this.vertexes);
        let visitedVertexes = [];
        visitedVertexes.push(keys[0]);

        let notVisitedVertexes = [...keys];
        notVisitedVertexes.splice(0,1);

        let linksMinTree = [];

        while (visitedVertexes.length < Object.keys(this.vertexes).length) {
            let minWeight = Number.MAX_SAFE_INTEGER;
            let saveMinLinks = {};

            for(let j = 0; j < visitedVertexes.length; j++) {
                if(this.vertexes[visitedVertexes[j]] && Object.keys(this.vertexes[visitedVertexes[j]].nodes).length > 0){
                    for(let k = 0; k < notVisitedVertexes.length; k++) {
                        let link = this.vertexes[visitedVertexes[j]].nodes[notVisitedVertexes[k]];
                        let weightJK = link? link.weight: undefined;
                        if(weightJK && weightJK < minWeight){
                            minWeight = weightJK;
                            saveMinLinks = {j, k};
                        }
                    }
                }
            }

            linksMinTree.push({initial: visitedVertexes[saveMinLinks.j], final: notVisitedVertexes[saveMinLinks.k]});
            visitedVertexes.push(notVisitedVertexes[saveMinLinks.k]);
            notVisitedVertexes.splice(saveMinLinks.k, 1);
        }

        let minTree =  new Graph();
        let totalWeight = 0;

        for(let link of linksMinTree){
            if(link.initial){
                if(!minTree.vertexes[link.initial]) minTree.addVertex(link.initial);
                if(!minTree.vertexes[link.final]) minTree.addVertex(link.final);

                let linkOriginal = this.vertexes[link.initial].nodes[link.final];
                minTree.addBow(link.initial, link.final, linkOriginal.weight, linkOriginal.id);
                totalWeight += parseInt(linkOriginal.weight);
            }
        }

        return {minTree: minTree.getVertexAndLinks(), totalWeight};
    }

    getDepthSearch(element){
        let startElement = Object.keys(this.vertexes)[0]
        if(startElement !== undefined){
            let graph = new Graph();
            this._privateBP(graph, startElement, element);
            return graph.getVertexAndLinks();
        }
        return {links: [], nodes: []};
    }

    _privateBP(graph, current, element){
        if(current === element) return true;
        if(!graph.vertexes[current]) graph.addVertex(current);
        let keys = Object.keys(this.vertexes[current].nodes);
        for(let key of keys){
            if(!graph.vertexes[key]){
                graph.addVertex(key);
                let link = this.vertexes[current].nodes[key];
                graph.addBow(current, key, link.weight, link.id);
                if(this._privateBP(graph, key)) break;
            }
        }
    }

    getWidthSearch(element){
        let graph = new Graph();
        let q = [];
        let startElement = Object.keys(this.vertexes)[0];
        if (startElement !== undefined){
            graph.addVertex(startElement);
            q.push(startElement);
            while(q.length !== 0){
                let v = q.shift();
                if(v === element) return graph.getVertexAndLinks();
                let keys = Object.keys(this.vertexes[v].nodes);
                for(let w of keys) {
                    if(!graph.vertexes[w]){
                        graph.addVertex(w);
                        let link = this.vertexes[v].nodes[w];
                        graph.addBow(v, w, link.weight, link.id);
                        q.push(w);
                    }
                }
            }
            return graph.getVertexAndLinks();
        }
      return {links: [], nodes: []}
    }

    getMinimumPath(initialVertex, finalVertex, h){
        const minF = (fs) => {
            let min = fs[0];
            fs.forEach((current) => {
                console.log("current " + current.vertex)
               if(current.f < min.f) min = current;
            });

            console.log("MinF fs = " + min)
            return min;
        }


        const g = (node, path) => {
            let sum = 0;
            for (let i = 0; i < path.length; i++) {
                if(this.isAdjacent(path[i], node)){
                    return sum + this.vertexes[path[i]].nodes[node].weight;
                }else{
                    sum += this.vertexes[path[i]].nodes[path[i + 1]].weight;
                }
            }
        }

        const pushAll = (dictionary, vector) => {
            for (let elementKey in dictionary) {
                if(!vector.includes(elementKey)){
                    vector.push(elementKey);
                }
            }
        }

        const getGraph = (path) => {
            let graph = new Graph();

            path.forEach(element => {
               graph.addVertex(element);
            });

            for (let i = 0; i < path.length - 1; i++) {
                let original = this.vertexes[path[i]].nodes[path[i + 1]];
                graph.addBow(path[i], path[i + 1], original.weight, original.id);
            }

            return graph;
        }

        let allNodes = [initialVertex];
        pushAll(this.vertexes[initialVertex].nodes, allNodes);
        let path = [initialVertex];

        while (allNodes.length <= Object.keys(this.vertexes).length){
            let fs = []
            allNodes.forEach((node) => {
                if(!path.includes(node)){
                    let f = g(node, path) + h(initialVertex, node);
                    fs.push({vertex: node, f});
                }
            });

            let min = minF(fs);
            console.log("fs", fs);
            console.log("min", min);
            path.push(min.vertex);
            if(min.vertex === finalVertex) return getGraph(path).getVertexAndLinks();

            pushAll(this.vertexes[min.vertex].nodes, allNodes);

            console.log("all", allNodes);
            console.log("path", path);
        }

        // if (this.vertexes[finalVertex] !== undefined &&
        //     this.vertexes[initialVertex] !== undefined) {
        //
        //     let currentNode = this.vertexes[initialVertex];
        //     let path = [currentNode];
        //     let isFinished = false;
        //     let notGo = [];
        //
        //     while (!isFinished) {
        //         if (currentNode.element === finalVertex) {
        //             return path;
        //         }
        //         if (currentNode.nodes !== undefined){
        //             let currentFs = [];
        //             let extraG = 0;
        //             for (let i = 0; i < path.length - 1; i++) {
        //                 extraG = this.vertexes[path[i].element].nodes[path[i + 1].element].weight;
        //             }
        //             for (let nodeKey in currentNode.nodes) {
        //                 if (!notGo.includes(nodeKey)){
        //                     let g = currentNode.nodes[nodeKey].weight;
        //                     g += extraG;
        //                     let f = g + hValue[nodeKey];
        //                     currentFs.push({vertex: nodeKey, valueF: f});
        //                 }
        //
        //             }
        //             currentFs.sort((a, b) => {
        //                 if (a.valueF < b.valueF) return -1;
        //                 return a.valueF > b.valueF ? 1 : 0;
        //             });
        //             let min = currentFs[0];
        //
        //             currentNode = this.vertexes[min.vertex];
        //             path.push(currentNode);
        //         }else {
        //             currentNode = path[path.length - 1];
        //             notGo.push(currentNode.element);
        //             path.pop();
        //         }
        //         return path;
        //     }
        // }
        // return "falhou";
    }


    getComponents(){
        let graphList = [];
        let vertexes = Object.keys(this.vertexes);
        let targetPositiveVertex = [];
        let targetNegativeVertex = [];
        let i = 0;

        while(vertexes.length !== 0) {
            let newGraph = new Graph();
            if (!targetNegativeVertex.includes(vertexes[i])){
                targetNegativeVertex.push(vertexes[i]);
            }

            if (!targetPositiveVertex.includes(vertexes[i])){
                targetPositiveVertex.push(vertexes[i]);
            }

            this._getSuccessors(targetPositiveVertex,vertexes);

            this._getPredecessors(targetNegativeVertex,vertexes);

            targetPositiveVertex.filter((current) => targetNegativeVertex.includes(current))
                .forEach((current) => {
                    let currentPositiveIndex = targetPositiveVertex.indexOf(current);
                    targetPositiveVertex.splice(currentPositiveIndex, 1);

                    let currentNegativeIndex = targetNegativeVertex.indexOf(current);
                    targetNegativeVertex.splice(currentNegativeIndex, 1);

                    let currentVertexIndex = vertexes.indexOf(current);
                    vertexes.splice(currentVertexIndex, 1);

                    newGraph.addVertex(current);
                });

            i++;

            for (let j of Object.keys(newGraph.vertexes)) {
                for (let k of Object.keys(newGraph.vertexes)) {
                    let bow = this.vertexes[j] && this.vertexes[j].nodes[k];
                    if(bow){
                        newGraph.addBow(j, k, bow.weight, bow.id);
                    }
                }
            }
            graphList.push(newGraph.getVertexAndLinks());
        }
        return graphList;
    }

    _getPredecessors(targetNegativeVertex,vertexes){
        let negatives = [];

        for (let i = 0; i < vertexes.length; i++) {
            let element = this.vertexes[targetNegativeVertex[targetNegativeVertex.length - 1]];
            if (element && element.nodes[vertexes[i]] !== undefined
                && !targetNegativeVertex.includes(vertexes[i])){
                negatives.push(vertexes[i]);
            }
        }

        for (let i = 0; i < negatives.length; i++) {
            targetNegativeVertex.push(negatives[i]);
            this._getPredecessors(targetNegativeVertex, vertexes);
        }

        return targetNegativeVertex;
    }

    _getSuccessors(targetPositiveVertex,vertexes){
        for (let i = 0; i < vertexes.length; i++) {
            if(this.vertexes[vertexes[i]].nodes[targetPositiveVertex[targetPositiveVertex.length - 1]] !== undefined &&
                !targetPositiveVertex.includes(vertexes[i])){
                targetPositiveVertex.push(vertexes[i]);
                this._getSuccessors(targetPositiveVertex, vertexes);
            }
        }
        return targetPositiveVertex;
    }

    getWelshPowellColors(){
        let sortedByAdjacentDegree = [];

        for (let vertexKey in this.vertexes) {
            sortedByAdjacentDegree.push({vertexKey, adjacentCount: Object.keys(this.vertexes[vertexKey].nodes).length});
        }

        sortedByAdjacentDegree.sort((a, b) => {
            if (a.adjacentCount < b.adjacentCount) return 1;
            return a.adjacentCount > b.adjacentCount? -1 : 0;
        });

        //console.log("sorted", sortedByAdjacentDegree);

        let colors = {};
        let colorIndex = 0;

        while (sortedByAdjacentDegree.length > 0){
            colors[sortedByAdjacentDegree[0].vertexKey] = colorIndex;
            sortedByAdjacentDegree.splice(0, 1);

            for (let i = 0; i < sortedByAdjacentDegree.length; i++){
                let item = sortedByAdjacentDegree[i];
                let canPaint = true;
                for (let colorKey in colors) {
                    //console.log(item.vertexKey, colorKey);
                    if(colorIndex === colors[colorKey] && this.isAdjacent(item.vertexKey, colorKey)) {
                        canPaint = false;
                        break;
                    }
                }
                if(canPaint){
                    colors[item.vertexKey] = colorIndex;
                    sortedByAdjacentDegree.splice(i, 1);
                }
            }

            colorIndex++;
        }

        return colors;
    }

    getVertexAndLinks(){
        let verticesKeys = Object.keys(this.vertexes);
        let nodes = [];
        for (let i = 0; i < verticesKeys.length; i++){
            let node = this.vertexes[verticesKeys[i]];
            nodes[i] = {element: node.element};
        }
        let links = [];
        let ids = [];
        walkLinks(this.vertexes, (element, key, keyNodes) => {
            if (ids.includes(element.id)) {
                links[ids.indexOf(element.id)].directed = false;
            } else {
                ids.push(element.id);
                element.initialVertex = key;
                element.directed = true;
                links.push(element);
            }
        });
        return {nodes, links};
    }
}

const walkLinksId = (vertexes, id, callback) => {
    walkLinks(vertexes, (element, key, keyNodes) => {
        if(vertexes[key] && vertexes[key].nodes[keyNodes].id === id){
            return callback(vertexes[key].nodes[keyNodes], key, keyNodes);
        }
    })
};

const getLinksId = (vertexes) => {
    let links = [];
    walkLinks(vertexes, (element, key, keyNodes) => {
        if(!links.includes(element.id)) links.push(element.id);
    });
    return links;
};

const walkLinks = (vertexes, callback) => {
    for(let key in vertexes){
        for(let keyNodes in vertexes[key].nodes){
            let stop = callback(vertexes[key].nodes[keyNodes], key, keyNodes);
            if(stop) return;
        }
    }
};
