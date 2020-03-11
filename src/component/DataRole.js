import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function MaterialTableDemo() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'Role Name', field: 'name' },
      { title: 'Description', field: 'description' },
    ],
  });

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    localStorage.removeItem('allData');
    if(localStorage.getItem('allData')){
        const res = JSON.parse(localStorage.getItem('allData'));
        localStorage.setItem('allData', JSON.stringify(res));
        const resultData = [];
        var type = null;
        for(const key in res){
          resultData.push({
                            name:res[key].name,
                            description:res[key].description,
            });
        }
        setData(resultData);
        setLoading(false);
    }else{
      axios.get('http://104.130.29.253:8050/add_role/')
      .then(result=> {
        const res = result.data;
        localStorage.setItem('allData', JSON.stringify(res));
        const resultData = [];
        var type = null;
        for(const key in res){
          resultData.push({
                            name:res[key].name,
                            description:res[key].description
            });
        }
        setData(resultData);
        setLoading(false);
      });
    }
    },[]);

   function Rowadd(newData){
      axios.post('http://104.130.29.253:8050/add_role/', {
                name:newData.name,
                description:newData.description,})
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
   } 
  return (
    <div>
    {
      loading ? (<center><CircularProgress size={50} /></center>) : (
    <MaterialTable
      title="Roles Table"
      icons={tableIcons}
      columns={state.columns}
      data={data}
      options={{
      //   exportButton: true,
        headerStyle: {
          backgroundColor: '#663366',
          color: '#FFF'
        },
        rowStyle: {
          backgroundColor: '#EEE',
        }
      }}
      editable={{
         onRowDelete: oldData =>
            new Promise(resolve => {
             setTimeout(() => {
               resolve();
               setState(prevState => {
               const data = [...prevState.data];
               data.splice(data.indexOf(oldData), 1);
               return { ...prevState, data };
             });
          }, 600);
         }),
      }}
    />
      )
    }
    </div>
  );
}