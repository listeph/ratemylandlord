import React, { Component } from 'react';
import { Button, Grid, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";

export default class AddLandlordPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
        };
    }

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value,
        });
    }

    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value,
        });
    }

    handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
            })
        };
        fetch("api/create-landlord", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant="h4">
                        Add New Landlord
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true} type="string" inputProps={{style: {textAlign: "center"}}} onChange={this.handleFirstNameChange} />
                        <FormHelperText>
                            <div align="center">Landlord First Name</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true} type="string" inputProps={{style: {textAlign: "center"}}} onChange={this.handleLastNameChange} />
                        <FormHelperText>
                            <div align="center">Landlord Last Name</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}