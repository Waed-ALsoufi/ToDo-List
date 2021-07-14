import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
const fire = firebase.initializeApp({
  apiKey: 'AIzaSyDN0sOPATdhw-d1E1pHNjum1KrHHerrewY',
  authDomain: 'todolist-52183.firebaseapp.com',
  projectId: 'todolist-52183',
  storageBucket: 'todolist-52183.appspot.com',
  messagingSenderId: '260258800982',
  appId: '1:260258800982:web:7daf3324a3ce6f8f8062f7',
});

export default fire;
export const auth = firebase.auth();
