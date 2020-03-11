import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import ChooseProfileNameDialog from './ChooseProfileNameDialog';
import { DoEditAccount } from '../tables/AccountsTable'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { InputLabel } from '@material-ui/core';

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

const proxyTypes = [
  {
    value: 'Monitor Proxies',
    label: 'Monitor Proxies',
  },
  {
    value: 'Checkout Proxies',
    label: 'Checkout Proxies',
  },
];

const websitesState = {};
window.core.vars.websites.forEach((v, i) => { websitesState[v.value] = false });


export default function EditAccountDialog(props) {
  const classes = useStyles();
  const [open2, setOpen2] = React.useState(false);
  const [values, setValues] = React.useState({
    profileName: '',
    email: '',
    password: '',
    website: '',
  });
  const [state, setState] = React.useState(websitesState);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeChecked = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleClickOpen = () => {
    //setOpen(true);
    var row = props.getRow();
    var websitesState_ = row.websites;
    setState(websitesState_);
    
    var values_ = values;
    values_.email = row.email;
    values_.password = row.password;

    setValues(values_);

    setOpen2(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleClickSave = () => {    
    // do something

    var row = props.getRow();
    row.email = values.email;
    row.password = values.password;
    row.websites = state;
    
    DoEditAccount(row);
    

    handleClose();
    // DoRun();
  };

  props.callback(handleClickOpen);
  const Block = () => { return (<div></div>); };

  return (
    <div>
      { /*<ChooseProfileNameDialog getOpen={ getOpen2 } setOpen={ setOpen2 } handleGetProfileName={ handleGetProfileName } />*/ }
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Edit Proxies</DialogTitle>
        <DialogContent>
          <span>Websites</span>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup className={ classes.formGroup }>
              { Object.getOwnPropertyNames(state).map(v => (
                  <FormControlLabel
                  key={ v } 
                  className= { classes.FormControlLabel }
                  control={<Checkbox checked={ state[v] } onChange={handleChangeChecked(v)} value={ v } />}
                  label={ v }
                />
              )) }
            </FormGroup>
          </FormControl>
          <TextField
            className={classes.textField2}
            value={values.email}
            onChange={ handleChange('email') }
            margin="dense"
            label="Email"
            type="text"
            fullWidth
          />
          <TextField
            className={classes.textField2}
            value={ values.password }
            onChange={ handleChange('password') }
            margin="dense"
            label="Password"
            type="text"
            fullWidth
          />
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
