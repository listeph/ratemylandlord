import React, { Component } from 'react';
import SearchByNamePage from './SearchByNamePage';
import FilterByRatingsPage from './FilterByRatingsPage';
import AddLandlordPage from './AddLandlordPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandlordDisplayPage from './LandlordDisplayPage';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><p>This is the home page</p></Route>
                    <Route path='/search' component={SearchByNamePage} />
                    <Route path='/filter' component={FilterByRatingsPage} />
                    <Route path='/add-landlord' component={AddLandlordPage} />
                    <Route path='/landlord/:id' component={LandlordDisplayPage} />
                </Switch>
            </Router>
        );
    }
}