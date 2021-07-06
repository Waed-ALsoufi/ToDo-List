import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Your web app's Firebase configuration
// Initialize Firebase

const fire = firebase.initializeApp({
  apiKey: 'AIzaSyDN0sOPATdhw-d1E1pHNjum1KrHHerrewY',
  authDomain: 'todolist-52183.firebaseapp.com',
  projectId: 'todolist-52183',
  storageBucket: 'todolist-52183.appspot.com',
  messagingSenderId: '260258800982',
  appId: '1:260258800982:web:7daf3324a3ce6f8f8062f7',
});

export default fire;
