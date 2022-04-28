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
import ListCustomers from "../pages/ListCustomers";
import AddCustomer from "../pages/AddCustomer";
import MyEvolution from "../pages/MyEvolution";
import MyRatingsList from "../pages/MyRatingsList";
import AddCustomerRating from "../pages/AddCustomerRating";
import AddPost from "../pages/AddPost";
import ListPosts from "../pages/ListPosts";
import ViewPost from "../pages/ViewPost";
import ListTraingVideos from "../pages/ListTraingVideos";
import AddTrainingVideo from "../pages/AddTrainingVideo";
import ManageCustomer from "../pages/ManageCustomer";
import CustomWorkoutList from "../pages/CustomWorkoutList";
import AddCustomWorkout from "../pages/AddCustomWorkout";
import CustomWorkout from "../pages/CustomWorkout";
import TrainingList from "../pages/TrainingList";
import Calendar from "../pages/Calendar";
import ListEvents from "../pages/ListEvents";
import AddEvents from "../pages/AddEvents";

import "./style.scss";

export default function Navigation() {
  return (
    <>
      <HomeBar />
      <Container className="container-navigation" maxWidth="md" >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/list-customers">
            <ListCustomers />
          </Route>
          <Route exact path="/manage-customer/:uuid">
            <ManageCustomer />
          </Route>
          <Route exact path="/add-customer">
            <AddCustomer />
          </Route>
          <Route exact path="/manage-customer">
            <ManageCustomer />
          </Route>

          <Route exact path="/my-evolution">
            <MyEvolution />
          </Route>
          <Route exact path="/manage-customer/list-client-rating/:uuid">
            <MyRatingsList />
          </Route>
          <Route path="/manage-customer/list-client-rating/add-rating/:uuid/:id">
            <AddCustomerRating />
          </Route>
          <Route path="/add-rating/:uuid">
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
          <Route exact path="/calendar">
            <Calendar />
          </Route>
          <Route exact path="/training">
            <TrainingList />
          </Route>
          <Route exact path="/manage-customer/custom-workout-list/add-custom-workout">
            <AddCustomWorkout />
          </Route>
          <Route exact path="/manage-customer/custom-workout-list/:uuid">
            <CustomWorkoutList/>
          </Route>
          <Route exact path="/manage-customer/custom-workout-list/add-custom-workout/:uuid/:workoutid">
            <AddCustomWorkout />
          </Route>
          <Route exact path="/custom-workout/:workoutid">
            <CustomWorkout />
          </Route>
          <Route exact path="/videos">
            <ListTraingVideos/>
          </Route>
          <Route exact path="/add-video">
            <AddTrainingVideo/>
          </Route>
          <Route exact path="/add-video/:id">
            <AddTrainingVideo/>
          </Route>
          <Route exact path="/add-event-list">
            <ListEvents/>
          </Route>
          <Route exact path="/add-event">
            <AddEvents />
          </Route>
          <Route exact path="/add-event/:id">
            <AddEvents />
          </Route>
        </Switch>
      </Container>
    </>
  );
}