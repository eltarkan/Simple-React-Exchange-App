import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import Register from "./Register";


export default function Routers(){

    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Dashboard/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route>
                    <ErrorPage/>
                </Route>
            </Switch>
        </Router>
    )
}