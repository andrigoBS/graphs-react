import React from 'react';
import TopBar from "./component/topbar/TopBar";
import GraphSpace from "./component/graphspace/GraphSpace";


function App() {

  return (
      <div >
          <TopBar/>
          <div align={"center"}>
              <GraphSpace/>
          </div>
      </div>
  );
}

export default App;
