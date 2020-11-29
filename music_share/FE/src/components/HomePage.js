import React from "react";
import RoomCreate from "./RoomCreate";
import RoomJoin from "./RoomJoin";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";


function HomePage() {
    return (
        <Router> 
            <Switch>
                <Route exact path='/' ><p>this is the homepage</p></Route>
                <Route path='/join' component={RoomJoin}/>
                <Route path='/create' component={RoomCreate}/>
                <Route path='/room/:roomId' component={Room} />
            </Switch>
        </Router>
    )
}

export default HomePage;