import React from 'react';
import Graph from "./graph/Graph";


function App() {
    let graph = new Graph();

    const handleOnClick = () => {
        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");
        graph.addEdge("A","B",2,"AB");
        graph.addEdge("A","C",6,"AC");
        graph.addBow("C","B",5,"CB");
        graph.addVertex("D");
        graph.addBow("D","C",1,"DC");
        graph.addBow("D","B",3,"DB");
        graph.removeBow("CB");
        // graph.removeEdge("AB");
        graph.removeVertex("A");
        graph.showVertex();
    };
  return (
      <div>
          <h1>
              Graphs - React
          </h1>
          <button onClick={handleOnClick}>teste</button>
      </div>
  );
}

export default App;
