import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DataTable from './DataTable';

export default function Content() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="l">
        <Typography component="div" style={{ padding: 12}} >
           <DataTable/>
        </Typography>
      </Container>
    </React.Fragment>
  );
}