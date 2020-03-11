import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ConfirmationDialog from '../dialogs/ConfirmationDialog';
import EditAccountDialog from '../dialogs/EditAccountDialog';
import Paper from '@material-ui/core/Paper';
import { useForceUpdate } from '../Utility/Functions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(0),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  Fab1: {
    margin: 0,
    marginRight: 2,
    minHeight: 0,
    width: 42,
    height: 25,
    backgroundColor: '#00c853',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#01b74d',
    },
  },
  Fab1_2: {
    margin: 0,
    marginRight: 2,
    minHeight: 0,
    width: 42,
    height: 25,
    backgroundColor: '#f14555',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#df3745',
    },
  },
  Fab2: {
    margin: 0,
    marginRight: 2,
    minHeight: 0,
    width: 42,
    height: 25,
    backgroundColor: '#4295f1',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#1b84f5',
    },
  },
  Fab3: {
    margin: 0,
    minHeight: 0,
    width: 42,
    height: 25,
    backgroundColor: '#ff5565',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#ec4455',
    },
  },
  icon: {
    color: '#464646',
    fontSize: 21,
  },
}));

var forceUpdate = null;

const websitesState = {};
window.core.vars.websites.forEach((v, i) => { websitesState[v.value] = false });

function createData(id, email, password, websites) {
  return { id, email, password, websites };
}

const rows22 = [
  createData(1, 'a@g.cc', 'abc123', websitesState),
  createData(2, 'b@g.cc', 'abc123', websitesState),
  createData(3, 'c@g.cc', 'abc123', websitesState),
];

var rows = window.core.account.getAll();
var tick = null;
if(!window.core.vars['loaded']) {
  tick = setInterval(loop, 10);
}
function loop() {
  if(window.core.vars['loaded']) {
    rows = window.core.account.getAll();
    clearInterval(tick);
  }
}

function findIndex(id) {
  var idx = -1;
  rows.forEach((v, i) => {
    if(v.id === id) {
      idx = i;
      return true;
    }
  });
  return idx;
}

var vars = {
  setOpen: null,
  row_tmp: [],
};

const locks = {
  v1: false,
}

export async function DoCreateAccount(email, password, websites) {
  var id = rows.length == 0? 1 : (rows.slice(-1)[0].id + 1);
  rows.push(createData(id, email, password, websites));

  if (forceUpdate !==null) {
    forceUpdate();
  }

  await window.core.account.create(rows.slice(-1)[0]);
};

export async function DoEditAccount(row) {
  rows[findIndex(row.id)] = row;

  if (forceUpdate !== null) {
    forceUpdate();
  }

  await window.core.account.update(row.id, row);
}

async function DoDeleteAccount(row) {
  if(locks.v1)
    return;
    
  locks.v1 = true;
  rows.splice(findIndex(row.id), 1);

  if (forceUpdate !== null) {
    forceUpdate();
  }

  await window.core.account.delete(row.id);
  locks.v1 = false;
}

export default function AccountsTable() {
  const classes = useStyles();
  forceUpdate = useForceUpdate();

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  var openCallback = null;

  const openConfirmationDialog = v => {
    setOpen2(true);

    vars.row_tmp = v;
  };
  
  const openEditAccountDialog = v => {
    setOpen3(true);

    vars.row_tmp = v;

    openCallback();
  }

  const confirmationCallback = v => {
    if(v === 'OK') {
      DoDeleteAccount(vars.row_tmp);
    }
  };

  const getOpenCallback = v => {
    openCallback = v;
  };

  const getRow = () => {
    return Object.assign({}, vars.row_tmp);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Password</TableCell>
            <TableCell align="left">Website</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} hover>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.password}</TableCell>
              <TableCell align="left">{row.website}</TableCell>
              <TableCell align="left">
                <div style={{display: 'flex'}}>
                  <Fab className={classes.Fab2}  onClick={openEditAccountDialog.bind(this, row)}>
                    <i className={classes.icon + ' material-icons'}>view_list</i>
                  </Fab>
                  <Fab className={classes.Fab3} onClick={openConfirmationDialog.bind(this, row)}>
                    <i className={classes.icon + ' material-icons'}>delete</i>
                  </Fab>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmationDialog open={Boolean(open2)} setOpen={setOpen2} callback={confirmationCallback} text={'Do you delete the content?'} />
      <EditAccountDialog open={Boolean(open3)}  setOpen={setOpen3} getRow={getRow} callback={getOpenCallback}/>
    </Paper>
  );
}