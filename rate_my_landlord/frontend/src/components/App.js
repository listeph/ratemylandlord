import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from './HomePage';
import Header from './Header';
import { Router } from "@material-ui/icons";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        return (
            <div>
                <div className = "center">
                    <HomePage />
                </div>

                <div className = "Header">
                    <Header />
                </div>
                
            </div>
        );
    }

}

const appDiv = document.getElementById("app");
render(<App />, appDiv);








