import { AppBar, makeStyles, Toolbar, Button } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    logo: {
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
    const { logo } = useStyles();
    return (
        <header>
            <AppBar color="primary">
                <Toolbar>
                    <Button variant="h6" className={logo} href="/">Rate My Landlord</Button>
                </Toolbar>
            </AppBar>
        </header>
    );
}