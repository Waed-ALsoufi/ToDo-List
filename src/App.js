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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    width: '500px',
  },
  card: {
    backgroundColor: 'pink',
    margin: '15px',
    padding: '20px',
  },
  icon: {
    marginLeft: '95%',
    marginTop: '-35px',
  },
  icon2: {
    marginLeft: '85%',
    marginTop: '-35px',
  },
  box: {
    maxWidth: '530px',
  },
}));

function App() {
  const classes = useStyles();
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState([]);
  function handleChange(e) {
    setNewItem(e.target.value);
  }

  function addNewPost() {
    setList([...list, { name: newItem, completed: false }]);
    fire.firestore().collection('ToDo').add({
      name: newItem,
      completed: false,
    });
  }

  useEffect(() => {
    let active = true;
    fire
      .firestore()
      .collection('ToDo')
      .get()
      .then((item) => {
        const all = [];
        item.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          console.log(data);
          all.push(data);
        });
        if (active) {
          setList(all);
        }
      });

    return () => {
      active = false;
    };
  }, []);
  return (
    <div className={classes.container}>
      <Grid container direction='column' className={classes.main}>
        <Grid item sx={6}>
          <Typography
            variant='h3'
            color='textPrimary'
            align='center'
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
              />
            </Grid>

            <Grid item style={{ display: 'flex' }}>
              <Button
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
          list.map((item) => {
            return (
              <>
                <Grid
                  container
                  item
                  xs={6}
                  direction='row'
                  className={classes.card}
                >
                  <FormControlLabel
                    className={classes.box}
                    control={
                      <Checkbox
                        checked={item.completed}
                        onChange={() => {
                          const tasks = list.filter(
                            (task) => task.id !== item.id
                          );
                          tasks.push({
                            name: item.name,
                            completed: !item.completed,
                          });
                          setList(tasks);
                          fire
                            .firestore()
                            .collection('ToDo')
                            .doc(item.id)
                            .update({ completed: !item.completed });
                        }}
                        name='checkedA'
                      />
                    }
                    label={item.name}
                    style={{
                      textDecoration: item.completed ? 'line-through' : null,
                    }}
                  />

                  <HighlightOffIcon
                    onClick={() => {
                      const tasks = list.filter((task) => task.id !== item.id);
                      fire.firestore().collection('ToDo').doc(item.id).delete();
                      setList(tasks);
                    }}
                    className={classes.icon2}
                  ></HighlightOffIcon>
                  <EditIcon className={classes.icon}></EditIcon>
                </Grid>
              </>
            );
          })}
      </Grid>
    </div>
  );
}

export default App;
