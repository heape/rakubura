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
import EditTaskDialog from '../dialogs/EditTaskDialog';
import { useForceUpdate } from '../Utility/Functions';

var forceUpdate = null;

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

function createData(id, website, product, size, style, startTime, proxies, status, profiles) {
  return { id, website, product, size, style, startTime, proxies, status, profiles };
}

var profiles = {
  checkoutProxy: '',
  monitorProxy: '',
  billing: '',
  account: '',
};

// dank.tasks オブジェクトから持ってくる、
var rows22222 = [
  createData(1, 'SNKRS', '+jordan', '27.5', 'None', '2019', 'None', 'Idle', profiles),
  createData(2, 'SNKRS', '+jordan', '27.5', 'None', '2019', 'None', 'Idle', profiles),
  createData(3, 'SNKRS', '+jordan', '27.5', 'None', '2019', 'None', 'Idle', profiles),
];
var rows = window.core.task.getAll();
var tick = null;
if(!window.core.vars['loaded']) {
  tick = setInterval(loop, 10);
}
function loop() {
  if(window.core.vars['loaded']) {
    rows = window.core.task.getAll();
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
};

export async function DoCreateTask(website, product, size, style, startTime = '2019:09:02', proxies = 'None', status = 'Idle', profiles) {
  var id = rows.length == 0? 1 : (rows.slice(-1)[0].id + 1);
  var data = createData(id, website, product, size, style, startTime, proxies, status, profiles);
  
  rows.push(data);

  if(forceUpdate !== null)
    forceUpdate();

  await window.core.task.create(data);
}

function DoRunTask(row) {
  if(row.status === 'Idle') {
    row.status = 'Running';
  } else {
    row.status = 'Idle';
  }
  if (forceUpdate !== null) {
    forceUpdate();
  }
}

export async function DoEditTask(row) {
  rows[findIndex(row.id)] = row;

  if (forceUpdate !== null) {
    forceUpdate();
  }

  await window.core.task.update(row.id, row);
}

async function DoDeleteTask(row) {
  if(locks.v1)
    return;
    
  locks.v1 = true;
  rows.splice(findIndex(row.id), 1);

  if (forceUpdate !== null) {
    forceUpdate();
  }

  await window.core.task.delete(row.id);
  locks.v1 = false;
}

export default function TasksTable() {
  const classes = useStyles();
  forceUpdate = useForceUpdate();

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  var openCallback = null;

  const openConfirmationDialog = v => {
    setOpen2(true);

    vars.row_tmp = v;
  };
  
  const openEditTaskDialog = v => {
    setOpen3(true);

    vars.row_tmp = v;

    openCallback();
  }

  const confirmationCallback = v => {
    if(v === 'OK') {
      DoDeleteTask(vars.row_tmp);
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
            <TableCell align="left">Website</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Style</TableCell>
            <TableCell align="left">Start Time</TableCell>
            <TableCell align="left">Proxies</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} hover>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.website}</TableCell>
              <TableCell align="left">{row.product}</TableCell>
              <TableCell align="left">{row.size}</TableCell>
              <TableCell align="left">{row.style}</TableCell>
              <TableCell align="left">{row.startTime}</TableCell>
              <TableCell align="left">{row.proxies}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                <div style={{display: 'flex'}}>
                  {row.status === 'Idle'? 
                  (<Fab className={classes.Fab1} onClick={DoRunTask.bind(this, row)}>
                  <i className={classes.icon + ' material-icons'}>play_circle_filled</i>
                  </Fab>)
                  :
                  (<Fab className={classes.Fab1_2} onClick={DoRunTask.bind(this, row)}>
                  <i className={classes.icon + ' material-icons'}>pause_circle_filled</i>
                  </Fab>)
                  }
                  {/*<a onClick={ DoRunProxy.bind(this, row) } className="mr-2">{row.status !== 'Idle'? 'Pause' : 'Play'}</a>*/}
                  <Fab className={classes.Fab2}  onClick={openEditTaskDialog.bind(this, row)}>
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

      <ConfirmationDialog open={Boolean(open2)} setOpen={setOpen2} callback={ confirmationCallback } text={'Do you delete the content?'} />
      <EditTaskDialog open={Boolean(open3)}  setOpen={setOpen3} getRow={getRow} callback={getOpenCallback}/>
    </Paper>
  );
}