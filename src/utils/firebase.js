import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
	apiKey: "AIzaSyBXHDaRPCxDAuR8IfVx_po4E0VP9TfdvPI",
	authDomain: "react-query-poc.firebaseapp.com",
	databaseURL: "https://react-query-poc-default-rtdb.firebaseio.com",
	projectId: "react-query-poc",
	storageBucket: "react-query-poc.appspot.com",
	messagingSenderId: "635095643744",
	appId: "1:635095643744:web:9c7e0ba62dc323526a7505",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
