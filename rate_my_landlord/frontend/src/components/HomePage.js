import React, { Component } from 'react';
import SearchByNamePage from './SearchByNamePage';
import FilterByRatingsPage from './FilterByRatingsPage';
import AddLandlordPage from './AddLandlordPage';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

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
                    <Route path='/add' component={AddLandlordPage} />
                </Switch>
            </Router>
        );
    }
}