import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
   margin: theme.spacing(1),
   },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Role Name" variant="outlined" />
      <TextField id="outlined-basic" label="Description" variant="outlined" />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Save
      </Button>
    </form>
  );
}