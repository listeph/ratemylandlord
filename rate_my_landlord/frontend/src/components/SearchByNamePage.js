import React, { Component } from 'react';
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';

export default class SearchByNamePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [],
        }
        this.getMatchingLandlords();
    }

    getMatchingLandlords = () => {
        fetch('/api/get-all-landlords')
        .then((response) => response.json())
        .then((data) => this.setState({
            searchResults: data,
        }));
    }

    render() {
        let renderSearchResults = this.state.searchResults.map(
            (result) => {
                return (
                    <ListItem button component="a" href="/landlord/1">
                        <ListItemText
                            primary={result.first_name + " " + result.last_name}
                        />
                    </ListItem>
                );
            }
        );
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant="h4">
                        Search Results For xx
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <List>{renderSearchResults}</List>
                </Grid>
            </Grid>
        );
    }
}