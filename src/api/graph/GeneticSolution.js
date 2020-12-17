import Graph from "./Graph";

export default class GeneticSolution{
    constructor(graph, start, populationSize, mutationPercent, crossoverPercent) {
        this.graph = graph;
        this.start = start;
        this.history = [];
        this.population = [];
        this.populationSize = populationSize;
        this.mutationPercent =  mutationPercent;
        this.crossoverPercent = crossoverPercent
        this.epoch = 0;

        let nodes = graph.getVertexes();

        this.geneLength = nodes.length;

        for (let i = 0; i < populationSize; i++) {
            let individual = new Individual(this.geneLength, this.epoch);
            individual.randomStart(graph, nodes, start);
            this.population.push(individual);
        }
    }

    start(epoch){
        for (let i = 0; i < epoch; i++) {
            this.nextEpoch();
        }
        return this.getInfo();
    }

    nextEpoch(){
        this.history.push({
            epoch: this.epoch,
            population: this.population
        });

        for (let i = 0; i < this.population.length; i++) {
            for (let j = i; j < this.population.length; j++) {
                if(randomTrueFalsePercent(this.crossoverPercent)){
                    let [node1, node2] = this.population[i].crossoverCreate(this.population[j]);

                    let child1 = new Individual(this.geneLength, this.epoch);
                    if(randomTrueFalsePercent(this.mutationPercent)){
                        child1.setChromosomeWithMutation(node1, this.graph);
                    }else{
                        child1.setChromosome(node1, this.graph);
                    }

                    let child2 = new Individual(this.geneLength, this.epoch);
                    if(randomTrueFalsePercent(this.mutationPercent)){
                        child2.setChromosomeWithMutation(node2, this.graph);
                    }else{
                        child2.setChromosome(node2, this.graph);
                    }

                    this.population.push(child1);
                    this.population.push(child2);
                }
            }
        }

        this.population.sort((a, b) => a.fitnessCompare(b));

        let newPopulation = [];

        for (let i = 0; i < this.populationSize; i++) {
            newPopulation[i] = this.population[i];
        }

        this.population = newPopulation;

        this.epoch++;
    }

    getInfo(){
        return {
            info: this.history,
            finalEpoch: this.epoch,
            start: this.start,
            graph: this.graph,
            populationSize: this.populationSize,
            mutationPercent: this.mutationPercent,
            crossoverPercent: this.crossoverPercent
        }
    }
}

class Individual{
    constructor(geneLength, createdEpoch) {
        this.chromosome = new Graph();
        this.geneLength = geneLength;
        this.createdEpoch = createdEpoch;
    }

    randomStart(graph, nodes, start){
        let added = [];
        added.push(start);
        while(added.length !== this.geneLength){
            let index = randomInLimit(this.geneLength);
            let node = nodes[index];
            if(!added.includes(node)){
                added.push(node);
            }
        }
        added.push(start);

        this.setChromosome(added, graph);
    }

    setChromosomeWithMutation(crossover, graph){
        let index1 = randomInLimit(this.geneLength);
        let index2 = randomInLimit(this.geneLength);
        let aux = crossover[index1];
        crossover[index1] = crossover[index2];
        crossover[index2] = aux;
        this.setChromosome(crossover, graph);
    }

    setChromosome(crossover, graph){
        this.chromosome.addVertex(crossover[0]);
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

    crossoverCreate(parent2){
        let nodes1 = [];
        let nodes2 = [];

        let indexStart = randomInLimit(this.geneLength);
        let indexEnd = randomInLimit(this.geneLength);

        let chromosome1 = this.chromosome.getVertexes();
        let chromosome2 = parent2.chromosome.getVertexes();

        for (let i = indexStart; i < indexEnd; i++) {
            nodes1[i] = chromosome1[i];
            nodes2[i] = chromosome2[i];
        }

        let indexGene2 = indexEnd;
        for(let i = indexEnd; i < this.geneLength; i++){
            let gene = chromosome2[indexGene2];
            if(!nodes1.includes(gene)){
                nodes1[i] = gene;
            }
            indexGene2++;
            if(indexGene2 >= this.geneLength) indexGene2 = 0;
        }

        let indexGene1 = indexEnd;
        for(let i = indexEnd; i < this.geneLength; i++){
            let gene = chromosome1[indexGene1];
            if(!nodes2.includes(gene)){
                nodes2[i] = gene;
            }
            indexGene1++;
            if(indexGene1 >= this.geneLength) indexGene1 = 0;
        }

        return[nodes1, nodes2];
    }

    fitnessCompare(individual){
        let thisSum = this.chromosome.getTotalWeight();
        let individualSum = individual.chromosome.getTotalWeight();

        let thisNodes = this.chromosome.getVertexes();
        if(thisNodes[0] !== thisNodes[thisNodes.length-1]){
            thisSum += Number.MAX_SAFE_INTEGER;
        }
        let individualNodes = individual.chromosome.getVertexes();
        if(individualNodes[0] !== individualNodes[individualNodes.length-1]){
            individualSum += Number.MAX_SAFE_INTEGER;
        }

        if(thisSum < individualSum) return -1;
        if(thisSum > individualSum) return 1;
        return 0;
    }
}

const randomInLimit = (limit) => {
    return Math.floor(Math.random() * limit);
}

const randomTrueFalsePercent = (percent) => {
    return Math.random() * 100 <= percent;
}