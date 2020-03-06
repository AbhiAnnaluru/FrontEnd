import React, { useState, useEffect, forwardRef} from 'react';
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


export default function MaterialTableDemo() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'ex_date', editable: 'never' },
      { title: 'ISIN', field: 'isin', editable: 'never' },
      { title: 'BBG_Ticker', field: 'bbg_ticker', editable: 'never' },
      { title: 'Security_Name', field: 'security_name', editable: 'never'},
      { title: 'MIC_Code', field: 'mic_code', editable: 'never' },
      { title: 'Currency', field: 'edi_currency' },
      { title: 'Ratio', field:'edi_new_ratio' },
      { title: 'Offered_price', field: 'edi_offered_price' },
      { title: 'start_subscription', field: 'edi_start_sub' },
      { title: 'end_subscription', field: 'edi_end_sub' },
      { title: 'Status', field: 'status', lookup: { 0: 'Pending', 1: 'Admin',  2: 'Analyst' }, editable: 'never' },
      {title: 'Active',field: 'isactive', lookup: { 0: 'Deactive', 1: 'Active' },},
      { title: 'Comment', field: 'comment'},
      { title: 'Source', field: 'source', lookup: { 'EDI': 'EDI', 'FDS': 'FDS' },},
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
    useEffect(() => {
      if(localStorage.getItem('allData')){
        const res = JSON.parse(localStorage.getItem('allData'));
        const resultData = [];
          for(const key in res){
            resultData.push({cacm_id:res[key].cacm_id,
                              effective_date:res[key].effective_date,
                              isin:res[key].isin,
                              bbg_ticker:res[key].bbg_ticker,
                              security_name:res[key].security_name,
                              mic_code:res[key].mic_code,
                              edi_currency:res[key].edi_currency,
                              edi_new_ratio:res[key].edi_new_ratio,
                              edi_offered_price:res[key].edi_offered_price,
                              edi_start_sub:res[key].edi_start_sub,
                              edi_end_sub:res[key].edi_end_sub,
                              status:res[key].status,
                              isactive:res[key].isactive,
                              comment:res[key].comment,
                              source:res[key].source
              });
          }
          setData(resultData);
      }else{
      axios.get('http://104.130.29.253:8050/dividend/')
        .then(result=> {
          const res = result.data;
          localStorage.setItem('allData', res);
          const resultData = [];
          var type = null;
          for(const key in res){
            if(res[key].edi_ca_type=='ORD_DIV'){
              type = 'ORDINARY'
            }else{
              type = 'SPECIAL'
            }
            resultData.push({cacm_id:res[key].cacm_id,
                              effective_date:res[key].effective_date,
                              isin:res[key].isin,
                              bbg_ticker:res[key].bbg_ticker,
                              security_name:res[key].security_name,
                              mic_code:res[key].mic_code,
                              edi_currency:res[key].edi_currency,
                              edi_new_ratio:res[key].edi_new_ratio,
                              edi_offered_price:res[key].edi_offered_price,
                              edi_start_sub:res[key].edi_start_sub,
                              edi_end_sub:res[key].edi_end_sub,
                              status:res[key].status,
                              isactive:res[key].isactive,
                              comment:res[key].comment,
                              source:res[key].source
            });
          }
          setData(resultData);
        });
    }
  },[]);

  return (
    <div>
    <MaterialTable
      title="DIVIDEND DATA"
      icons={tableIcons}
      columns={state.columns}
      data={data}
      options={{
        exportButton: true,
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