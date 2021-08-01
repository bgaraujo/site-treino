import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import HomeBar from "../components/HomeBar";
import Home from "../pages/home";
import Profile from "../pages/Profile";
import ListClientToAddRating from "../pages/ListClientToAddRating";
import MyEvolution from "../pages/MyEvolution";
import MyRatingsList from "../pages/MyRatingsList";
import AddCustomerRating from "../pages/AddCustomerRating";
import AddPost from "../pages/AddPost";
import ListPosts from "../pages/ListPosts";
import ViewPost from "../pages/ViewPost";
import TrainingList from "../pages/TrainingList";
import Training from "../pages/Training";
import ListTraingLevel from "../pages/ListTraingLevel";
import AddTrainingLevel from "../pages/AddTrainingLevel";

import "./style.scss";

export default function Navigation() {
  return (
    <Router>
      <HomeBar />
      <Container className="container-navigation" maxWidth="md" >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/list-client-rating">
            <ListClientToAddRating />
          </Route>
          <Route exact path="/my-evolution">
            <MyEvolution />
          </Route>
          <Route exact path="/list-client-rating/:uuid">
            <MyRatingsList />
          </Route>
          <Route path="/list-client-rating/add-rating/:uuid/:id">
            <AddCustomerRating />
          </Route>
          <Route path="/list-client-rating/add-rating/:uuid">
            <AddCustomerRating />
          </Route>

          <Route exact path="/add-post">
            <AddPost />
          </Route>
          <Route exact path="/add-post/:id">
            <AddPost />
          </Route>
          <Route exact path="/posts">
            <ListPosts />
          </Route>
          <Route path="/post/:id">
            <ViewPost />
          </Route>
          <Route exact path="/training">
            <TrainingList />
          </Route>
          <Route path="/training/:level">
            <Training />
          </Route>
          <Route exact path="/levels">
            <ListTraingLevel/>
          </Route>
          <Route exact path="/add-levels">
            <AddTrainingLevel/>
          </Route>
          <Route exact path="/add-levels/:id">
            <AddTrainingLevel/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}