export default class Graph{
    constructor() {
        this.vertexes = {};
    }

    showVertex(){
        for (let key in this.vertexes){
            console.log(this.vertexes[key])
        }
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
        return !!this.vertexes[element1].nodes[element2];
    }

    getWeight(id){
        walkLinksId(this.vertexes, id, (element, key, keyNodes) => {
            return element.weight;
        });
    }

    getVerticesOfLink(id){
        walkLinksId(this.vertexes, id, (element, key, keyNodes) => {
            return [key, keyNodes];
        });
    }

    getAdjacentMatrix(){
        let matrix = [];
        let keys = Object.keys(this.vertexes);
        for(let i = 0; keys.length; i++){
            matrix[i] = [];
            for(let j = 0; j < keys.length; j++){
                matrix[i][j] = i !== j && this.isAdjacent(keys[i], keys[j])? 1 : 0;
            }
        }
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

const walkLinksId = (vertexes, id, callback) => {
    walkLinks(vertexes, (element, key, keyNodes) => {
        if(vertexes[key].nodes[keyNodes].id === id){
            return callback(vertexes[key].nodes[keyNodes], key, keyNodes);
        }
    })
}

const getLinksId = (vertexes) => {
    let links = [];
    walkLinks(vertexes, (element, key, keyNodes) => {
        if(!links.includes(element.id)) links.push(element.id);
    });
    return links;
}

const walkLinks = (vertexes, callback) => {
    for(let key in vertexes){
        for(let keyNodes in vertexes[key].nodes){
            let stop = callback(vertexes[key].nodes[keyNodes], key, keyNodes);
            if(stop) return;
        }
    }
}