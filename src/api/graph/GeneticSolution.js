import Graph from "./Graph";

export default class GeneticSolution{
    constructor(graph, start) {
        this.start = start;
        this.population = [];
        this.epoch = 0;

        let [nodes, links] = graph.getVertexAndLinks();
        for (let i = 0; i < 100; i++) {
            let individual = new Individual();
            individual.randomStart(graph, nodes, start);
            this.population.push(individual);
        }
    }

    nextEpoch(){
        //cruzamento
        //mutação
        //seleção
        this.epoch++;
    }

    getInfo(){

    }
}

class Individual{
    constructor() {
        this.route = new Graph();
    }

    randomStart(graph, nodes, start){
        let added = [];
        added.push(start);
        while(added.length !== nodes.length){
            let index = Math.floor(Math.random() * nodes.length);
            let node = nodes[index];
            if(!added.includes(node)){
                added.push(node);
            }
        }
        added.push(start);

        for (let index = 1; index < added.length; index++){
            this.route.addVertex(added[index]);
            let weight = Number.MAX_SAFE_INTEGER;
            let id = added[index - 1] + added[index];
            let link = graph.vertexes[added[index - 1]].nodes[added[index]];
            if(link){
                weight = link.weight;
                id = link.id;
            }
            this.route.addBow(added[index - 1], added[index], weight, id);
        }
    }


}