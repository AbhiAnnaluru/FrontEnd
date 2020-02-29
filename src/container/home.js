import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import Content from '../component/Content';
import SideNavBar from '../component/SideNavBar';
import Search from '../component/Search';
import Calendar from '../component/Calendar';
import Download from '../component/Download';
import Update from '../component/Update';



export default function Home(){
      return(
        <div>
        <Grid container spacing={3}>
        <Grid xs={12}  style={{ padding: 4}} >
        </Grid>
    <Grid container xs={12}>
      <Header />
    </Grid>
    {/* <Grid container  xs={9} style={{ padding: 20}}>
      <SideNavBar/>
    <Grid xs={3}  style={{ padding: 20}}>
      <Calendar/>
    </Grid>
    <Grid container xs={3} style={{ padding: 20}}>
      <Search/>
    </Grid> 
    <Grid container xs={2} style={{ padding: 24}}>
      <Download/>
    </Grid> 
    <Grid container xs={1} style={{ padding: 28}}>
      <Update/>
    </Grid>
    <Content/>
    </Grid> */}
  </Grid>
  </div>
      );
}