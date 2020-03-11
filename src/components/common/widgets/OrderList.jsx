import React from "react";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiArrowRight, mdiPlay, mdiSquare, } from '@mdi/js';
import { useForceUpdate } from '../../utility/Functions';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 240,
    height: 50,
    backgroundColor: 'rgba(242, 47, 49, 1)',
  },
  form: {
    marginLeft: 10,
    padding: theme.spacing(1),
  },
  iconRoot: {
    display: 'inline-block',
    top: 3,
    position: 'relative',
  },
  icon: {
    marginRight: 9,
    backgroundColor: 'rgba(191, 10, 12, 1)',
  },
  orderListBox: {
    border: 'solid 2px rgba(215, 215, 215, 1)',
    borderTop: 'none',
    borderRight: 'none',
    borderRadius: '0 0 0 8px / 0 0 0 8px',
    height: 'calc(100vh - 114px)',
    maxHeight: 'calc(100vh - 114px)',
    overflowY: 'scroll',
    top: 8,
    position: 'relative',
  },
  orderListLabel: {
    fontFamily: '"游ゴシック","YuGothic","Yu Gothic","游ゴシック体"; font-weight: 500',
    fontSize: 13,
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 1)',
    marginRight: 10,
    top: 3,
    position: 'relative',
  },
  orderItemBox: {
    width: '100%',
    height: 85,
  },
  playButton: {
    minWidth: 40,
    backgroundColor: 'rgba(194, 10, 12, 1)',
    padding: '1px 0',
    marginRight: 8,
  },
  pauseButton: {
    minWidth: 40,
    backgroundColor: 'rgba(194, 10, 12, 1)',
    padding: '0.3rem 0'
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        '&:hover': {
          backgroundColor: 'rgba(164, 10, 12, 1)'
        }
      },
    },
    MuiPaper: {
      elevation3: {
        boxShadow: '0 0 4px 2px rgba(0, 0, 0, 0.1), 0 0 4px 2px rgba(0, 0, 0, 0.24), 0 0 1px 1px rgba(0, 0, 0, 0.06)'
      }
    }
  },
});

const Items = window.core.tasks;

function generate(element) {
  return [0, 1].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}


export default function OrderList() {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  const [values, setValues] = React.useState({
    url: 'https://www.rakuten.co.jp',
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const register = () => {
    window.core.system.functions['orderList']['update'] = forceUpdate;
  };

  const listUp = () => {
    return Items.map( v =>
      <ListItem key={v.id}>
        <Paper className={classes.orderItemBox} elevation={3}>
        <ListItemText
          primary={v.item.name}
        />
        </Paper>
      </ListItem>,
    )
  };

  register();
  
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.iconRoot}>
            <span className={classes.orderListLabel}>オーダーリスト</span>
            <Tooltip title="すべて開始" enterDelay={500} leaveDelay={200}>
              <Button className={classes.playButton} variant="contained" size='small'>
                <Icon path={mdiPlay}
                  size={1}
                  horizontal
                  vertical
                  rotate={180}
                  color="white"/>
              </Button>
            </Tooltip>
            <Tooltip title="すべて停止" enterDelay={500} leaveDelay={200}>
              <Button className={classes.pauseButton} variant="contained" size='small'>
                <Icon path={mdiSquare}
                  size={0.7}
                  horizontal
                  vertical
                  rotate={180}
                  color="white"/>
              </Button>
            </Tooltip>
          </div>
        </form>
        <div className={classes.orderListBox}>
          <List dense={true}>
            {listUp()}
          </List>
        </div>
      </MuiThemeProvider>
    </div>
  );
}