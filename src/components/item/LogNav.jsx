import React from "react";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Icon from '@mdi/react';
import { mdiClose, mdiClipboardText  } from '@mdi/js';
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
  iconClipBoard: {
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
  const [values, setValues] = React.useState({
    url: 'https://www.rakuten.co.jp',
  });
  forceUpdate = useForceUpdate();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.iconRoot}>
            <IconButton edge="start" color="inherit" size="small" className={classes.iconClose}>
              <Icon path={mdiClipboardText}
                size={1}
                horizontal
                vertical
                rotate={180}
                color="white"/>
            </IconButton>
            <IconButton edge="start" color="inherit" size="small" className={classes.iconClose}>
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