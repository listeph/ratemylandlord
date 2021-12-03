import { AppBar, makeStyles, Toolbar, Button, } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom"

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#315399",
    },
    logo: {
        fontFamily: "Bebas Neue, cursive",
        fontWeight: 600,
        fontSize: 20,
        color: "#FFFEFE",
        textAlign: "left",
    },
    Toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default function Header() {
    const { header, logo } = useStyles();

    const displayDesktop = () => {
        return <Toolbar>{ratemylandlordLogo}</Toolbar>
    };

    const ratemylandlordLogo = (
        <Button variant="h6" className={logo} href="/">Rate My Landlord</Button>
    );


    return (
        <header>
            <AppBar className={header}>{displayDesktop()}</AppBar>
        </header>
    );
}