import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Slider, TextField, Typography } from '@material-ui/core';

export default class AddReviewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewerName: undefined,
            safetyRating: 5,
            responsivenessRating: 5,
            transparencyRating: 5,
            organizationRating: 5,
            studentFriendlinessRating: 5,
        }
    }

    handleSubmit = () => {
        const { reviewerName, safetyRating, responsivenessRating, transparencyRating, 
            organizationRating, studentFriendlinessRating } = this.state;
        const overallRating = (safetyRating + responsivenessRating + transparencyRating +
        organizationRating + studentFriendlinessRating) / 5;
        if (reviewerName) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    reviewer_name: reviewerName,
                    safety_rating: safetyRating,
                    responsiveness_rating: responsivenessRating,
                    transparency_rating: transparencyRating,
                    organization_rating: organizationRating,
                    student_friendliness_rating: studentFriendlinessRating,
                    overall_rating: overallRating,
                })
            };
            fetch("/api/create-review?landlordID=" + this.props.landlordID, requestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data));
            // TODO: remove the console.log and show success toast
        } else {
            // TODO: add error toast for name not specified
        }
    }

    render() {
        let marks = Array.from(Array(11).keys()).map((key) => {return {label: key, value: key}});
        return (
            <Card>
                <CardContent>
                    <Typography component='h6' variant="h6">
                        Add a Review Form
                    </Typography>
                    <TextField required type="string" 
                        onChange={(e) => this.setState({reviewerName: e.target.value})} 
                        error={this.state.reviewerName === ""}
                        label="Reviewer Name" placeholder="Jane Doe"/>
                    &emsp;
                    <Typography>
                        Safety Rating
                    </Typography>
                    <Slider aria-label="Safety" step={1} min={0} max={10} defaultValue={5} 
                        marks={marks} onChange={(e,v) => this.setState({ safetyRating: v})}/>
                    &emsp;
                    <Typography>
                        Responsiveness and Maintenance Rating
                    </Typography>
                    <Slider aria-label="Safety" step={1} min={0} max={10} defaultValue={5} 
                        marks={marks} onChange={(e,v) => this.setState({ responsivenessRating: v})}/>
                    &emsp;
                    <Typography>
                        Transparency and Trustworthiness Rating
                    </Typography>
                    <Slider aria-label="Safety" step={1} min={0} max={10} defaultValue={5} 
                        marks={marks} onChange={(e,v) => this.setState({ transparencyRating: v})}/>
                    &emsp;
                    <Typography>
                        Organization Rating
                    </Typography>
                    <Slider aria-label="Safety" step={1} min={0} max={10} defaultValue={5} 
                        marks={marks} onChange={(e,v) => this.setState({ organizationRating: v})}/>
                    &emsp;
                    <Typography>
                        Student Friendliness Rating
                    </Typography>
                    <Slider aria-label="Safety" step={1} min={0} max={10} defaultValue={5} 
                        marks={marks} onChange={(e,v) => this.setState({ studentFriendlinessRating: v})}/>
                </CardContent>
                <CardActions>
                     <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                </CardActions>
            </Card>
        );
    }
}

AddReviewForm.propTypes = {
    landlordID: PropTypes.string,
};