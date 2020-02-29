import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import SaveAlt from "@material-ui/icons/SaveAlt"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Check from "@material-ui/icons/Check"
import FilterList from "@material-ui/icons/FilterList"
 import ClearIcon from '@material-ui/icons/Clear';
 import axios from 'axios';

export default function MaterialTableDemo() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'ISIN', field: 'name' },
      { title: 'BBG_Ticker', field: 'surname' },
      { title: 'Security_Name', field: 'birthYear'},
      { title: 'MIC_Code', field: 'name' },
      { title: 'EDI_GDIV', field: 'name' },
      { title: 'EDI_NDIV', field: 'name' },
      { title: 'EDI_CUR', field: 'name' },
      { title: 'EDI_TYPE', field: 'name' },
      { title: 'FDS_GDIV', field: 'name' },
      { title: 'FDS_NDIV', field: 'name' },
      { title: 'FDS_CUR', field: 'name' },
      { title: 'FDS_TYPE', field: 'name' },
      { title: 'Divi_Gross_Diff', field: 'name' },
      { title: 'Divi_Net_Diff', field: 'name' },
      { title: 'Gross_Amount', field: 'name' },
      { title: 'Status', field: 'name' },
      {
        title: 'Active',field: 'birthCity',
      },
      { title: 'Comment', field: 'name' },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });
  // const [myData, setMyData] = useState({});
  //   useEffect(()=>{
  //     async function fetchData(){
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts/")
  //     res
  //       .json()
  //       .then(res => setMyData(res)) 
  //     }      
  //     fetchData();
  //   },[]);
  return (
    <div>
      {/* <span>{JSON.stringify(myData)}</span> */}
      {/* <ul>
        {myData.map(s => (<li>{s}</li>))}
      </ul> */}
    <MaterialTable
      title="DIVIDEND DATA"
      icons={{
        Check: () => <Check />,
        Export: () => <SaveAlt />,
        Filter: () => <FilterList />,
        FirstPage: () => <FirstPage />,
        LastPage: () => <LastPage />,
        NextPage: () => <ChevronRight />,
        PreviousPage: () => <ChevronLeft />,
        Search: () => <Search />,
        Clear: () => <ClearIcon />,
        ViewColumn: () => <ViewColumn />,
        DetailPanel: () => <ChevronRight />,
      }}
      columns={state.columns}
      data={state.data}
      // editable={{
      //   onRowUpdate: (newData, oldData) =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         if (oldData) {
      //           setState(prevState => {
      //             const data = [...prevState.data];
      //             data[data.indexOf(oldData)] = newData;
      //             return { ...prevState, data };
      //           });
      //         }
      //       }, 600);
      //     }),
      // }}
    />
    </div>
  );
}