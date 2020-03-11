import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';

function PaperComponent(props) {
  return (
    <Paper {...props} style={{width: 400}}/>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = (v) => {
    props.setOpen(false);

    props.callback(v);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose.bind(this, 'Blur')}
        PaperComponent={PaperComponent}
      >
        <DialogTitle>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose.bind(this, 'Cancel')} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose.bind(this, 'OK')} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}