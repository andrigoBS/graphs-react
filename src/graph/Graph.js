class Graph{
    constructor() {
        this.vertexes = {};
    }

    showVertex(){
        for(let key in this.vertexes){
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
        getLink(this.vertexes, id, (element, key, keyNodes) => {
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
        getLink(this.vertexes, id, (element, key, keyNodes) => {
            delete this.vertexes[key].nodes[keyNodes];
            count++;
            return count === 2;
        });
    }

    isAdjacent(element1, element2){
        return !!this.vertexes[element1].nodes[element2];
    }

    getWeight(id){
        getLink(this.vertexes, id, (element, key, keyNodes) => {
            return element.weight;
        });
    }

    getVerticesOfLink(id){
        getLink(this.vertexes, id, (element, key, keyNodes) => {
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
        // let matrix = [];
        // let verticesKeys = Object.keys(this.vertexes);
        // TypeLink[] linksKeys = (TypeLink[]) links.keySet().toArray();
        // for (int i = 0; i < verticesKeys.length; i++) {
        //     for (int j = 0; j < linksKeys.length; j++) {
        //         VertexLink link = links.get(linksKeys[j]);
        //         if(link.initialVertex.equals(verticesKeys[i])){
        //             matrix[i][j] = 1;
        //         }else if(link.finalVertex.equals(verticesKeys[i])){
        //             matrix[i][j] = link.isDriving? -1 : 1;
        //         }else{
        //             matrix[i][j] = 0;
        //         }
        //     }
        // }
        // return matrix;
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

const getLink = (vertexes, id, callback) => {
    for(let key in vertexes){
        for(let keyNodes in vertexes[key].nodes){
            if(vertexes[key].nodes[keyNodes].id === id){
                let stop = callback(vertexes[key].nodes[keyNodes], key, keyNodes);
                if(stop) return;
            }
        }
    }
}

export default Graph;