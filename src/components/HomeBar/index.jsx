import React, { useState , useEffect} from 'react';
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  Drawer,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import Menu from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TodayIcon from '@material-ui/icons/Today';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
// import RestaurantIcon from '@material-ui/icons/Restaurant';
// import PaymentIcon from '@material-ui/icons/Payment';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BarChartIcon from '@material-ui/icons/BarChart';
import PostAddIcon from '@material-ui/icons/PostAdd';
import "./style.css";
import { auth, database } from "../../Firebase/index"


const HomeBar = ({ state }) => {
  let history = useHistory();
  const location = useLocation();
  const [menuState, setMenuState] = useState(false);
  const [admin,setAdmin] = useState(false);

  useEffect(() => {
    database.ref().child("/users").child(auth.currentUser.uid).get().then((snapshot)=>{
      if (snapshot.exists()) {
        var data = snapshot.val();
        setAdmin(data.admin)
      }
    });
  },[]);

  const toggleDrawer = () => {
    setMenuState(!menuState)
  };

  const navigate = (href) => {
    if (history.location.pathname === href)
      return;
    history.push(href);
  }

  const back = () => {
    history.goBack();
  }

  const signOut = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          {
            (location.pathname !== "/") ?
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                edge="start"
                onClick={back}
              >
                <ArrowBackIcon />
              </IconButton> :
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer}>
                <Menu />
              </IconButton>
          }

          <Typography variant="h6" onClick={() => history.replace("/")}>Personal Aline Fajardo</Typography>

        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={menuState} onClose={toggleDrawer}>
        <div
          className="left"
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          {!admin &&
          <List>
            <ListItem button onClick={() => navigate("/profile")}>
              <ListItemIcon><AccountCircleIcon /> </ListItemIcon>
              <ListItemText primary={"Usuario"} />
            </ListItem>
          </List>
          }
          {admin &&
          <List>
            <ListItem button onClick={() => navigate("/list-customers")}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={"Meus Alunos"} />
            </ListItem>
            <ListItem button onClick={() => navigate("/posts")}>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Meus Posts"} />
            </ListItem>
            <ListItem button onClick={() => navigate("/videos")}>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add videos"} />
            </ListItem>
            <ListItem button onClick={() => navigate("/add-event-list")}>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Eventos"} />
            </ListItem>
          </List>}
          {!admin &&
          <>
          <Divider />
          <List>
            <ListItem button onClick={() => navigate("/my-evolution")}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary={"Minha evolução"} />
            </ListItem>
            <ListItem button onClick={() => navigate("/calendar")}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary={"Agenda"} />
            </ListItem>
            <ListItem button onClick={() => navigate("/training")}>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={"Treinos"} />
            </ListItem>
            {/* <ListItem button>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary={"Alimentação"} />
            </ListItem> */}
            {/* <ListItem button>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary={"Proximo pagametno"} />
            </ListItem> */}
          </List>
          </>
          }
          <List>
            <Divider />
            <ListItem button onClick={signOut}>
              <ListItemIcon >
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary={"Sair"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default connect(state => ({ state: state }))(HomeBar);