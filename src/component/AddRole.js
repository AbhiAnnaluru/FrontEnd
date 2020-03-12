import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
  const initialFormData = Object.freeze({
    name: "",
    description: ""
  });



  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
      
    });
  };
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    // e.preventDefault()
    // console.log(formData);
     alert(JSON.stringify(formData.description));
    // ... submit to API or something

    axios.post('http://104.130.29.253:8050/add_role/', {
                name:formData.name,
                description:formData.description,
                })
        .then(res => {
         axios.get('http://104.130.29.253:8050/add_role/')
         .then(result=> {
           const res = result.data;
           const resultData = [];
           var type = null;
           for(const key in res){
             resultData.push({
                               name:res[key].name,
                               description:res[key].description
               });
           }
           setData(resultData);
         });
        });
    
  };
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="name" name="name" label="Role Name" onChange={handleChange} variant="outlined" />
        <TextField id="description" name="description" onChange={handleChange} label="Description" variant="outlined" />
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
  );

};