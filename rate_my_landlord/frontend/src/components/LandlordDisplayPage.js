import React, { Component } from 'react';

export default class LandlordDisplayPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
        }
        this.landlordID = this.props.match.params.id;
        this.getLandlordDetails();
    }

    getLandlordDetails = () => {
        fetch('/api/get-landlord?id=' + this.landlordID)
            .then((response) => response.json())
            .then((data) => this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
            }));
    }

    render() {
        return (
            <div>
                <p>This is the landlord display page</p>
                <p>First Name: {this.state.firstName}</p>
                <p>Last Name: {this.state.lastName}</p>
            </div>
        );
    }
}