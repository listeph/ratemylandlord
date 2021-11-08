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
            noMatches: false,
        }
    }

    onSubmitSearch = () => {
        fetch('/api/get-matching-landlords?searchkey=' + this.state.currSearchKey)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.length);
            if (data.length === 0) {
                this.setState({
                    searchResults: [],
                    noMatches: true,
                    submittedSearchKey: this.state.currSearchKey,
                });
            } else {
                this.setState({
                    searchResults: data,
                    noMatches: false,
                    submittedSearchKey: this.state.currSearchKey,
                });
            }
        });
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
        let renderNoMatchError = (
            <React.Fragment>
                &emsp;
                <Typography component='h5' variant="h5">
                    No search results found for "{this.state.submittedSearchKey}"
                </Typography>
            </React.Fragment>
        );
        let renderShortSearchError = (
            <Typography component='h5' variant="h5">
                No search results found for "{this.state.submittedSearchKey}"
            </Typography>
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
                <Grid item xs={12} align="center" style={{ display: this.state.noMatches ? "" : "none" }}>
                    {renderNoMatchError}
                </Grid>
                <Grid item xs={12} align="center">
                    <List>{renderSearchResults}</List>
                </Grid>
            </Grid>
        );
    }
}