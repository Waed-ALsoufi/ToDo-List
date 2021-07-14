import './App.css';
import ToDo from './TODO';
import SignIn from './SignIn';
import SignUp from './SingUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <SignIn />
        </Route>
        <Route path='/SignUp'>
          <SignUp />
        </Route>
        <Route path='/ToDo'>
          <ToDo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
