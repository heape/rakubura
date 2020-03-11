import React from "react";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import './NewContent.css'; 
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import MaterialUIPickers from '../common/Pickers/MaterialUIPickers';
import DiscreteSlider from '../common/Sliders/DiscreteSlider';
import ExpansionOrderModeSettings from './components/ExpansionOrderModeSettings';
import ExpansionOrderCommonSettings from './components/ExpansionOrderCommonSettings';
import ItemInfo from './components/ItemInfo';
import Icon from '@mdi/react'; 
import { mdiArrowLeft, mdiArrowRight, mdiReload, mdiHome, mdiMagnify, } from '@mdi/js';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% - 240px)',
  },
  heading: {
    fontFamily: '"游ゴシック","YuGothic","Yu Gothic","游ゴシック体"; font-weight: 600',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
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
  paperOrderInfo: {
    width: '45vw',
    marginRight: 8,
  },
  paperItemInfo: {
    width: '32vw',
    minWidth: 396
  },
  divItemLogRoot: {
    padding: 3,
  },
  boxItemLog: {
    width: '100%',
    height: '100%',
    padding: 4,
    backgroundColor: 'rgba(30, 30, 30, 1)',
  },
  boxItemInfo: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  labelItemInfo: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
    display: 'block',
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {

      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 11
      }
    },
    MuiTypography: {
      body1: {

      }
    },
    PrivateSwitchBase: {
      root: {
        paddingRight: '6px'
      }
    }
  },
});

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);


const Line = (props) => (
  <div style={{ lineHeight: '1'}}>
    <span style={{color: props.color, fontSize: props.fontSize}}>
      {props.text}
    </span>
  </div>
);

const Link = (props) => (
  <div style={{ lineHeight: '1'}}>
    <a href={props.href} style={{color: props.color, fontSize: props.fontSize, textDecoration: 'underline'}}>
      {props.text}
    </a>
  </div>
);


export default function NewContent() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const [value, setValue] = React.useState({
    radioOrderType: 'normal',
    radioOrderSystemType: 'rapidFire',
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleChangeValue = name => event => {
    setValue({ ...value, [name]: event.target.value });
  };


  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.divItemLogRoot}>
          <Box className={classes.boxItemInfo}>
          <label className={classes.labelItemInfo}>{'[指定]2019/09/14 12:00 - BE@RBRICK JERRY 1000％《2020年8月発売・発送予定》：ＰＲＯＪＥＣＴ１／６'}</label>

          </Box>
          <Box className={classes.boxItemLog}>
            <Link text="[リンク] https://item.rakuten.co.jp/project1-6/4530956586687/" color='rgba(219, 219, 219, 1)' fontSize={12} href="https://abc.xyz" />
            <Line text="20190 43859797 -> オーダー登録" color='white' fontSize={11} />
          </Box>
        </div>
      </MuiThemeProvider>
    </div>
  );
}