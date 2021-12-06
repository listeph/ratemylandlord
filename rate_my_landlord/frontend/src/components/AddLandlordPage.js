import React, { Component } from 'react';
import { Button, Grid, TextField, Typography, Snackbar } from '@material-ui/core';
import { Link } from "react-router-dom";

export default class AddLandlordPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: undefined,
            lastName: undefined,
            showSuccessToast: false,
            successToastMessage: "",
            showFailureToast: false,
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
        const { firstName, lastName } = this.state;
        if (firstName && lastName) {
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
                .then((data) => this.showSuccessToast(data));
        } else {
            this.setState({
                showFailureToast: true,
            });
        }
    }

    showSuccessToast = () => {
        const { firstName, lastName } = this.state;
        this.setState({
            showSuccessToast: true,
            successToastMessage: "Successfully submitted landlord " + firstName + " " + lastName,
        })
    }

    hideSuccessToast = () => {
        this.setState({
            showSuccessToast: false,
        })
    }
    hideFailureToast = () => {
        this.setState({
            showFailureToast: false,
        })
    }

    render() {
        return (
            <React.Fragment>
                <Snackbar open={this.state.showSuccessToast} autoHideDuration={6000} 
                    message={this.state.successToastMessage} onClose={this.hideSuccessToast}/>
                <Snackbar open={this.state.showFailureToast} autoHideDuration={6000} 
                    message="Unable to submit new landlord. Please make sure you have filled out all required fields."
                    onClose={this.hideFailureToast}></Snackbar>
                <Grid container spacing={2}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant="h4">
                            Add New Landlord
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField required type="string" 
                            onChange={this.handleFirstNameChange} error={this.state.firstName === ""}
                            label="First Name" placeholder="Jane"/>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField required type="string" 
                            onChange={this.handleLastNameChange} error={this.state.lastName === ""}
                            label="Last Name" placeholder="Doe"/>
                    </Grid>
                        <Grid item xs={12} align="center">
                            <Button color="secondary" to="/search" component={Link}>
                                Back
                            </Button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <Button color="primary" onClick={this.handleSubmit} sx={{ m: 0.5 }}>
                                Submit
                            </Button>
                        </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}