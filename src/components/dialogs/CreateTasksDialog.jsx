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
import TaskProfilesDialog from '../dialogs/TaskProfilesDialog';
import TaskProfiles from '../tasks_main/TaskProfiles';
import { DoCreateTask } from "../tables/TasksTable";
import ReactDateTimePicker from '../pickers/ReactDateTimePicker';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { InputLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: 1024,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  paper: {
    width: 900
  },
  ccmy: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  },
  buttons: {
    textAlign: "center"
  }
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
]

export default function CreateTasksDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [values, setValues] = React.useState({
    website: '',
    keywords: '',
    size: '',
    style: '',
    date: '',
    profiles: {
      checkoutProxy: '',
      monitorProxy: '',
      billing: '',
      account: '',
      state_disabled: true,
    },
  });

  const handleChange = name => event => {
    if(name === 'website' && values.profiles.state_disabled) {
      const values_ = Object.assign({}, values);
      values_.profiles.state_disabled = false;
      setValues(values_);
    }
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    const values_ = Object.assign({}, values);
    values_.profiles.state_disabled = true;
    setValues(values_);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangedDate = (date) => {
    values.date = date;

    setValues({...values});
  };

  const handleClickCreate = () => {
    handleClose();
    
    var profiles = profilesValues;
    // do something
    DoCreateTask(values.website, values.keywords, values.size, values.style, values.date.format('MM/DD/YYYY hh:mm A'), 'Active' , 'Idle', profiles);
  };

  const handleOpenInBrowser = () => {
    if(values.keywords !== '' && (values.keywords.includes('http://') || values.keywords.includes('https://'))) {
      const { BrowserWindow } = window.require('electron').remote;

      // Or use `remote` from the renderer process.
      // const { BrowserWindow } = require('electron').remote

      let win = new BrowserWindow({ width: 800, height: 600 })
      win.on('closed', () => {
        win = null
      })

      // Load a remote URL
      win.loadURL(values.keywords);
    }
  }
  
  //const { w01, w02 , w03, w04, w05, w06 } = state;

  const addMB = (bottom = 16) => { return (<div style={{marginBottom: bottom}}></div>); };

  var profilesValues = null;
  const setProfilesValues = (o) => { 
    profilesValues = o;
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
        Create Tasks
      </Button>
      { /*<ChooseProfileNameDialog getOpen={ getOpen2 } setOpen={ setOpen2 } handleGetProfileName={ handleGetProfileName } />*/ }
      <Dialog className={'f_createTasksDialog'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Create Tasks</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-select"
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
            helperText="Please select the website"
            margin="normal"
          >
            {window.core.vars.websites.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Keywords, URLs"
            className={classes.textField}
            value={values.keywords}
            onChange={handleChange("keywords")}
            margin="normal"
          />
          <TextField
            label="Size"
            className={classes.textField}
            value={values.size}
            onChange={handleChange("size")}
            margin="normal"
          />
          <TextField
            label="Style"
            className={classes.textField}
            value={values.style}
            onChange={handleChange("style")}
            margin="normal"
          />
          { addMB(20) }
          <div className="text-center">
            <TaskProfiles values={values} setProfilesValues={setProfilesValues} />
            { addMB(20) }
            <Button onClick={handleOpenInBrowser} color="primary">Open in Browser</Button>
          </div>
          { addMB(1) }
          <ReactDateTimePicker values={ values } handleChangedDate={ handleChangedDate }/>
          { addMB(30) }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickCreate} color="primary" disabled={values.date === ''}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
