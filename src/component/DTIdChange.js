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
import useAxios from 'axios-hooks';

export default function MaterialTableDemo() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'ex_date', editable: 'never' },
      { title: 'ISIN', field: 'isin', editable: 'never' },
      { title: 'BBG_Ticker', field: 'bbg_ticker', editable: 'never' },
      { title: 'Security_Name', field: 'security_name', editable: 'never'},
      { title: 'MIC_Code', field: 'mic', editable: 'never' },
      { title: 'Edi_Old_ISIN', field: 'edi_old_isin' },
      { title: 'Edi_New_ISIN', field: 'edi_new_isin' },
      { title: 'Edi_Old_Ticker', field: 'edi_old_ticker' },
      { title: 'Edi_New_Ticker', field: 'edi_new_ticker' },
      { title: 'Edi_Old_Issuer', field: 'edi_old_issuer' },
      { title: 'Edi_New_Issuer', field: 'edi_new_issuer' },
      { title: 'Edi_Old_Listing', field: 'edi_old_listing' },
      { title: 'Edi_New_Listing', field: 'edi_new_listing' },
      { title: 'Status', field: 'status' },
      {title: 'Active',field: 'isactive'},
      { title: 'Comment', field: 'comment' },
    ],
  });
  const [{ data, loading, error }, refetch] = useAxios(
    'http://104.130.29.253:8050/dividend/'
  )
 
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>


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
      data={data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
      }}
    />
    </div>
  );
}