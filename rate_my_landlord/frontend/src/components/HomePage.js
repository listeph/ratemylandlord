import React, { Component } from "react";
import SearchByNamePage from "./SearchByNamePage";
import FilterByRatingsPage from "./FilterByRatingsPage";
import AddLandlordPage from "./AddLandlordPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandlordDisplayPage from "./LandlordDisplayPage";
import { Button, Typography } from "@material-ui/core";

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let renderHomePage = (
            <React.Fragment>
                <Typography component="h4" variant="h4">
                    Find a landlord:
                </Typography>
                <Button color="primary" href="/search" component="a" variant="contained">
                    <Typography component="h5" variant="h5" >
                        Search By Name
                    </Typography>
                </Button>
                &emsp;
                <hr />
                <Button color="primary" href="/filter" component="a" variant="contained">
                    <Typography component="h5" variant="h5">
                        Filter By Rating
                    </Typography>
                </Button>
            </React.Fragment>
        );
        return (
            <Router>
                <Switch>
                    <Route exact path="/">{renderHomePage}</Route>
                    <Route path="/search" component={SearchByNamePage} />
                    <Route path="/filter" component={FilterByRatingsPage} />
                    <Route path="/add-landlord" component={AddLandlordPage} />
                    <Route path="/landlord/:backPage/:id" component={LandlordDisplayPage} />
                </Switch>
            </Router>
        );
    }
}