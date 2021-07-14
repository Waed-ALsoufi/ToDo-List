import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter, useHistory } from 'react-router-dom';
import { auth } from './Firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const history = useHistory();
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    } else if (name === 'displayName') {
      setDisplayName(value);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.push('/ToDo');
      }
    });
  }, []);
  const handleSignup = () => {
    auth.createUserWithEmailAndPassword(email, password).then((user) => {
      auth.currentUser.updateProfile({
        displayName: displayName,
      });
    });
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Display Name'
            id='displayName'
            onChange={(event) => onChangeHandler(event)}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='userEmail'
            label='Email Address'
            id='email'
            onChange={(event) => onChangeHandler(event)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='userPassword'
            label='Password'
            type='password'
            id='password'
            onChange={(event) => onChangeHandler(event)}
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={() => {
              history.push('/SignIn');
            }}
          >
            Sign In{' '}
          </Button>{' '}
        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignUp);
