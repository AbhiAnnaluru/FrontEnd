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
      { title: 'Effective Date', field: 'effective_date', editable: 'never' },
      { title: 'ISIN', field: 'isin', editable: 'never' },
      { title: 'BBG_Ticker', field: 'bbg_ticker', editable: 'never' },
      { title: 'Security_Name', field: 'security_name', editable: 'never'},
      { title: 'MIC_Code', field: 'mic_code', editable: 'never' },
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
          if(res[key].edi_ca_type=='ORD_DIV'){
            type = 'ORDINARY'
          }else{
            type = 'SPECIAL'
          }
          resultData.push({
                            cacm_id:res[key].cacm_id,
                            effective_date:res[key].effective_date,
                            isin:res[key].isin,
                            bbg_ticker:res[key].bbg_ticker,
                            security_name:res[key].security_name,
                            mic_code:res[key].mic_code,
                            edi_gross_div:res[key].edi_gross_div,
                            edi_net_div:res[key].edi_net_div,
                            edi_currency:res[key].edi_currency,
                            edi_ca_type:type,
                            fds_gross_div:res[key].fds_gross_div,
                            fds_net_div:res[key].fds_net_div,
                            fds_currency:res[key].fds_currency,
                            fds_ca_type:res[key].fds_ca_type,
                            gross_div_diff:res[key].gross_div_diff,
                            net_div_diff:res[key].net_div_diff,
                            status:res[key].status,
                            isactive:res[key].isactive,
                            comment:res[key].comment,
                            source:res[key].source
            });
        }
        setData(resultData);
        setLoading(false);
    }else{
      axios.get('http://104.130.29.253:8050/dividend/')
      .then(result=> {
        const res = result.data;
        localStorage.setItem('allData', JSON.stringify(res));
        const resultData = [];
        var type = null;
        for(const key in res){
          if(res[key].edi_ca_type=='ORD_DIV'){
            type = 'ORDINARY'
          }else{
            type = 'SPECIAL'
          }
          resultData.push({
                            cacm_id:res[key].cacm_id,
                            effective_date:res[key].effective_date,
                            isin:res[key].isin,
                            bbg_ticker:res[key].bbg_ticker,
                            security_name:res[key].security_name,
                            mic_code:res[key].mic_code,
                            edi_gross_div:res[key].edi_gross_div,
                            edi_net_div:res[key].edi_net_div,
                            edi_currency:res[key].edi_currency,
                            edi_ca_type:type,
                            fds_gross_div:res[key].fds_gross_div,
                            fds_net_div:res[key].fds_net_div,
                            fds_currency:res[key].fds_currency,
                            fds_ca_type:res[key].fds_ca_type,
                            gross_div_diff:res[key].gross_div_diff,
                            net_div_diff:res[key].net_div_diff,
                            status:res[key].status,
                            isactive:res[key].isactive,
                            comment:res[key].comment,
                            source:res[key].source
            });
        }
        setData(resultData);
        setLoading(false);
      });
    }
    },[]);

  function updateData(newData){
    axios.put('http://104.130.29.253:8050/dividend/'+newData.cacm_id+'/', {edi_gross_div: newData.edi_gross_div, 
                edi_net_div:newData.edi_net_div, 
                edi_ca_type:newData.edi_ca_type, 
                edi_ca_type:newData.edi_ca_type, 
                fds_gross_div:newData.fds_gross_div, 
                fds_net_div:newData.fds_net_div, 
                fds_currency:newData.fds_currency, 
                fds_ca_type:newData.fds_ca_type, 
                status:newData.status, 
                isactive:newData.isactive, 
                comment:newData.comment})
        .then(res => {
          axios.get('http://104.130.29.253:8050/dividend/')
          .then(result=> {
            const res = result.data;
            const resultData = [];
            var type = null;
            for(const key in res){
              if(res[key].edi_ca_type=='ORD_DIV'){
                type = 'ORDINARY'
              }else{
                type = 'SPECIAL'
              }
              resultData.push({effective_date:res[key].effective_date,
                                isin:res[key].isin,
                                bbg_ticker:res[key].bbg_ticker,
                                security_name:res[key].security_name,
                                mic_code:res[key].mic_code,
                                edi_gross_div:res[key].edi_gross_div,
                                edi_net_div:res[key].edi_net_div,
                                edi_currency:res[key].edi_currency,
                                edi_ca_type:type,
                                fds_gross_div:res[key].fds_gross_div,
                                fds_net_div:res[key].fds_net_div,
                                fds_currency:res[key].fds_currency,
                                fds_ca_type:res[key].fds_ca_type,
                                gross_div_diff:res[key].gross_div_diff,
                                net_div_diff:res[key].net_div_diff,
                                status:res[key].status,
                                isactive:res[key].isactive,
                                comment:res[key].comment,
                                source:res[key].source
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
      title="DIVIDEND"
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
                  const data = [newData.data];
                  updateData(newData);
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
      }}
    />
      )
    }
    </div>
  );
}