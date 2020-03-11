import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    height: 500,
  },
  textField: {
    width: 400,
    height: '100%',
  }
}));

export default function ChooseProfileNameDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    profileName: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    props.setOpen(false);
  }

  const handleClickChoose = () => {
    handleClose();
    
    setTimeout(() => { props.handleGetProfileName(values.profileName); }, 100);
  }

  return (
    <div>
      <Dialog open={ props.getOpen() } onClose={ handleClose } aria-labelledby="form-dialog-title">
        <DialogTitle>Choose Profile Name</DialogTitle>
        <DialogContent>
          <TextField
            className={ classes.textField }
            value={ values.profileName }
            onChange= { handleChange('profileName') }
            autoFocus
            margin="dense"
            label="Type here"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Cancel
          </Button>
          <Button onClick={ handleClickChoose } color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
