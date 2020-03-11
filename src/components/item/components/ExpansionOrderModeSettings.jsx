import React from "react";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
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
    value1: 4,
    value2: 100,
    value3: 0,
    value4: 0,
    value5: 1,
  }
};

export default function ExpansionOrderModeSettings() {
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

  const sliderDefaultValues = {
    value1: 4,
    value2: 100,
    value3: 0,
    value4: 0,
    value5: 1,
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
      <FormControlLabel control={<Checkbox value="checkedA" size="small" />} label="シミュレーションモード  (注文を確定しない)" style={{fontSize: 13}} />
                            
      <RadioGroup aria-label="オーダータイプ" name="orderType" value={value.radioOrderType} onChange={handleChangeValue('radioOrderType')} style={{display: 'flex', flexDirection: 'unset'}}>
        <FormControlLabel value="normal" control={<GreenRadio />} label="時間指定注文" />
        <FormControlLabel value="restock" control={<GreenRadio />} label="在庫監視注文" />
      </RadioGroup>
      <MaterialUIPickers />
      <FormControlLabel control={<Checkbox value="checkedB" size="small" />} label="自動時刻補正" style={{fontSize: 13}} />
      <Box fontSize={11}>オーダーシステムのタイプ</Box>
      <RadioGroup aria-label="オーダーシステムのタイプ" name="orderSytemType" value={value.radioOrderSystemType} onChange={handleChangeValue('radioOrderSystemType')} style={{display: 'flex', flexDirection: 'unset'}}>
        <FormControlLabel value="rapidFire" control={<GreenRadio />} label="RapidFire (直列)" />
        <FormControlLabel value="volleyFire" control={<GreenRadio />} label="VolleyFire (並列)" />
      </RadioGroup>
      <DiscreteSlider id="value1" defaultValues={sliderDefaultValues} step={1} min={1} max={12} textLabel={'装填数'} unitLabel={''}  valueText={valueText}/>
      <DiscreteSlider id="value2" defaultValues={sliderDefaultValues} step={1} min={0} max={1000} textLabel={'VolleyFire 時間差'} unitLabel={'ミリ秒'} valueText={valueText}/>
      <DiscreteSlider id="value3" defaultValues={sliderDefaultValues} step={1} min={-500} max={500} textLabel={'注文開始ミリ秒調整'} unitLabel={'ミリ秒'} valueText={valueText}/>
      <DiscreteSlider id="value4" defaultValues={sliderDefaultValues} step={1} min={0} max={1000} textLabel={'注文確定ウェイトタイム'} unitLabel={'ミリ秒'} valueText={valueText}/>
      <DiscreteSlider id="value5" defaultValues={sliderDefaultValues} step={1} min={1} max={10} textLabel={'注文個数'} unitLabel={'個'} valueText={valueText}/>
    </div>
  );
}