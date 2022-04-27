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
          <Route exact path="/site-treino">
            <Home />
          </Route>
          <Route exact path="/site-treino/profile">
            <Profile />
          </Route>
          <Route exact path="/site-treino/list-customers">
            <ListCustomers />
          </Route>
          <Route exact path="/site-treino/list-customers/manage-customer/:uuid">
            <ManageCustomer />
          </Route>
          <Route exact path="/site-treino/add-customer">
            <AddCustomer />
          </Route>
          <Route exact path="/site-treino/manage-customer">
            <ManageCustomer />
          </Route>

          <Route exact path="/site-treino/my-evolution">
            <MyEvolution />
          </Route>
          <Route exact path="/site-treino/list-customers/manage-customer/:userid/list-client-rating/:uuid">
            <MyRatingsList />
          </Route>
          <Route path="/site-treino/manage-customer/list-client-rating/add-rating/:uuid/:id">
            <AddCustomerRating />
          </Route>
          <Route path="/site-treino/manage-customer/list-client-rating/add-rating/:uuid">
            <AddCustomerRating />
          </Route>
          <Route exact path="/site-treino/add-post">
            <AddPost />
          </Route>
          <Route exact path="/site-treino/add-post/:id">
            <AddPost />
          </Route>
          <Route exact path="/site-treino/posts">
            <ListPosts />
          </Route>
          <Route path="/site-treino/post/:id">
            <ViewPost />
          </Route>
          <Route exact path="/site-treino/calendar">
            <Calendar />
          </Route>
          <Route exact path="/site-treino/training">
            <TrainingList />
          </Route>
          <Route exact path="/site-treino/list-customers/manage-customer/:clientid/custom-workout-list/:uuid">
            <CustomWorkoutList/>
          </Route>
          <Route exact path="/site-treino/list-customers/manage-customer/:clientid/custom-workout-list/:uuid/add-custom-workout/:workoutid">
            <AddCustomWorkout />
          </Route>
          <Route exact path="/site-treino/list-customers/manage-customer/:clientid/custom-workout-list/:uuid/add-custom-workout">
            <AddCustomWorkout />
          </Route>
          <Route exact path="/site-treino/training/custom-workout/:workoutid">
            <CustomWorkout />
          </Route>
          <Route exact path="/site-treino/videos">
            <ListTraingVideos/>
          </Route>
          <Route exact path="/site-treino/add-video">
            <AddTrainingVideo/>
          </Route>
          <Route exact path="/site-treino/add-video/:id">
            <AddTrainingVideo/>
          </Route>
          <Route exact path="/site-treino/add-event-list">
            <ListEvents/>
          </Route>
          <Route exact path="/site-treino/add-event">
            <AddEvents />
          </Route>
          <Route exact path="/site-treino/add-event/:id">
            <AddEvents />
          </Route>
        </Switch>
      </Container>
    </>
  );
}