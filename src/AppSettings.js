import React from 'react';
import Content from "./components/Content";
import {BrowserRouter as Router} from "react-router-dom";

const AppSettings = () => {
    return (
        <div className="container bg-app-black text-white">
            <Router>
                <Content/>
            </Router>
        </div>
    );
}

export default AppSettings;