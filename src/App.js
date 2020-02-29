import React from 'react';
import './App.css';
// import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
// import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Login from './container/login';
// import Register from './containers/register';
// import ForgotPassword from './containers/forgot_password';
// import Profile from './components/profile/profile';
// import EditProfile from './components/profile/Edit-profile';
// import Wallet from './components/wallet/wallet';
// import WalletCoins from './components/wallet/coins/WalletCoins';
// import MoreCoins from './components/wallet/coins/MoreCoins';
// import Home from './containers/home';
// import SideNav from './containers/nav';
// import Message from './components/message';
// import Notifications from './containers/Notifications';
// import CollaboarateMain from './containers/collaborate_main';
// import Events from './containers/Events';
// import Bookmark from './components/bookmark';
import { Switch } from 'react-router-dom';
// import Welcome from './containers/Welcome';
// import Verify_mail from './containers/verify_mail';
import SignUp from './container/signup';
import Home from './container/home';
import Apidata from './component/apidata'

const theme = createMuiTheme({
palette: {
    primary: {
        main: '#4eb894',
        contrastText: '#ffffff'
},
    secondary: Colors.pink,
},
});
console.log('theme', theme);
export default function App() {
// const setTokens = (data) => {
// localStorage.setItem("tokens", JSON.stringify(data));
// setAuthTokens(data); 
// }
return (<div>
<MuiThemeProvider theme={theme}>
<Router>

<Switch> 
<Route exact path="/" component={Login} />
<Route exact path="/login" component={Login} />
<Route path="/signup" component={SignUp} />
<Route path="/home" component={Home} />
<Route path="/apidata" component={Apidata} />
{/* <Route path="/forgetpass" component={ForgotPassword} />
<Route path="/verify" component={Verify_mail} />
<Route path="/verify_mail/:id" component={Welcome} /> */}
{/* <SideNav>
<Route path="/home" component={Home} />
<Route path="/message" component={Message} />
<Route path="/bookmark" component={Bookmark} />
<Route path="/notifications" component={Notifications} />
<Route path="/profile" component={Profile} />
<Route path="/Edit-profile" component={EditProfile} />
<Route path="/collaborate" component={CollaboarateMain} />
<Route path="/events" component={Events} />
<Route path="/wallet" component={Wallet} />
<Route path="/walletcoins" component={WalletCoins} />
<Route path="/morecoins" component={MoreCoins} />
<Route path="/logout" component={() => {
localStorage.clear();
window.location.href = '/';
}} />
</SideNav> */}
</Switch>
</Router>
</MuiThemeProvider>
</div>
);
}