import Graph from "./Graph";

export default class GeneticSolution{
    constructor(graph, start, populationSize) {
        this.graph = graph;
        this.start = start;
        this.population = [];
        this.populationSize = populationSize;
        this.epoch = 0;

        let nodes = graph.getVertexes();

        this.graphNodesLength = nodes.length;

        for (let i = 0; i < populationSize; i++) {
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
    constructor(graphNodesLength) {
        this.chromosome = new Graph();
        this.graphNodesLength = graphNodesLength;
    }

    randomStart(graph, nodes, start){
        let added = [];
        added.push(start);
        while(added.length !== this.graphNodesLength){
            let index = this._randomInNodesLength();
            let node = nodes[index];
            if(!added.includes(node)){
                added.push(node);
            }
        }
        added.push(start);

        this.setChromosome(added, graph);
    }

    crossoverStart(parent1, parent2){
        let nodes = [];
        let indexStart = this._randomInNodesLength();
        let indexEnd = this._randomInNodesLength();
    }

    setChromosome(crossover, graph){
        for (let index = 1; index < crossover.length; index++){
            this.chromosome.addVertex(crossover[index]);
            let weight = Number.MAX_SAFE_INTEGER;
            let id = crossover[index - 1] + crossover[index];
            let link = graph.vertexes[crossover[index - 1]].nodes[crossover[index]];
            if(link){
                weight = link.weight;
                id = link.id;
            }
            this.chromosome.addBow(crossover[index - 1], crossover[index], weight, id);
        }
    }

    _randomInNodesLength(){
        return Math.floor(Math.random() * this.graphNodesLength);
    }
}