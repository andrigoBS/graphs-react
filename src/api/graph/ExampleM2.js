import Graph from "./Graph";

export default function exampleM2(){
    let vertexes = {
        A:{ x:950, y:231 },
        B:{ x:607, y: 486 },
        C:{ x:891, y: 762 },
        D:{ x:15, y: 747 },
        E:{ x:466, y: 419 },
        F:{ x:615, y: 792 },
        G:{ x:922, y: 738 },
        H:{ x:176, y: 406 },
        I:{ x:272, y: 199 },
        J:{ x:410, y: 894 },
        K:{ x:58, y: 353 },
        L:{ x:199, y: 604 },
        M:{ x:139, y: 203 },
        N:{ x:846, y: 525 },
        O:{ x:203, y: 672 }
    };

    const tableH = (vertex1, vertex2) => {
        return Math.abs(vertex1.x - vertex2.x) +
            Math.abs(vertex1.y - vertex2.y);
    }

    const h = (name1, name2) => {
        return tableH(vertexes[name1], vertexes[name2])
    }

    let graph = new Graph(h);

    for (let vertexKey in vertexes) {
        graph.addVertex(vertexKey);
    }

    graph.addEdge("A", "B",
        tableH(vertexes["A"], vertexes["B"]) + 10,
        "AB");
    graph.addEdge("A", "N",
        tableH(vertexes["A"], vertexes["N"]) + 10,
        "AN");
    graph.addEdge("A", "G",
        tableH(vertexes["A"], vertexes["G"]) + 10,
        "AG");

    graph.addEdge("B", "E",
        tableH(vertexes["B"], vertexes["E"]) + 10,
        "BE");
    graph.addEdge("B", "N",
        tableH(vertexes["B"], vertexes["N"]) + 10,
        "BN");
    graph.addEdge("B", "F",
        tableH(vertexes["B"], vertexes["F"]) + 10,
        "BF");
    graph.addEdge("B", "J",
        tableH(vertexes["B"], vertexes["J"]) + 10,
        "BJ");

    graph.addEdge("C", "G",
        tableH(vertexes["C"], vertexes["G"]) + 10,
        "CG");
    graph.addEdge("C", "F",
        tableH(vertexes["C"], vertexes["F"]) + 10,
        "CF");

    graph.addEdge("D", "K",
        tableH(vertexes["D"], vertexes["K"]) + 10,
        "DK");
    graph.addEdge("D", "H",
        tableH(vertexes["D"], vertexes["H"]) + 10,
        "DH");
    graph.addEdge("D", "L",
        tableH(vertexes["D"], vertexes["L"]) + 10,
        "DL");
    graph.addEdge("D","O",
        tableH(vertexes["D"],vertexes["O"]) + 10,
        "DO");
    graph.addEdge("D","J",
        tableH(vertexes["D"],vertexes["J"]) + 10,
        "DJ");

    graph.addEdge("E","I",
        tableH(vertexes["E"],vertexes["I"]) + 10,
        "EI");

    graph.addEdge("E","L",
        tableH(vertexes["E"],vertexes["L"]) + 10,
        "EL");

    graph.addEdge("F","J",
        tableH(vertexes["F"],vertexes["J"]) + 10,
        "FJ");

    graph.addEdge("F","N",
        tableH(vertexes["F"],vertexes["N"]) + 10,
        "FN");

    graph.addEdge("G","N",
        tableH(vertexes["G"],vertexes["N"]) + 10,
        "GN");


    graph.addEdge("H","I",
        tableH(vertexes["H"],vertexes["I"]) + 10,
        "HI");
    graph.addEdge("H","L",
        tableH(vertexes["H"],vertexes["L"]) + 10,
        "HL");


    graph.addEdge("I","M",
        tableH(vertexes["I"],vertexes["M"]) + 10,
        "IM");


    graph.addEdge("J","O",
        tableH(vertexes["J"],vertexes["O"]) + 10,
        "JO");


    graph.addEdge("K","M",
        tableH(vertexes["K"],vertexes["M"]) + 10,
        "KM");

    graph.addEdge("L","O",
        tableH(vertexes["L"],vertexes["O"]) + 10,
        "LO");

    return graph;
}