import React from "react";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import './ExpansionOrderCommonSettings.css';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
import MaterialUIPickers from '../../common/Pickers/MaterialUIPickers';
import DiscreteSlider from '../../common/Sliders/DiscreteSlider';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiArrowRight, mdiReload, mdiHome, mdiMagnify, } from '@mdi/js';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const globalScope = {
  sliderValues: {
    value1: 10,
    value2: 10,
  }
};

export default function ExpansionOrderCommonSettings() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });

  const [value, setValue] = React.useState({
    radioOrderType: 'normal',
    radioOrderSystemType: 'rapidFire',
  });

  const sliderDefaultValues = {
    value1: 10,
    value2: 10,
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleChangeValue = name => event => {
    setValue({ ...value, [name]: event.target.value });
  };

  const valueText = (id, _value) => {
    globalScope.sliderValues[id] = _value;
  };
  
  return (
    <div>
      <DiscreteSlider id="value1" defaultValues={sliderDefaultValues} step={1} min={1} max={20} textLabel={'リトライ回数'} unitLabel={'回'}  valueText={valueText}/>
      <DiscreteSlider id="value2" defaultValues={sliderDefaultValues} step={1} min={1} max={60} textLabel={'タイムアウト'} unitLabel={'秒'} valueText={valueText}/>
      <div className="no-margin">
        <FormControlLabel control={<Checkbox value="checkedA" size="small" />} label="楽天ポイント使用" style={{fontSize: 13}} />
        <FormControlLabel control={<Checkbox value="checkedB" size="small" />} label="メールマガジン登録キャンセル" style={{fontSize: 13}} />
        <FormControlLabel control={<Checkbox value="checkedC" size="small" />} label="自動でお届け先を選択する" style={{fontSize: 13}} />
        <FormControlLabel control={<Checkbox value="checkedD" size="small" />} label="自動で支払い/配送方法他を選択する" style={{fontSize: 13}} />
        <TextField id="standard-basic" label="スタートアップテストURL" defaultValue="https://item.rakuten.co.jp" fontSize={11} />
      </div>
    </div>
  );
}