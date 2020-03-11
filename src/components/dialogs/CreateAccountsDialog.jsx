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
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import ChooseProfileNameDialog from './ChooseProfileNameDialog';
import { DoCreateAccount } from '../tables/AccountsTable'

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
    width: '100%',
    height: '100%',
  },
}));

const websitesState = {};
window.core.vars.websites.forEach((v, i) => { websitesState[v.value] = false });

export default function CreateAccountsDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [values, setValues] = React.useState({
    profileName: '',
    accountList: '',
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCreate = () => {    
    // do something
    DoRun();
  };

  const DoRun = () => {
    var data = [];
    
    var valid = true;
    var account_lines = values.accountList.split('\n');

    if (account_lines[0] == '') {
        return handleClose();
    }

    // validation
    account_lines.forEach((v, i) => {
      var account_parts = v.split(':');
      if (account_parts.length === 1 && account_parts[0] === '') {
        account_parts = null;
        valid = false;
        return true;
      }
      if (account_parts.length === 2) {
        var email = account_parts[0];
        var password = account_parts[1];

        data.push({
          email: email,
          password: password,
        });
      } else {
        account_parts = null;
        valid  = false;
        return true;
      }
    });

    if (!valid) {
      return handleClose();
    }

    // adding
    var checkedWebsites = state;
    data.forEach((v, i) => {
      DoCreateAccount(v.email, v.password, checkedWebsites)
    });

    return handleClose();
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
            variant="outlined" color="primary" onClick={ handleClickOpen /*setOpen2.bind(true)*/ /*turn on this when want to choose profile name*/ }>
        Create Accounts
      </Button>
      { /*<ChooseProfileNameDialog getOpen={ getOpen2 } setOpen={ setOpen2 } handleGetProfileName={ handleGetProfileName } />*/ }
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Create Accounts</DialogTitle>
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
            value={ values.accountList }
            onChange={ handleChange('accountList') }
            autoFocus
            multiline
            rows="14"
            rowsMax="14"
            margin="dense"
            id="name"
            label="Paste Accounts"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
