import './App.css';
import ToDo from './TODO';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SingUp';
import { useAuth } from './Auth';

function Main() {
  const { currentUser } = useAuth();
  return (
    <Router>
      {currentUser ? (
        <div>
          <Route path='/ToDo'>
            <ToDo />
          </Route>
        </div>
      ) : (
        <>
          <Switch>
            <Route path='/'>
              <SignIn />
            </Route>
            <Route path='/SignIn'>
              <SignIn />
            </Route>
            <Route path='/SignUp'>
              <SignUp />
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
}

export default Main;
