class Graph{
    constructor() {
        this.vertexes = [];
    }

    addVertex(element){
        this.vertexes.push(new Vertex(element));
    }
}

class Vertex{
    constructor(element) {
        this.element = element;
        this.links = [];
    }
}

class Link{
    constructor(id, weight, finalVertex) {
        this.id = id;
        this.weight = weight;
        this.finalVertex = finalVertex;
    }
}

export default Graph;