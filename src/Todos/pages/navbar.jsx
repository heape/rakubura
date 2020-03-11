import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BrowserNav from '../../components/home/BrowserNav';
import ItemNewNav from '../../components/item/NewNav';
import ItemLogNav from '../../components/item/LogNav';
import BrowserContent from '../../components/home/BrowserContent';
import ItemNewContent from '../../components/item/NewContent';
import ItemLogContent from '../../components/item/LogContent';
import OrderList from '../../components/common/widgets/OrderList';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import BrandIcon from '../../assets/images/common/brand.png';
import AvatarIcon from '../../assets/images/avatar/1.jpg';

// import SideBar from '../../components/common/Navigation/SideBar';
import {AppBar, Drawer, MenuItem, Toolbar, MenuList} from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'rgba(241, 35, 35, 1)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  footerRoot: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(241, 35, 35, 1)',
    bottom: 0,
    position: 'fixed',
  },
}));

// usage:
const theme = createMuiTheme({
  overrides: {
    MuiBackdrop: {
      root: {

      },
    },
  },
});

/*
const items = [
  { name: "home", label: "Home", Icon: HomeIcon },
  {
    name: "billing",
    label: "Billing",
    Icon: ReceiptIcon,
    items: [
      { name: "statements", label: "Statements", onClick },
      { name: "reports", label: "Reports", onClick }
    ]
  },
  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    items: [
      { name: "profile", label: "Profile" },
      { name: "insurance", label: "Insurance", onClick },
      "divider",
      {
        name: "notifications",
        label: "Notifications",
        Icon: NotificationsIcon,
        items: [
          { name: "email", label: "Email", onClick },
          {
            name: "desktop",
            label: "Desktop",
            Icon: DesktopWindowsIcon,
            items: [
              { name: "schedule", label: "Schedule" },
              { name: "frequency", label: "Frequency" }
            ]
          },
          { name: "sms", label: "SMS" }
        ]
      }
    ]
  }
];
*/

const RouteHome = () => {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <BrowserNav />
        <OrderList />
      </div>
      <div>
        <BrowserContent />
        <Link to="/item/new">
          <button>
            show ItemNew when you click this!!
          </button>
        </Link>
      </div>
    </div>
  )
};

const RouteItemNew = () => {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <ItemNewNav />
        <OrderList />
      </div>
      <div>
        <ItemNewContent />
        <Link to="/item/edit">
          <button>
            show ItemEdit when you click this!!
          </button>
        </Link>
      </div>
    </div>
  );
}; 

const RouteItemEdit = () => {
  return (
    <div>
      ItemEdit Content
      <Link to="/item/log">
        <button>
          show ItemLog when you click this!!
        </button>
      </Link>
    </div>
  );  
};

const RouteItemLog = () => {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <ItemLogNav />
        <OrderList />
      </div> 
      <ItemLogContent />
      <Link to="/">
        <button>
          show Home when you click this!!
        </button>
      </Link>
    </div>
  );  
};

export default function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const Footer = () => {
    return (
      <div className={classes.footerRoot}>
  
      </div>
    );
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={handleToggle}
      onKeyDown={handleToggle}
    >
      <div style={{margin: '10px 0'}}>
        <img src={BrandIcon} />
      </div>
      <Divider />
      <List>
        {['ホーム', /*'Starred', 'Send email', 'Drafts'*/].map((text, index) => (
          <Link to="/" key={text} style={{color: 'unset'}}> {/* a bug? */}
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <div>
          <Router>
            <Drawer
              open={open}
              width={200}
              onClose={handleToggle}
            >
              {sideList('left')}
            </Drawer>
            <div>
              <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleToggle}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    ホーム
                  </Typography>
                  <Avatar alt="Remy Sharp" src={AvatarIcon} />
                </Toolbar>
              </AppBar>
              <Switch>
                <Route exact path="/" component={RouteHome} />
                <Route exact path="/item/new" component={RouteItemNew} />
                <Route exact path="/item/edit" component={RouteItemEdit} />
                <Route exact path="/item/log" component={RouteItemLog} />
              </Switch>
            </div>
          </Router>
          <Footer />
        </div>
      </MuiThemeProvider>
    </div>
  );
}