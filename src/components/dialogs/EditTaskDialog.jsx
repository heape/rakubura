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
import { DoEditTask } from '../tables/TasksTable'
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
];

export default function EditTaskDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [values, setValues] = React.useState({
    website: '',
    keywords: '',
    size: '',
    style: '',
    date: '',

    // get profiles from dank object.
    profiles: {
      checkoutProxy: '',
      monitorProxy: '',
      billing: '',
      account: '',
    },
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    //setOpen(true);
    var row = props.getRow();
    //var websitesState_ = row.websites;
    //setState(websitesState_);
    
    var values_ = Object.assign({}, values);
    values_.website = row.website;
    values_.keywords = row.product;
    values_.size = row.size;
    values_.style = row.style;
    values_.date = row.startTime;
    values_.profiles = row.profiles;

    console.log(values_);
    setValues(values_);

    setOpen2(true);

    // window.se = setValues_;
    //setValues_(values_.profiles);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleClickSave = () => {    
    // do something

    var row = props.getRow();
    row.website = values.website;
    row.product = values.keywords;
    row.size = values.size;
    row.style = values.style;
    row.startTime = values.date.format('MM/DD/YYYY hh:mm A');
    row.profiles = profilesValues;

    DoEditTask(row);
    
    handleClose();
    // DoRun();
  };

  const handleChangedDate = (date) => {
    values.date = date;
  };

  //const { w01, w02 , w03, w04, w05, w06 } = state;

  props.callback(handleClickOpen);

  const Block = () => { return (<div></div>); };
  const addMB = (bottom = 16) => { return (<div style={{marginBottom: bottom}}></div>); };

  
  var profilesValues = null;
  const setProfilesValues = (o) => { 
    profilesValues = o;
  };
  
  return (
    <div>
      { /*<ChooseProfileNameDialog getOpen={ getOpen2 } setOpen={ setOpen2 } handleGetProfileName={ handleGetProfileName } />*/ }
      <Dialog className={'f_createTasksDialog'} open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle>Edit Task</DialogTitle>
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
            required
            label="Size"
            className={classes.textField}
            value={values.size}
            onChange={handleChange("size")}
            margin="normal"
          />
          <TextField
            required
            label="Style"
            className={classes.textField}
            value={values.style}
            onChange={handleChange("style")}
            margin="normal"
          />
          { addMB(20) }
          <div className="text-center">
            <TaskProfiles values={values} setProfilesValues={setProfilesValues}/>
            { addMB(20) }
            <Button>Options</Button>
          </div>
          { addMB(1) }
          <ReactDateTimePicker values={ values } handleChangedDate={ handleChangedDate }/>
          { addMB(30) }
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
