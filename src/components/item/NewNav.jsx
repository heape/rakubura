import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { useForceUpdate } from '../utility/Functions';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% - 240px)',
    height: 50,
    backgroundColor: 'rgba(242, 47, 49, 1)',
  },
  form: {
    marginLeft: 10,
    padding: theme.spacing(1),
  },
  inputBoxRoot: {
    padding: '0 10px 0 8px',
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'inline-block',
    top: 1,
    position: 'relative',
  },
  inputBox: {
    borderRadius: 6,
    width: '96%',
    fontWeight: 400,
    color: 'rgba(10, 10, 10, 1)',
    top: 1,
    position: 'relative',
  },
  iconRoot: {
    float: 'right',
    display: 'inline-block',
    top: 3,
    position: 'relative',
  },
  icon: {
    marginRight: 9,
  },
  iconClose: {
    marginRight: 4,
  },
  orderBoxRoot: {
    float: 'right',
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  addNewButton: {
    fontWeight: 500,
    backgroundColor: 'rgba(184, 231, 22, 1)',
    marginRight: 14,
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        '&:hover': {
          backgroundColor: 'rgba(147, 184, 18, 1)'
        }
      },
      label: {
        fontFamily: '"游ゴシック","YuGothic","Yu Gothic","游ゴシック体"; font-weight: 600'
      }
    }
  }
});

let forceUpdate = null;

export default function NewNav() {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    url: 'https://www.rakuten.co.jp',
  });
  forceUpdate = useForceUpdate();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = (...args) => {
    if(args[0] === 'addTask') {
      const tasks = window.core.tasks;
      const id = tasks.length == 0 ? 1 : (tasks.slice(-1)[0].item.id + 1);
      console.log(tasks.slice(-1)[0]);

      window.core.api.create('tasks', {
        id: id,
        item: {
          url: 'https://item.rakuten.co.jp/project1-6/4530956586687/',
          shopName: 'project1-6',
          name: 'PINK NOBITA',
          imageUrl: 'https://shop.r10s.jp/project1-6/cabinet/04377348/05851182/imgrc0072668965.jpg',
          price: 19993,
          salesDateTime: '2020年01月24日00時00分～2020年02月10日23時59分',
        },
        state: 'idle',
      });
      window.core.api.call('orderList', 'update');
    } else if(args[0] === 'close') {
      history.push('/');
    }
  };
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.iconRoot}>
            <Button className={classes.addNewButton} variant="contained" size='small' onClick={handleClick.bind(this, 'addTask')}>
              新規追加
            </Button>
            <IconButton edge="start" color="inherit" size="small" className={classes.iconClose} onClick={handleClick.bind(this, 'close')}>
              <Icon path={mdiClose}
                size={1}
                horizontal
                vertical
                rotate={180}
                color="white"/>
            </IconButton>
          </div>
        </form>
      </MuiThemeProvider>
    </div>
  );
}