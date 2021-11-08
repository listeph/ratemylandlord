import React, { Component } from 'react';
import { Grid, List, ListItem, ListItemText, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';

export default class SearchByNamePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [],
            currSearchKey: "",
            submittedSearchKey: "",
            searchError: false,
            searchErrorMessage: "",
        }
    }

    onSubmitSearch = () => {
        const { currSearchKey } = this.state;
        if (currSearchKey.length === 0) {
            // If nothing entered on search bar, show all landlords
            fetch('/api/get-all-landlords')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    searchResults: data,
                    searchError: false,
                    searchErrorMessage: "",
                    submittedSearchKey: currSearchKey,
                });
            });
        } else {
            fetch('/api/get-matching-landlords?searchkey=' + currSearchKey)
            .then((response) => response.json())
            .then((data) => {
                // Otherwise, show all matching landlords or an error message if no matches
                const { currSearchKey } = this.state;
                if (data.length === 0) {
                    this.setState({
                        searchResults: [],
                        searchError: true,
                        searchErrorMessage: 'No search results found for "' + currSearchKey + '"',
                        submittedSearchKey: currSearchKey,
                    });
                } else {
                    this.setState({
                        searchResults: data,
                        searchError: false,
                        searchErrorMessage: "",
                        submittedSearchKey: currSearchKey,
                    });
                }
            });
        }
    }

    onEditSearch = (e) => {
        this.setState({
            currSearchKey: e.target.value,
        });
    }

    render() {
        let renderSearchBar = (
            <TextField 
                label="Search Landlords"
                onChange={this.onEditSearch}
                onKeyDown={(e) => {if (e.key === 'Enter') this.onSubmitSearch();}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton 
                                aria-label="Submit Search"
                                onClick={this.onSubmitSearch}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        );
        let renderSearchErrorMessage = (
            <React.Fragment>
                &emsp;
                <Typography component='h5' variant="h5">
                    {this.state.searchErrorMessage}
                </Typography>
            </React.Fragment>
        );
        let renderSearchResults = this.state.searchResults.map(
            (result) => {
                return (
                    <ListItem button component="a" href={"/landlord/" + result.id}>
                        <ListItemText
                            primary={
                                <Typography component='h5' variant="h5">
                                    {result.first_name + " " + result.last_name}
                                </Typography>
                            }
                        />
                    </ListItem>
                );
            }
        );
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">{renderSearchBar}</Grid>
                <Grid item xs={12} align="center" style={{ display: this.state.searchError ? "" : "none" }}>
                    {renderSearchErrorMessage}
                </Grid>
                <Grid item xs={12} align="center">
                    <List>{renderSearchResults}</List>
                </Grid>
            </Grid>
        );
    }
}