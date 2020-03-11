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
import { DoCreateProxy } from '../tables/ProxiesTable'
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
    width: '100%',
    height: '100%',
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

export default function CreateProxiesDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [values, setValues] = React.useState({
    profileName: '',
    proxyList: '',
    proxyType: 'Monitor Proxies',
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
    var proxy_lines = values.proxyList.split('\n');

    if (proxy_lines[0] == '') {
        return handleClose();
    }

    // validation
    proxy_lines.forEach((v, i) => {
      var proxy_parts = v.split(':');
      if (proxy_parts.length === 1 && proxy_parts[0] === '') {
        
        proxy_parts = null;
        valid = false;
        return true;
      }
      if (proxy_parts.length === 2 || proxy_parts.length === 4) {
        var ip = proxy_parts[0];
        var port = proxy_parts[1];
        var user = null, password = null;
        if (proxy_parts.length == 4) {
          user = proxy_parts[2];
          password = proxy_parts[3];
        }

        data.push({
          ip: ip,
          port: port,
          user: user,
          password: password,
        });
      } else {

        proxy_parts = null;
        valid  = false;
        return true;
      }
    });

    if (!valid) {
      return handleClose();
    }

    // adding
    var selectedProxyType = values.proxyType == 'Monitor Proxies'? 'Monitor' : 'Checkout';
    var checkedWebsites = state;
    data.forEach((v, i) => {
      DoCreateProxy(v.ip, v.port, v.user == null ? 'None': v.user, v.password === null ? 'None' : v.password, selectedProxyType, checkedWebsites)
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
        Create Proxies
      </Button>
      { /*<ChooseProfileNameDialog getOpen={ getOpen2 } setOpen={ setOpen2 } handleGetProfileName={ handleGetProfileName } />*/ }
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Create Proxies</DialogTitle>
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
          select
          label="Proxy Types"
          className={classes.textField}
          value={values.proxyType}
          onChange={handleChange("proxyType")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText=""
          margin="normal"
        >
          {proxyTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          <TextField
            className={classes.textField2}
            value={ values.proxyList }
            onChange={ handleChange('proxyList') }
            autoFocus
            multiline
            rows="12"
            rowsMax="12"
            margin="dense"
            id="name"
            label="Paste Proxies"
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
