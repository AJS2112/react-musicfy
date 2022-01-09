import React from "react";
import {
    Routes as Switch,
    Route
} from "react-router-dom";

//Pages
import Home from "../pages/Home/Home";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" element={<Home />} />

            <Route path="/artists" exact element={<h1>Artists</h1>} />

            <Route path="/settings" exact element={<h1>Settings</h1>} />
        </Switch>
    )
}