import React, { Component } from 'react';
import { Button, Grid, List, ListItem, ListItemText, Slider, Typography } from '@material-ui/core';


export default class FilterByRatingsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [],
            currRatingFilter: 5,
            searchErrorMessage: ""
        }
        this.onSubmitSearch();
    }

    onSubmitSearch = () => {
        const { currRatingFilter } = this.state;
        fetch('/api/filter-landlords-by-rating?filterValue=' + currRatingFilter)
        .then((response) => response.json())
        .then((data) => {
            // Otherwise, show all matching landlords or an error message if no matches
            const { currSearchKey } = this.state;
            if (data.length === 0) {
                this.setState({
                    searchResults: [],
                    searchError: true,
                    searchErrorMessage: 'No search results found for overall ratings > ' + currRatingFilter,
                });
            } else {
                this.setState({
                    searchResults: data,
                    searchError: false,
                    searchErrorMessage: "",
                });
            }
        });
    }

    handleFilterChange = (e,v) => {
        this.setState({
            currRatingFilter: v
        });
        this.onSubmitSearch();
    }

    render() {
        let marks = Array.from(Array(11).keys()).map((key) => {return {label: key, value: key}});
        let renderFilterBar = (
            <Slider aria-label="Overall Rating Filter" step={1} min={0} max={10} defaultValue={5} 
                marks={marks} onChange={this.handleFilterChange}/>
        );
        let renderSearchErrorMessage = (
            <React.Fragment>
                <Typography component='h5' variant="h5">
                    {this.state.searchErrorMessage}
                </Typography>
            </React.Fragment>
        );
        let renderSearchResults = this.state.searchResults.map(
            (result) => {
                return (
                    <ListItem button component="a" href={"/landlord/filter/" + result.id}>
                        <ListItemText
                            primary={
                                <Typography component='h6' variant="h6">
                                    {result.first_name + " " + result.last_name}
                                </Typography>
                            }
                        />
                    </ListItem>
                );
            }
        );
        return (
            <Grid container spacing={2} style={{height: "100%"}}>
                <Grid item xs={12} align="center">{renderFilterBar}</Grid>
                <Grid item xs={12} align="center" style={{ display: this.state.searchError ? "" : "none" }}>
                    {renderSearchErrorMessage}
                </Grid>
                &emsp;
                <Grid item xs={12} align="center" style={{maxHeight: "75%", overflowY: "scroll"}}>
                    <List>{renderSearchResults}</List>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button size="small" href="/add-landlord" component="a">Can't find what you're looking for? Add a new landlord here!</Button>
                </Grid>
            </Grid>
        );
    }
}