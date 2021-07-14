import './App.css';
import React, { useState, useEffect } from 'react';
import fire from './Firebase';
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { auth } from './Firebase';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)`,
    minHeight: '100vh',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  },
  title: {
    color: '#C1AC95',
    fontSize: '80px',
    fontFamily: `'Caveat', cursive`,
  },
  textField: {
    width: '500px',
  },
  card: {
    borderStyle: 'solid',
    borderColor: '#B5CDA3',
    margin: '15px',
    padding: '20px',
  },
  icons: {
    paddingTop: '5px',
  },
  icon: {
    padding: '10px',
  },
  but: { backgroundColor: '#B5CDA3' },
}));

function ToDo() {
  const classes = useStyles();
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState([]);
  const history = useHistory();
  function handleChange(e) {
    setNewItem(e.target.value);
  }

  const addNewPost = async () => {
    setNewItem('');
    await fire.firestore().collection('ToDo').add({
      name: newItem,
      completed: false,
    });
  };

  useEffect(() => {
    fire
      .firestore()
      .collection('ToDo')
      .onSnapshot((docs) => {
        let temp = [];
        docs.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          temp.push(data);
        });
        setList(temp);
      });
    if (!auth.currentUser) {
      history.push('/');
    }
  }, []);
  return (
    <div className={classes.container}>
      <Grid container direction='column' className={classes.main}>
        <Grid item xs={6}>
          <Typography
            variant='h3'
            color='textPrimary'
            align='center'
            className={classes.title}
            gutterBottom
          >
            TO DO LIST
          </Typography>
          <Grid container direction='row' spacing={3}>
            <Grid item>
              <TextField
                label='Add New Task...'
                variant='outlined'
                className={classes.textField}
                onChange={handleChange}
                value={newItem}
              />
            </Grid>

            <Grid item style={{ display: 'flex' }}>
              <Button
                className={classes.but}
                color='secondary'
                variant='contained'
                onClick={addNewPost}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction='column' className={classes.main}>
        {list &&
          list.map((item, index) => {
            return (
              <Grid
                container
                key={index}
                item
                xs={6}
                direction='column'
                className={classes.card}
              >
                <Grid>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.completed}
                        onChange={() => {
                          fire
                            .firestore()
                            .collection('ToDo')
                            .doc(item.id)
                            .update({ completed: !item.completed });
                          console.log(item);
                        }}
                        style={{
                          color: '#B5CDA3',
                        }}
                        name='checkedA'
                      />
                    }
                    contentEditable='true'
                    label={item.name}
                    style={{
                      textDecoration: item.completed ? 'line-through' : null,
                    }}
                  />
                </Grid>
                <Divider />
                <Grid className={classes.icons}>
                  <DeleteIcon
                    className={classes.icon}
                    onClick={() => {
                      fire.firestore().collection('ToDo').doc(item.id).delete();
                    }}
                  ></DeleteIcon>
                  <EditIcon className={classes.icon}></EditIcon>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default withRouter(ToDo);
