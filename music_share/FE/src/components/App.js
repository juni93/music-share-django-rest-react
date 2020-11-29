import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";


const App = () => {
    return (
        <>
            <HomePage />
        </>
    )
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);