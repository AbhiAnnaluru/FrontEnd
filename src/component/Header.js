import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Sidebar from './Sidebar';
import Grid from '@material-ui/core/Grid';
import SidebarSetting from './SidebarSetting';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const NavTabs = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const logout = () => {
  //   props.history.push("/login");
  // }

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
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Module 1" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="CACM" href="/drafts" {...a11yProps(1)} />
          <LinkTab label="ECA" href="/trash" {...a11yProps(2)} />
          <LinkTab label="Ticker Management" href="/spam" {...a11yProps(3)} />
          <LinkTab label="User Setting" href="/drafts" {...a11yProps(4)} />
          <LinkTab label="Logout" href="/drafts" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid xs={12}>
        <Sidebar />
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Sidebar />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Sidebar />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SidebarSetting />
      </TabPanel>
    </div>
  );
}
export default NavTabs