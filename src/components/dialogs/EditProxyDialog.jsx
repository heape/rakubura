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
import { DoEditProxy } from '../tables/ProxiesTable'
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

export default function EditProxyDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [values, setValues] = React.useState({
    profileName: '',
    proxyList: '',
    ip: '',
    port: '',
    username: '',
    password: '',
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
    //setOpen(true);
    var row = props.getRow();
    var websitesState_ = row.websites;
    setState(websitesState_);
    
    var values_ = values;
    values_.ip = row.ip;
    values_.port = row.port;
    values_.username = row.username;
    values_.password = row.password;

    values_.proxyType = row.type === 'Monitor'? 'Monitor Proxies' : 'Checkout Proxies';

    setValues(values_);

    setOpen2(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleClickSave = () => {    
    // do something

    var row = props.getRow();
    row.ip = values.ip;
    row.port = values.port;
    row.username = values.username;
    row.password = values.password;
    row.type = values.proxyType === 'Monitor Proxies'? 'Monitor' : 'Checkout';
    row.websites = state;
    
    DoEditProxy(row);
    

    handleClose();
    console.log(state);
    // DoRun();
  };

  const getOpen2 = () => {
    return Boolean(open2);
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
      DoEditProxy(v.ip, v.port, v.user == null ? 'None': v.user, v.password === null ? 'None' : v.password, selectedProxyType , checkedWebsites)
    });

    return handleClose();
  };

  //const { w01, w02 , w03, w04, w05, w06 } = state;

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
        {/*
        <TextField
          select
          label="Website"
          className={classes.textField}
          value={values.website}
          onChange={handleChange("website")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText=""
          margin="normal"
        >
          {websites.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        */}
        <TextField
          select
          label="Proxy Types"
          className={classes.textField}
          value={values.proxyType}
          style={{display: 'block'}}
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
          value={values.ip}
          onChange={ handleChange('ip') }
          margin="dense"
          label="IP"
          type="text"
          fullWidth
        />
        <TextField
          className={classes.textField2}
          value={ values.port }
          style={{width: 70}}
          onChange={ handleChange('port') }
          margin="dense"
          label="Port"
          type="text"
          fullWidth
        />
        {Block()}
        <TextField
          className={classes.textField2}
          value={ values.username }
          onChange={ handleChange('username') }
          margin="dense"
          label="Username"
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
