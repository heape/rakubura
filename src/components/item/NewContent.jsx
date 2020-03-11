import React from "react";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import './NewContent.css'; 
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
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

  const queue = window.core.queues[0]; // obj or undefined
  const item = queue === undefined ? null : queue.item;

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <div>
          <div style={{display: 'flex'}}> 
            <div>
              <div>注文情報</div>
              <Paper className={classes.paperOrderInfo} elevation={5}>
                <div style={{display: 'flex'}}>
                  <div>
                    <ExpansionPanel defaultExpanded={true}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>自動注文モード設定</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                          <ExpansionOrderModeSettings />
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded={true}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className={classes.heading}>自動注文共通設定</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                          <ExpansionOrderCommonSettings />
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                  <div>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>アカウント設定</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                          sit amet blandit leo lobortis eget.
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className={classes.heading}>通信設定</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                          sit amet blandit leo lobortis eget.
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </div>
              </Paper>
            </div>
            <div>
              <div>商品情報</div>
              <Paper className={classes.paperItemInfo} elevation={5}>
                <div>
                  <ItemInfo item={item}/>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    </div>
  );
}