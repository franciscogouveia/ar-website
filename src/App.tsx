import React from 'react';
import {MyARCanvas} from "./components/canvas/CustomARCanvas";
import { MyScene } from './MyScene';

function App() {
    const sessionInit = {
        requiredFeatures: ["local-floor", "hit-test"],
    };

    return (
      <MyARCanvas sessionInit={sessionInit} >
        <MyScene />
      </MyARCanvas>
    );
}

export default App;
