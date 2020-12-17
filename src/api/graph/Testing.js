import LinkedList from "./LinkedList";

export default class Testing{
    teste(){
        let indexStart = 3;
        let indexEnd = 6;

        const generateChild = (length, parentCircular, child) => {
            let circularIndex = 0;
            for (let i = indexEnd; i < length; i++) {
                let gene = parentCircular.getElement(circularIndex++);
                while(child.includes(gene)){
                    gene = parentCircular.getElement(circularIndex++);
                }
                child[i] = gene;
            }
            for (let i = 0; i < indexStart; i++) {
                let gene = parentCircular.getElement(circularIndex++);
                while(child.includes(gene)){
                    gene = parentCircular.getElement(circularIndex++);
                }
                child[i] = gene;
            }
            return child;
        }

        let parent1 = [1,2,3,4,5,6,7,8,9];
        let parent2 = [4,3,2,1,8,5,6,7,9];

        let parentCircular1 = new LinkedList(indexEnd, parent1);
        let parentCircular2 = new LinkedList(indexEnd, parent2);

        let child1 = [];
        let child2 = [];

        for (let i = indexStart; i < indexEnd; i++) {
            child1[i] = parent2[i];
            child2[i] = parent1[i];
        }

        child1 = generateChild(parent1.length, parentCircular1, child1);
        child2 = generateChild(parent2.length, parentCircular2, child2);

        console.log(child1);
        console.log(child2);
    }
}
