
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DataUser from './DataUser';
import UserSetting from './UserSetting';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth:'100'
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <DataUser/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <UserSetting/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}