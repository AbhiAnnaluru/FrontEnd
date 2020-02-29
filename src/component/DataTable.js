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
import useAxios from 'axios-hooks';

export default function MaterialTableDemo() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'ex_date', editable: 'never' },
      { title: 'ISIN', field: 'isin', editable: 'never' },
      { title: 'BBG_Ticker', field: 'bbg_ticker', editable: 'never' },
      { title: 'Security_Name', field: 'security_name', editable: 'never'},
      { title: 'MIC_Code', field: 'mic', editable: 'never' },
      { title: 'EDI_GDIV', field: 'edi_gross_div'},
      { title: 'EDI_NDIV', field: 'edi_net_div' },
      { title: 'EDI_CUR', field: 'edi_currency' },
      { title: 'EDI_TYPE', field: 'edi_ca_type' },
      { title: 'FDS_GDIV', field: 'fds_gross_div' },
      { title: 'FDS_NDIV', field: 'fds_net_div' },
      { title: 'FDS_CUR', field: 'fds_currency' },
      { title: 'FDS_TYPE', field: 'fds_ca_type' },
      { title: 'Gross Amount Difference', field: 'gross_div_diff', editable: 'never' },
      { title: 'Net Amount Difference', field: 'net_div_diff', editable: 'never' },
      { title: 'Status', field: 'status' },
      {title: 'Active',field: 'isactive'},
      { title: 'Comment', field: 'comment'},
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

  const [{ data, loading, error }, refetch] = useAxios(
    'http://104.130.29.253:8050/dividend/'
  )
 
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <div>
    <MaterialTable
      title="DIVIDEND DATA"
      icons={tableIcons}
      columns={state.columns}
      data={data}
      options={{
        exportButton: true
      }}
      options={{
        headerStyle: {
          backgroundColor: '#663366',
          color: '#FFF'
        },
        rowStyle: {
          backgroundColor: '#EEE',
        }
      }}
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