import Graph from "./Graph";

export default class GeneticSolution{
    constructor(graph, startElement, populationSize, mutationPercent, crossoverPercent) {
        this.graph = graph;
        this.startElement = startElement;
        this.history = [];
        this.population = [];
        this.populationSize = populationSize;
        this.mutationPercent =  mutationPercent;
        this.crossoverPercent = crossoverPercent
        this.epoch = 0;

        let nodes = graph.getVertexesWithoutInaccessible();

        this.geneLength = nodes.length;
        if(this.geneLength < 2) return;

        for (let i = 0; i < populationSize; i++) {
            let individual = new Individual(this.geneLength, this.epoch);
            individual.randomStart(graph, nodes, startElement);
            this.population.push(individual);
        }

        this.population.sort((a, b) => a.fitnessCompare(b));

        this.best = this.population[0];
    }

    start(epoch){
        if(this.geneLength < 2) return;
        for (let i = 0; i < epoch; i++) {
            this.nextEpoch();
        }
        return this.getInfo();
    }

    nextEpoch(){
        this.history.push({
            generation: this.epoch,
            individuals: this.population,
            best: this.best
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

                    console.log("parent1", node1);

                    let child2 = new Individual(this.geneLength, this.epoch);
                    if(randomTrueFalsePercent(this.mutationPercent)){
                        child2.setChromosomeWithMutation(node2, this.graph);
                    }else{
                        child2.setChromosome(node2, this.graph);
                    }

                    console.log("parent2", node2);

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

        this.best = this.population[0];

        this.epoch++;
    }

    getInfo(){
        return {
            result: this.best,
            info: this.history,
            finalEpoch: this.epoch,
            start: this.startElement,
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
        this.fitness = 0;
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

        console.log("random", added);

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
            console.log(crossover[index - 1])
            let link = graph.vertexes[crossover[index - 1]].nodes[crossover[index]];
            if(link){
                weight = link.weight;
                id = link.id;
            }
            this.chromosome.addBow(crossover[index - 1], crossover[index], weight, id);
        }

        this.fitness = this.chromosome.getTotalWeight();
    }

    crossoverCreate(parent2){
        let nodes1 = [];
        let nodes2 = [];

        let indexStart = randomInLimit(this.geneLength);
        let indexEnd = randomInLimit(this.geneLength);

        let chromosome1 = this.chromosome.getVertexesWithoutInaccessible();
        let chromosome2 = parent2.chromosome.getVertexesWithoutInaccessible();

        for (let i = indexStart; i < indexEnd; i++) {
            nodes1[i] = chromosome1[i];
            nodes2[i] = chromosome2[i];
        }

        nodes1 = chromosome1;
        nodes2 = chromosome2;


        // let indexGene2 = indexEnd;
        // for(let i = indexEnd; i < this.geneLength; i++){
        //     let gene = chromosome2[indexGene2];
        //     if(!nodes1.includes(gene)){
        //         nodes1[i] = gene;
        //     }
        //     indexGene2++;
        //     if(indexGene2 >= this.geneLength) indexGene2 = 0;
        // }
        //
        // for(let i = 0; i < indexStart; i++){
        //     let gene = chromosome2[indexGene2];
        //     if(!nodes1.includes(gene)){
        //         nodes1[i] = gene;
        //     }
        //     indexGene2++;
        //     if(indexGene2 >= this.geneLength) indexGene2 = 0;
        // }
        //
        // let indexGene1 = indexEnd;
        // for(let i = indexEnd; i < this.geneLength; i++){
        //     let gene = chromosome1[indexGene1];
        //     if(!nodes2.includes(gene)){
        //         nodes2[i] = gene;
        //     }
        //     indexGene1++;
        //     if(indexGene1 >= this.geneLength) indexGene1 = 0;
        // }
        //
        // for(let i = 0; i < indexStart; i++){
        //     let gene = chromosome1[indexGene1];
        //     if(!nodes2.includes(gene)){
        //         nodes2[i] = gene;
        //     }
        //     indexGene1++;
        //     if(indexGene1 >= this.geneLength) indexGene1 = 0;
        // }

        return[nodes1, nodes2];
    }

    fitnessCompare(individual){
        let thisSum = this.getFitness();
        let individualSum = individual.getFitness();

        let thisNodes = this.chromosome.getVertexesWithoutInaccessible();
        if(thisNodes[0] !== thisNodes[thisNodes.length-1]){
            thisSum += Number.MAX_SAFE_INTEGER;
        }
        let individualNodes = individual.chromosome.getVertexesWithoutInaccessible();
        if(individualNodes[0] !== individualNodes[individualNodes.length-1]){
            individualSum += Number.MAX_SAFE_INTEGER;
        }

        if(thisSum < individualSum) return -1;
        if(thisSum > individualSum) return 1;
        return 0;
    }

    getFitness(){
        return this.fitness;
    }
}

const randomInLimit = (limit) => {
    return Math.floor(Math.random() * limit);
}

const randomTrueFalsePercent = (percent) => {
    return Math.random() * 100 <= percent;
}