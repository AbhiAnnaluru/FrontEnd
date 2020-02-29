// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import DataTable from './DataTable'


// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//     paddingRight: 20
//   },
// });

// export default function SideNavBar() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Paper className={classes.root}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         indicatorColor="primary"
//         textColor="primary"
//       >
//         <Tab label="Dividend">
//         </Tab>
//         <Tab label="Stock Dividend/Split/Bonus" />
//         <Tab label="Id Change" />
//         <Tab label="Right Offering" />
//         <Tab label="Spin Off" />
//         <Tab label="Others" />
//       </Tabs>
//     </Paper>
//   );
// }

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
import Calendar from './Calendar';
import Download from './Download';
import Update from './Update';
import Content from './Content';
import ContentStock from './ContentStock';
import ContentID from './ContentID';
import ContentOffer from './ContentOffer';
import ContentSOff from './ContentSOff';
import ContentOthers from './ContentOthers';

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
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
          <Grid xs={4} style={{padding: 8}}>
            <Calendar/>
          </Grid>
          {/* <Grid container xs={4} style={{padding: 8}}>
            <Search/>
          </Grid>  */}
          <Grid container xs={4}>
          <Download/>
          <Update/>
          </Grid> 
            <Content/>
          </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
          <Grid  container  xs={12}>
          <Grid xs={4} style={{padding: 8}}>
            <Calendar/>
          </Grid>
          {/* <Grid container xs={4} style={{padding: 8}}>
            <Search/>
          </Grid>  */}
          <Grid container xs={4}>
          <Download/>
          <Update/>
          </Grid> 
            <ContentStock/>
          </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
      <Grid  container  xs={12}>
      <Grid xs={4} style={{padding: 8}}>
        <Calendar/>
      </Grid>
      {/* <Grid container xs={4} style={{padding: 8}}>
        <Search/>
      </Grid>  */}
      <Grid container xs={4}>
      <Download/>
      <Update/>
      </Grid> 
        <ContentID/>
      </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
      <Grid  container  xs={12}>
      <Grid xs={4} style={{padding: 8}}>
        <Calendar/>
      </Grid>
      {/* <Grid container xs={4} style={{padding: 8}}>
        <Search/>
      </Grid>  */}
      <Grid container xs={4}>
      <Download/>
      <Update/>
      </Grid> 
        <ContentOffer/>
      </Grid>
      </TabPanel>

      <TabPanel value={value} index={4}>
      <Grid  container  xs={12}>
      <Grid xs={4} style={{padding: 8}}>
        <Calendar/>
      </Grid>
      {/* <Grid container xs={4} style={{padding: 8}}>
        <Search/>
      </Grid>  */}
      <Grid container xs={4}>
      <Download/>
      <Update/>
      </Grid> 
        <ContentSOff/>
      </Grid>
      </TabPanel>

      <TabPanel value={value} index={5}>
      <Grid  container  xs={12}>
      <Grid xs={4} style={{padding: 8}}>
        <Calendar/>
      </Grid>
      {/* <Grid container xs={4} style={{padding: 8}}>
        <Search/>
      </Grid>  */}
      <Grid container xs={4}>
      <Download/>
      <Update/>
      </Grid> 
        <ContentOthers/>
      </Grid>
      </TabPanel>
    </div>
  );
}