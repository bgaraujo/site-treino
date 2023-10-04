import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD07ZYcEDpqI8QDKvV1bkZeL5C-L8EO5U0",
  authDomain: "carona-56fbc.firebaseapp.com",
  databaseURL: "https://carona-56fbc.firebaseio.com",
  projectId: "carona-56fbc",
  storageBucket: "carona-56fbc.appspot.com",
  messagingSenderId: "838515945848",
  appId: "1:838515945848:web:d82082fdbcda9525",
  measurementId: "G-YD4WM55QZE"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const auth = firebase.auth();

const database = firebase.database();

export { storage , auth , database, firebase as default };
