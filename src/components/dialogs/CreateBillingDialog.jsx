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
import ChooseProfileNameDialog from '../dialogs/ChooseProfileNameDialog';
import { DoCreateBilling } from '../tables/BillingTable';

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
  hideScrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }
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

export default function CreateBillingDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState({
    profileName: '',
    general_profileName: 'herro test',
    general_email: '',
    general_phone: '',
    shipping_firstName: '',
    shipping_lastName: '',
    shipping_zipCode: '',
    shipping_state: '',
    shipping_city: '',
    shipping_address1: '',
    shipping_address2: '',
    shipping_country: 'Japan',
    billing_firstName: '',
    billing_lastName: '',
    billing_zipCode: '',
    billing_state: '',
    billing_city: '',
    billing_address1: '',
    billing_address2: '',
    billing_country: 'Japan',
    payment_cardNumber: '',
    payment_cardHolder: '',
    payment_cardCvv: '',
    payment_cardMonth: '',
    payment_cardYear: '',
  });

  const handleChangev2 = name => event => {
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

  const handleGetProfileName = name => {
    handleClickOpen();

    values.profileName = name;
  };

  const getOpen2 = () => {
    return Boolean(open2);
  };

  const handleClickCreate = () => {
    handleClose();
  
    const billingState = {
      general: {
        profileName: values.general_profileName,
        email: values.general_email,
        phone: values.general_phone,
      },
      delivery: {
        shipping: {
          firstName: values.shipping_firstName,
          lastName: values.shipping_lastName,
          zipCode: values.shipping_zipCode,
          state: values.shipping_state,
          city: values.shipping_city,
          address1: values.shipping_address1,
          address2: values.shipping_address2,
          country: values.shipping_country,
        },
        billing: {
          firstName: values.billing_firstName,
          lastName: values.billing_lastName,
          zipCode: values.billing_zipCode,
          state: values.billing_state,
          city: values.billing_city,
          address1: values.billing_address1,
          address2: values.billing_address2,
          country: values.billing_country,
        }
      },
      payment: {
        creditCard: {
          number: values.payment_cardNumber,
          holder: values.payment_cardHolder,
          cvv: values.payment_cardCvv,
          expiration : {
            month: values.payment_cardMonth,
            year: values.payment_cardYear,
          }
        }
      },
    };
    // do something
    DoCreateBilling(values.general_profileName, values.general_email, values.payment_cardHolder, values.payment_cardNumber, billingState);
  };

  return (
    <div>
      <Button style={{
              maxWidth: "220px",
              maxHeight: "40px",
              minWidth: "220px",
              minHeight: "40px",
              margin: "5px"
            }}
            variant="outlined" color="primary" onClick={ handleClickOpen /*handleClickOpen*/}>
        Create Billing
      </Button>
      { /*<ChooseProfileNameDialog getOpen={ getOpen2 } setOpen={ setOpen2 } handleGetProfileName={ handleGetProfileName } />*/ }
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent className={classes.hideScrollbar} style={{padding: 0}}>
        <div className={classes.root}>
          <AppBar position="sticky" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Delivery" {...a11yProps(1)} />
              <Tab label="Payment" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div id="generalDetails">
                <TextField
                  label="Email"
                  margin="normal"
                  value={values.general_email}
                  onChange={handleChangev2('general_email')}
                />
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Phone"
                    margin="normal"
                    value={values.general_phone}
                    onChange={handleChangev2('general_phone')}
                  />
                </div>
                <TextField
                  label="Profile Name"
                  margin="normal"
                  value={values.general_profileName}
                  onChange={handleChangev2('general_profileName')}
                />
              </div>
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
                    value={values.shipping_firstName}
                    onChange={handleChangev2('shipping_firstName')}
                  />
                  <TextField
                    label="Last Name"
                    className={classes.textField}
                    margin="normal"
                    value={values.shipping_lastName}
                    onChange={handleChangev2('shipping_lastName')}
                  />
                </div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Zip Code"
                    margin="normal"
                    value={values.shipping_zipCode}
                    onChange={handleChangev2('shipping_zipCode')}
                  />
                  <TextField
                    label="State"
                    className={classes.textField}
                    margin="normal"
                    value={values.shipping_state}
                    onChange={handleChangev2('shipping_state')}
                  />
                  <TextField
                    label="City"
                    className={classes.textField}
                    margin="normal"
                    value={values.shipping_city}
                    onChange={handleChangev2('shipping_city')}
                  />
                </div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Address 1"
                    margin="normal"
                    value={values.shipping_address1}
                    onChange={handleChangev2('shipping_address1')}
                  />
                  <TextField
                    label="Address 2"
                    className={classes.textField}
                    margin="normal"
                    value={values.shipping_address2}
                    onChange={handleChangev2('shipping_address2')}
                  />
                </div>
                <TextField
                  select
                  label="Country"
                  value={values.shipping_country}
                  onChange={handleChangev2('shipping_country')}
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
                    value={values.billing_firstName}
                    onChange={handleChangev2('billing_firstName')}
                  />
                  <TextField
                    label="Last Name"
                    className={classes.textField}
                    margin="normal"
                    value={values.billing_lastName}
                    onChange={handleChangev2('billing_lastName')}
                  />
                </div>
                <div style={{display: 'flex'}}>
                <TextField
                    label="Zip Code"
                    margin="normal"
                    value={values.billing_zipCode}
                    onChange={handleChangev2('billing_zipCode')}
                  />
                  <TextField
                    label="State"
                    className={classes.textField}
                    margin="normal"
                    value={values.billing_state}
                    onChange={handleChangev2('billing_state')}
                  />
                  <TextField
                    label="City"
                    className={classes.textField}
                    margin="normal"
                    value={values.billing_city}
                    onChange={handleChangev2('billing_city')}
                  />
                </div>
                <div style={{display: 'flex'}}>
                  <TextField
                    label="Address 1"
                    margin="normal"
                    value={values.billing_address1}
                    onChange={handleChangev2('billing_address1')}
                  />
                  <TextField
                    label="Address 2"
                    className={classes.textField}
                    margin="normal"
                    value={values.billing_address2}
                    onChange={handleChangev2('billing_address2')}
                  />
                </div>
                <TextField
                  select
                  label="Country"
                  value={values.billing_country}
                  onChange={handleChangev2('billing_country')}
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
                  label="Holder Name"
                  margin="normal"
                  value={values.payment_cardHolder}
                  onChange={handleChangev2('payment_cardHolder')}
                />
                <div></div>
                <TextField
                  label="Card Number"
                  margin="normal"
                  value={values.payment_cardNumber}
                  onChange={handleChangev2('payment_cardNumber')}
                />
                <div style={{display: 'flex'}}>
                  <TextField
                    label="CVV"
                    style={{width: 70}}
                    margin="normal"
                    value={values.payment_cardCvv}
                    onChange={handleChangev2('payment_cardCvv')}
                  />
                  <TextField
                    label="MO"
                    className={classes.textField}
                    style={{width: 50}}
                    margin="normal"
                    value={values.payment_cardMonth}
                    onChange={handleChangev2('payment_cardMonth')}
                  />
                  <TextField
                    label="YR"
                    className={classes.textField}
                    style={{width: 50}}
                    margin="normal"
                    value={values.payment_cardYear}
                    onChange={handleChangev2('payment_cardYear')}
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
          <Button onClick={handleClickCreate} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}