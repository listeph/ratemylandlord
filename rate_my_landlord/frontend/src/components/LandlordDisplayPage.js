import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddReviewForm from './AddReviewForm';

export default class LandlordDisplayPage extends Component {
    constructor(props) {
        super(props)
        // TODO: replace this with component mount / unmount stuff?
        // since it's not dynamically changing
        this.state = {
            firstName: "",
            lastName: "",
            reviews: [],
        }
        this.landlordID = this.props.match.params.id;
        this.backPage = this.props.match.params.backPage;
        this.getLandlordDetails();
    }

    getLandlordDetails = () => {
        fetch('/api/get-landlord-by-id?id=' + this.landlordID)
            .then((response) => response.json())
            .then((data) => this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
            }));
        fetch('/api/get-reviews-for-landlord?landlordID=' + this.landlordID)
            .then((response) => response.json())
            .then((data) => this.setState({
                reviews: data,
            }));
    }

    render() {
        const { reviews, firstName, lastName } = this.state;
        let renderReviews = reviews.map(
            (review) => {
                return (
                    <Card key={"review_" + review.id}>
                        <CardContent>
                            <Typography component='h6' variant="h6">
                                {review.reviewer_name} • {review.overall_rating} Overall
                            </Typography>
                            <Typography color="textSecondary">
                                posted on {review.created_at}
                            </Typography>
                            <Typography component="p">
                                Safety Measures / Inspections Rating: {review.safety_rating}
                                <br />
                                Responsiveness / Timely Maintenance Rating: {review.responsiveness_rating}
                                <br />
                                Transparency / Trustworthiness Rating: {review.transparency_rating}
                                <br />
                                Organization / Cleanliness Rating: {review.organization_rating}
                                <br />
                                Student-friendliness Rating: {review.student_friendliness_rating}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            }
        );
        return (
            <Grid container spacing={2} style={{height: "100%"}}>
                <Grid item xs={12} align="center">
                    <Typography component='h5' variant="h5">
                        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"} for {firstName} {lastName} 
                    </Typography>
                </Grid>
                &emsp;
                <Grid item xs={12} align="center" style={{maxHeight: "40%", overflowY: "scroll"}}>
                   {renderReviews}
                </Grid>
                <Grid item xs={12} align="center" style={{maxHeight: "40%", overflowY: "scroll"}}>
                   <AddReviewForm landlordID={this.landlordID} />
                </Grid>
                &emsp;
                <Grid item xs={12} align="center">
                    <Button size="small" href={"/" + this.backPage} component="a">Back to Search</Button>
                </Grid>
            </Grid>
        );
    }
}

LandlordDisplayPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
            backPage: PropTypes.string
        })
    }),
};