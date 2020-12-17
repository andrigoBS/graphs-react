import Graph from "./Graph";
import LinkedList from "./LinkedList";

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

        console.log("seleção")

        this.population.sort((a, b) => a.fitnessCompare(b));

        let newPopulation = [];

        for (let i = 0; i < this.populationSize; i++) {
            newPopulation[i] = this.population[i];
        }

        this.population = newPopulation;

        this.best = this.population[0];

        this.epoch++;

        console.log(this.best, this.population)
    }

    getInfo(){
        return {
            result: this.best,
            history: this.history,
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
        this.chromosome = [];
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

        this.setChromosome(added, graph);

        console.log("random", this.chromosome);
        console.log("fitness", this.fitness);
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
        this.chromosome = crossover;
        let sum = 0;
        for (let index = 1; index < crossover.length; index++){
            let weight = Math.floor(Number.MAX_SAFE_INTEGER/2);
            let link = graph.vertexes[crossover[index - 1]].nodes[crossover[index]];
            if(link){
                weight = parseInt(link.weight);
            }
            sum += weight;
        }

        this.fitness = sum;
    }

    crossoverCreate(parent2){
        let indexStart = randomInLimit(this.geneLength);
        let indexEnd = randomInLimit(this.geneLength - indexStart) + indexStart;

        console.log("start", indexStart);
        console.log("end", indexEnd);

        const generateChild = (parentCircular, child) => {
            let circularIndex = 0;
            for (let i = indexEnd; i < this.geneLength - 1; i++) {
                let gene = parentCircular.getElement(circularIndex++);
                while(child.includes(gene)){
                    gene = parentCircular.getElement(circularIndex++);
                }
                child[i] = gene;
            }

            for (let i = 1; i < indexStart; i++) {
                let gene = parentCircular.getElement(circularIndex++);
                while(child.includes(gene)){
                    gene = parentCircular.getElement(circularIndex++);
                }
                child[i] = gene;
            }
            return child;
        }

        let chromosome1 = this.chromosome.slice(1, this.geneLength - 1);
        let chromosome2 = parent2.chromosome.slice(1, this.geneLength - 1);

        console.log("cromossomo 1: ", chromosome1)
        console.log("cromossomo 2: ", chromosome2)

        let parentCircular1 = new LinkedList(indexEnd - 1, chromosome1);
        let parentCircular2 = new LinkedList(indexEnd - 1, chromosome2);

        let child1 = [];
        let child2 = [];

        child1.push(parent2.chromosome[0])
        child2.push(this.chromosome[0])

        for (let i = indexStart; i < indexEnd; i++) {
            child1[i] = parent2.chromosome[i];
            child2[i] = this.chromosome[i];
        }

        child1 = generateChild(parentCircular1, child1);
        child2 = generateChild(parentCircular2, child2);

        child1.push(parent2.chromosome[0])
        child2.push(this.chromosome[0])

        return [child1, child2];
    }

    fitnessCompare(individual){
        let thisSum = this.getFitness();
        let individualSum = individual.getFitness();

        let thisNodes = this.chromosome;
        if(thisNodes[0] !== thisNodes[thisNodes.length-1]){
            thisSum += Number.MAX_SAFE_INTEGER;
        }
        let individualNodes = individual.chromosome;
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
