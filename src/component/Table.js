import React, {useState, useEffect}  from 'react';
import Grid from '@material-ui/core/Grid';
import './Table.css'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MaterialTableDemo() {


  const [state, setState] = React.useState({
    columns: [
      { title: 'Security_Name', field: 'security_name', editable: 'never'},
    ],
  });

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [code, setCode] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
      axios.get('http://104.130.29.253:8050/add_permission/')
      .then(result=> {
        const res = result.data;
        const resultData = [];
        var type = null;
        for(const key in res){
          resultData.push({
                            codename:res[key].codename
            });
        }
        setData(resultData);
        setLoading(false);
      }); 
    },[]);

  useEffect(() => {
      setLoading(true);
        axios.get('http://104.130.29.253:8050/role_permission/?required_group=')
        .then(result=> {
          const res = result.code;
          const resultData = [];
          var type = null;
          for(const key in res){
            resultData.push({
                              codename:res[key].codename
              });
          }
          setCode(resultData);
          setLoading(false);
        }); 
      },[]);  

  const tab1_To_tab2 = () =>
  {
      
      var table1 = document.getElementById("table1"),
          table2 = document.getElementById("table2"),
          checkboxes = document.getElementsByName("check-tab1");
  console.log("Val1 = " + checkboxes.length);
       for(var i = 0; i < checkboxes.length; i++)
           if(checkboxes[i].checked)
              {
                  // create new row and cells
                  var newRow = table2.insertRow(table2.length),
                      cell1 = newRow.insertCell(0),
                      cell2 = newRow.insertCell(1);
                    //   cell3 = newRow.insertCell(2),
                    //   cell4 = newRow.insertCell(3);
                  // add values to the cells
                  cell1.innerHTML = table1.rows[i+1].cells[0].innerHTML;
                  cell2.innerHTML = "<input type='checkbox' name='check-tab2'>";
                //   cell3.innerHTML = table1.rows[i+1].cells[2].innerHTML;
                //   cell4.innerHTML = "<input type='checkbox' name='check-tab2'>";
                 
                  // remove the transfered rows from the first table [table1]
                  var index = table1.rows[i+1].rowIndex;
                  table1.deleteRow(index);
                  // we have deleted some rows so the checkboxes.length have changed
                  // so we have to decrement the value of i
                  i--;
                 console.log(checkboxes.length);
              }
  }
  
  
  const tab2_To_tab1 = () =>
  {
    
      var table1 = document.getElementById("table1"),
          table2 = document.getElementById("table2"),
          checkboxes = document.getElementsByName("check-tab2");
  console.log("Val1 = " + checkboxes.length);
       for(var i = 0; i < checkboxes.length; i++)
           if(checkboxes[i].checked)
              {
                  // create new row and cells
                  var newRow = table1.insertRow(table1.length),
                      cell1 = newRow.insertCell(0),
                      cell2 = newRow.insertCell(1);
                    //   cell3 = newRow.insertCell(2),
                    //   cell4 = newRow.insertCell(3);
                  // add values to the cells
                  cell1.innerHTML = table2.rows[i+1].cells[0].innerHTML;
                  cell2.innerHTML = "<input type='checkbox' name='check-tab1'>";
                //   cell3.innerHTML = table2.rows[i+1].cells[2].innerHTML;
                //   cell4.innerHTML = "<input type='checkbox' name='check-tab1'>";
                 
                  // remove the transfered rows from the second table [table2]
                  var index = table2.rows[i+1].rowIndex;
                  table2.deleteRow(index);
                  // we have deleted some rows so the checkboxes.length have changed
                  // so we have to decrement the value of i
                  i--;
                 console.log(checkboxes.length);
              }
  }
    const save = () =>{
       
    }
      return (
        loading ? (<center><CircularProgress size={50} /></center>) : (
          <div className="container" data-component="TableShift">

          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
              
              <div className="tab">
                <table id="table1" border="1" style={{overflowY: "auto"}} >
                    <tr>
                        <th>Permission Name</th>     
                        <th>Select</th>
                    </tr>
                    {data.map((codename) => (
                      <tr>
                      <td>{codename.codename}</td>
                      <td><input type="checkbox" name="check-tab1"/></td>
                      </tr>
                    ))}
                </table>
            </div>
              
          </Grid>
          <Grid item xs={4}>
              
              <div className="tab tab-btn">
                <button onClick={tab1_To_tab2}>Tab1 to Tab2</button>
                <button onClick={tab2_To_tab1}>Tab2 to Tab1</button>
                <button onClick={save}>Save</button>
              </div>
              
          </Grid>
          <Grid item xs={4}>
              
              <div className="tab">
                <table id="table2" border="1">
                    <tr>
                        <th>Permission Name</th>
                        <th>Select</th>
                    </tr>
                    {code.map((codename) => (
                      <tr>
                      <td>{codename.codename}</td>
                      <td><input type="checkbox" name="check-tab2"/></td>
                      </tr>
                    ))}  
                </table>   
            </div>    
              
          </Grid>
        </Grid>
        </Grid>
        </div>
        )
  );
}

