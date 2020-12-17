export default class LinkedList{
    constructor(headIndex, list) {
       this.head = null;
       this.headIndex = headIndex;
       this.createList(list);
    }

    createList(list){
        let node;
        let lastNode;
        let firstNode;
        for (let i = 0; i < list.length; i++) {
            node = new Node(list[i]);

            if (i !== 0){
                lastNode.next = node;
            }else {
                firstNode = node;
            }

            lastNode = node;

            if (i === this.headIndex){
                this.head = node;
            }

            if (i === list.length - 1){
                node.next = firstNode;
            }
        }
    }

    getElement(index){
        let node = this.head;
        console.log("index", index)
        for (let i = 0; i < index; i++){
            console.log("Node elemnent: ", node.element)
            node = node.next;
            console.log("node ", node)
        }
        // console.log("node element: ", node.element);
        console.log("node head: ", this.head)
        console.log("node head element: ", this.head.element)
        return node.element;
    }

}

class Node{
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}
