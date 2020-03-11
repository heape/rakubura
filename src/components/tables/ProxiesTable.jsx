import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ConfirmationDialog from '../dialogs/ConfirmationDialog';
import EditProxyDialog from '../dialogs/EditProxyDialog';
import { useForceUpdate } from '../Utility/Functions';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(0),
    overflowX: 'auto',
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
  table: {
    minWidth: 650,
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
}));

var forceUpdate = null;

const websitesState = {};
window.core.vars.websites.forEach((v, i) => { websitesState[v.value] = false });

function createData(id, ip, port, username, password, type, websites, speed, status) {
  return { id, ip, port, username, password, type, websites, speed, status };
}

var rows = window.core.proxy.getAll();
var tick = null;
if(!window.core.vars['loaded']) {
  tick = setInterval(loop, 10);
}
function loop() {
  if(window.core.vars['loaded']) {
    rows = window.core.proxy.getAll();
    clearInterval(tick);
  }
}

const rows2 = [
  createData(1, '1','1','1','1', 'Monitor', websitesState, '100ms', 'Idle'),
  createData(2, '1','1','1','1', 'Monitor', websitesState, '100ms', 'Idle'),
  createData(3, '1','1','1','1', 'Monitor', websitesState, '100ms', 'Idle'),
];

window.proxies = [

];

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

export async function DoCreateProxy(ip, port, username, password, type, websites, speed = '100ms', status = 'Idle') {
  
  // websites is for associating 
  
  var id = rows.length == 0? 1 : (rows.slice(-1)[0].id + 1);
  rows.push(createData(id, ip, port, username, password, type, websites, speed , status));

  if (forceUpdate !== null) {
    forceUpdate();
  }

  await window.core.proxy.create(rows.slice(-1)[0]);
}

function DoRunProxy(row) {
  if(row.status === 'Idle') {
    row.status = 'Running';
  } else {
    row.status = 'Idle';
  }
  if (forceUpdate !== null) {
    forceUpdate();
  }
}

export async function DoEditProxy(row) {
  rows[findIndex(row.id)] = row;

  if (forceUpdate !== null) {
    forceUpdate();
  }
  
  await window.core.proxy.update(row.id, row);
}

async function DoDeleteProxy(row) {
  if(locks.v1)
    return;
    
  locks.v1 = true;
  rows.splice(findIndex(row.id), 1);

  if (forceUpdate !== null) {
    forceUpdate();
  }

  await window.core.proxy.delete(row.id);
  locks.v1 = false;
}

export default function ProxiesTable() {
  const classes = useStyles();
  forceUpdate = useForceUpdate();

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  var openCallback = null;

  const openConfirmationDialog = v => {
    setOpen2(true);

    vars.row_tmp = v;
  };
  
  const openEditProxyDialog = v => {
    setOpen3(true);

    vars.row_tmp = v;

    openCallback();
  }

  const confirmationCallback = v => {
    if(v === 'OK') {
      DoDeleteProxy(vars.row_tmp);
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
            <TableCell width="100">ID 　</TableCell>
            <TableCell width="168" align="left">IP　　　　</TableCell>
            <TableCell align="left">Port　</TableCell>
            <TableCell align="left">Username　</TableCell>
            <TableCell align="left">Password　</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Speed</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} hover>
              <TableCell className={classes.ellipsis} style={{width:100}} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell className={classes.ellipsis} style={{maxWidth:168}} align="left">{row.ip}</TableCell>
              <TableCell align="left">{row.port}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.password}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.speed}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                <div style={{display: 'flex'}}>
                  {row.status === 'Idle'? 
                  (<Fab className={classes.Fab1} onClick={DoRunProxy.bind(this, row)}>
                  <i className={classes.icon + ' material-icons'}>timer</i>
                  </Fab>)
                  :
                  (<Fab className={classes.Fab1_2} onClick={DoRunProxy.bind(this, row)}>
                  <i className={classes.icon + ' material-icons'}>pause_circle_filled</i>
                  </Fab>)
                  }
                  {/*<a onClick={ DoRunProxy.bind(this, row) } className="mr-2">{row.status !== 'Idle'? 'Pause' : 'Play'}</a>*/}
                  <Fab className={classes.Fab2}  onClick={openEditProxyDialog.bind(this, row)}>
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
      <EditProxyDialog open={Boolean(open3)}  setOpen={setOpen3} getRow={getRow} callback={getOpenCallback}/>
    </Paper>
  );
}