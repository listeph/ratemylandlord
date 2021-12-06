import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from './HomePage';
import Header from './Header';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const appTheme = createTheme({
    spacing: 4,
    typography: {
      fontFamily: 'Helvetica Neue',
    },
});

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <div>
                    <div className="center">
                        <HomePage />
                    </div>
                    <div className="header">
                        <Header />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);