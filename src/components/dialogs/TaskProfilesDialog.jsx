import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from "@material-ui/core/MenuItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    height: 500,
  },
  card: {
    marginTop: 20,
    minWidth: '50%',
    minHeight: 572,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
  menu: {
    width: 160,
  },
  divider: {
    margin: 0,
    borderTop: '2px solid #444',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
}));

const countries =[
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'UK',
    label: 'UK'
  }
]

export default function TaskProfilesDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState({
    country: 'Japan',
  });

  const handleChangev2 = name => event => {
    console.log(event.target.value, name);
    setValues({ ...values, [name]: event.target.value });
  };

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Select Profiles
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent style={{padding: 0}}>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Proxy" {...a11yProps(0)} />
              <Tab label="Billing" {...a11yProps(1)} />
              <Tab label="Account" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div id="shippingDetails">
                <h5>Shipping Details</h5>
                <div className={classes.divider}></div>
                <div className={classes.pos}></div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="First Name"
                    margin="normal"
                  />
                  <TextField
                    label="Last Name"
                    className={classes.textField}
                    margin="normal"
                  />
                </div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Zip Code"
                    margin="normal"
                  />
                  <TextField
                    label="State"
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    className={classes.textField}
                    margin="normal"
                  />
                </div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Address 1"
                    margin="normal"
                  />
                  <TextField
                    label="Address 2"
                    className={classes.textField}
                    margin="normal"
                  />
                </div>
                <TextField
                  select
                  label="Country"
                  value={values.country}
                  onChange={handleChangev2('country')}
                  className={classes.menu}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                  align="center"
                >
                  {countries.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div style={{paddingBottom: 24}}></div>
              <div id="billingDetails">
                <h5>Billing Details</h5>
                <div className={classes.divider}></div>
                <div className={classes.pos}></div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="First Name"
                    margin="normal"
                  />
                  <TextField
                    label="Last Name"
                    className={classes.textField}
                    margin="normal"
                  />
                </div>
                <div style={{display: 'flex'}}>
                <TextField
                    label="Zip Code"
                    margin="normal"
                  />
                  <TextField
                    label="State"
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    className={classes.textField}
                    margin="normal"
                  />
                </div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Address 1"
                    margin="normal"
                  />
                  <TextField
                    label="Address 2"
                    className={classes.textField}
                    margin="normal"
                  />
                </div>
                <TextField
                  select
                  label="Country"
                  value={values.country}
                  onChange={handleChangev2('country')}
                  className={classes.menu}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                  align="center"
                >
                  {countries.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
            <div id="paymentDetails">                
                <TextField
                  label="Email"
                  margin="normal"
                />
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Phone"
                    margin="normal"
                  />
                  <TextField
                    label="Holder Name"
                    className={classes.textField}
                    margin="normal"
                  />
                </div>
                <div className={classes.pos}></div>
                <TextField
                  label="Card Number"
                  margin="normal"
                />
                <div style={{display: 'flex'}}>
                  <TextField
                    label="CVV"
                    style={{width: 70}}
                    margin="normal"
                  />
                  <TextField
                    label="MO"
                    className={classes.textField}
                    style={{width: 50}}
                    margin="normal"
                  />
                  <TextField
                    label="YR"
                    className={classes.textField}
                    style={{width: 50}}
                    margin="normal"
                  />
                </div>
              </div>
            </TabPanel>
          </SwipeableViews>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}