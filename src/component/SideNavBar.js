import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Content from './Content';
import ContentStock from './ContentStock';
import ContentID from './ContentID';
import ContentOffer from './ContentOffer';
import ContentSOff from './ContentSOff';
import ContentOthers from './ContentOthers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useAxios from 'axios-hooks';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
    axios.get('http://104.130.29.253:8050/dividend/?effective_date='+selectedDate)
        .then(res => {
          localStorage.setItem('allData', JSON.stringify(res.data));
        });
    }

  return (
    <div className={classes.root}>
      <Grid  container  xs={12}>
            <Grid xs={12} style={{padding: 8}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Select Date"
                      format="yyyy-mm-dd"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
            </MuiPickersUtilsProvider>
            </Grid>
       </Grid>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example">
          <LinkTab label="Dividend" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Stock Dividend/SPLIT/BONUS" href="/trash" {...a11yProps(1)} />
          <LinkTab label="ID Change" href="/spam" {...a11yProps(2)} />
          <LinkTab label="Right Offering" href="/drafts" {...a11yProps(3)} />
          <LinkTab label="Spin Off" href="/drafts" {...a11yProps(4)} />
          <LinkTab label="Others" href="/drafts" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <Grid  container  xs={12}>
            <Content/>
          </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Grid  container  xs={12}>
            <ContentStock/>
          </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid  container  xs={12}>
        <ContentID/>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Grid  container  xs={12}>
        <ContentOffer/>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Grid  container  xs={12}>
        <ContentSOff/>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Grid  container  xs={12}>
        <ContentOthers/>
      </Grid>
      </TabPanel>
    </div>
  );
}