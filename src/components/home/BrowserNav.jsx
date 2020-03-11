import React from "react";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiArrowRight, mdiReload, mdiHome, mdiMagnify, } from '@mdi/js';
import { useForceUpdate } from '../utility/Functions';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
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
    display: 'inline-block'
  },
  icon: {
    marginRight: 9,
  },
  orderBoxRoot: {
    float: 'right',
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {

      },
    },
  },
});
export default function BrowserNav() {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  const [values, setValues] = React.useState({
    url: 'https://www.rakuten.co.jp',
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const register = () => {
    window.core.system.functions['browserNav']['update'] = (...args) => {
      const url = args[0]['url'];
      
      setValues({ ...values, 'url': url});
    };
  };

  register();

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.iconRoot}>
            <IconButton edge="start" color="inherit" size="small" className={classes.icon}>
              <Icon path={mdiArrowLeft}
                size={1}
                horizontal
                vertical
                rotate={180}
                color="white"/>
            </IconButton>
            <IconButton edge="start" color="inherit" size="small" className={classes.icon}>
              <Icon path={mdiArrowRight}
                size={1}
                horizontal
                vertical
                rotate={180}
                color="white"/>
            </IconButton>
            <IconButton edge="start" color="inherit" size="small" className={classes.icon}>
              <Icon path={mdiReload}
                size={1}
                horizontal
                vertical
                rotate={180}
                color="white"/>
            </IconButton>
            <IconButton edge="start" color="inherit" size="small" className={classes.icon}>
              <Icon path={mdiHome}
                size={1}
                horizontal
                vertical
                rotate={180}
                color="white"/>
            </IconButton>
          </div>
          <div className={classes.inputBoxRoot}>
            <Icon className={classes.icon}
              path={mdiMagnify}
              size={0.8}
              horizontal
              vertical
              rotate={180}
              color="black"/>
            <Input className={classes.inputBox} value={values.url} disableUnderline={true} onChange={handleChange('url')} />
          </div>
        </form>
      </MuiThemeProvider>
    </div>
  );
}