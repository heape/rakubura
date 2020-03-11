import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import ChooseProfileNameDialog from './ChooseProfileNameDialog';
import { DoEditBilling } from '../tables/BillingTable'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { InputLabel } from '@material-ui/core';


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
  formControl: {
    margin: theme.spacing(1),
    maxHeight: 200,
    overflowY: 'scroll',
  },
  formGroup: {
    flexDirection: 'row',
    padding: 12,
  },
  FormControlLabel: {
    width: 154,
  },
  textField: {
    width: 300,
    height: '100%',
  },
  textField2: {
    width: 200,
    height: '100%',
    marginRight: 16,
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
];

export default function EditBillingDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState({
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
    payment_cardCVV: '',
    payment_cardMonth: '',
    payment_cardYear: '',
  });
  // const [state, setState] = React.useState(websitesState);

  const handleChangev2 = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
    
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const handleClickOpen = () => {
    //setOpen(true);
    var row = props.getRow();
    
    var values_ = values;

    values_.general_profileName = row.billingState.general.profileName;
    values_.general_email = row.billingState.general.email;
    values_.general_phone = row.billingState.general.phone;

    values_.shipping_firstName = row.billingState.delivery.shipping.firstName;
    values_.shipping_lastName = row.billingState.delivery.shipping.lastName;
    values_.shipping_zipCode = row.billingState.delivery.shipping.zipCode;
    values_.shipping_state = row.billingState.delivery.shipping.state;
    values_.shipping_city = row.billingState.delivery.shipping.city;
    values_.shipping_address1 = row.billingState.delivery.shipping.address1;
    values_.shipping_address2 = row.billingState.delivery.shipping.address2;
    values_.shipping_country = row.billingState.delivery.shipping.country;

    values_.billing_firstName = row.billingState.delivery.billing.firstName;
    values_.billing_lastName = row.billingState.delivery.billing.lastName;
    values_.billing_zipCode = row.billingState.delivery.billing.zipCode;
    values_.billing_state = row.billingState.delivery.billing.state;
    values_.billing_city = row.billingState.delivery.billing.city;
    values_.billing_address1 = row.billingState.delivery.billing.address1;
    values_.billing_address2 = row.billingState.delivery.billing.address2;
    values_.billing_country = row.billingState.delivery.billing.country;

    values_.payment_cardNumber = row.billingState.payment.creditCard.number;
    values_.payment_cardHolder = row.billingState.payment.creditCard.holder;
    values_.payment_cardCVV = row.billingState.payment.creditCard.cvv;
    values_.payment_cardMonth = row.billingState.payment.creditCard.expiration.month;
    values_.payment_cardYear = row.billingState.payment.creditCard.expiration.year;

    setValues(values_);

    setOpen2(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleClickSave = () => {    
    // do something

    var row = props.getRow();

    row.billingState.general.profileName = values.general_profileName;
    row.billingState.general.email = values.general_email;
    row.billingState.general.phone = values.general_phone;

    row.billingState.delivery.shipping.firstName = values.shipping_firstName;
    row.billingState.delivery.shipping.lastName = values.shipping_lastName;
    row.billingState.delivery.shipping.zipCode = values.shipping_zipCode;
    row.billingState.delivery.shipping.state = values.shipping_state;
    row.billingState.delivery.shipping.city = values.shipping_city;
    row.billingState.delivery.shipping.address1 = values.shipping_address1;
    row.billingState.delivery.shipping.address2 = values.shipping_address2;
    row.billingState.delivery.shipping.country = values.shipping_country;

    row.billingState.delivery.billing.firstName = values.billing_firstName;
    row.billingState.delivery.billing.lastName = values.billing_lastName;
    row.billingState.delivery.billing.zipCode = values.billing_zipCode;
    row.billingState.delivery.billing.state = values.billing_state;
    row.billingState.delivery.billing.city = values.billing_city;
    row.billingState.delivery.billing.address1 = values.billing_address1;
    row.billingState.delivery.billing.address2 = values.billing_address2;
    row.billingState.delivery.billing.country = values.billing_country;

    row.billingState.payment.creditCard.number = values.payment_cardNumber;
    row.billingState.payment.creditCard.holder = values.payment_cardHolder;
    row.billingState.payment.creditCard.cvv = values.payment_cardCVV;
    row.billingState.payment.creditCard.expiration.month = values.payment_cardMonth;
    row.billingState.payment.creditCard.expiration.year = values.payment_cardYear;
    
    DoEditBilling(row);
    
    handleClose();
    // DoRun();
  };

  props.callback(handleClickOpen);
  const Block = () => { return (<div></div>); };

  return (
    <div>
      { /*<ChooseProfileNameDialog getOpen={ getOpen2 } setOpen={ setOpen2 } handleGetProfileName={ handleGetProfileName } />*/ }
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          <Button onClick={handleClickSave} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
