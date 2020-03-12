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
    username: "",
    email: "",
    password: ""
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
    //  alert(JSON.stringify(formData.description));
    // ... submit to API or something

    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    alert(str);

    axios.post('http://104.130.29.253:8050/register/', {
                username:formData.username,
                email:formData.email,
                password:formData.password,
                date_joined:str,
                is_superuser:'false',
                is_staff:'false',
                is_active:'false'
                })
        .then(res => {
         axios.get('http://104.130.29.253:8050/register/')
         .then(result=> {
           const res = result.data;
           const resultData = [];
           var type = null;
           for(const key in res){
             resultData.push({
                               username:res[key].username,
                               email:res[key].email,
                               password:res[key].password
               });
           }
           setData(resultData);
         });
        });
    
  };
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="username" name="username" label="User Name" onChange={handleChange} variant="outlined" />
        <TextField id="email" name="email" onChange={handleChange} label="E-mail" variant="outlined" />
        <TextField id="password" name="password" onChange={handleChange} label="Password" variant="outlined" type="password" />
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