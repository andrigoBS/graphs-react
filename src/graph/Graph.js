class Graph{
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
        for(let key in this.vertexes){
            for(let keyNodes in this.vertexes[key].nodes){
                if(this.vertexes[key].nodes[keyNodes].id === id){
                    delete this.vertexes[key].nodes[keyNodes];
                    return;
                }
            }
        }
    }

    addEdge(element1, element2, weight, id){
        this.addBow(element1, element2, weight, id);
        this.addBow(element2, element1, weight, id);
    }

    removeEdge(id){
        for(let key in this.vertexes){
            for(let keyNodes in this.vertexes[key].nodes){
                if(this.vertexes[key].nodes[keyNodes].id === id){
                    delete this.vertexes[key].nodes[keyNodes];
                }
            }
        }
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

export default Graph;