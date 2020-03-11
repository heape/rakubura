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
import { mdiCurrencyJpy, mdiClock, } from '@mdi/js';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  imageBoxRoot: {
    border: 'solid 1px #dcd5d5'
  },
  margin: {
    height: theme.spacing(3),
  },
  marginTop: {
    marginTop: 10
  },
  boxPadding: {
    padding: '24px 32px'
  },
  fullwidthTextField: {
    width: '100%'
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


export default function ItemInfo(props) {
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
  
  const item = {
    url: props.item !== null? props.item.url : 'https://item.rakuten.co.jp/arimas/9419838/',
    shopName: props.item !== null? props.item.shopName : '工具ワールド　ＡＲＩＭＡＳ',
    name: props.item !== null? props.item.name : 'クリスタルガイザー 500ml 24本送料無料 CRYSTAL GEYSER 500ml×24本 飲料水 ミネラルウォーター 500ml 送料無料 24本 水 お水 天然水 水 24本入り ケースセット【並行輸入品】【D】',
    imageUrl: props.item !== null? props.item.imageUrl : 'https://shop.r10s.jp/arimas/cabinet/0826/9419838.jpg',
    price: props.item !== null? props.item.price : 1780,
    salesDateTime: props.item !== null? props.item.salesDateTime : '販売中'
  };
  
  return (
    <div>
      <Box className={classes.boxPadding} >
        <Box>
          <TextField className={classes.fullwidthTextField} label="商品URL" defaultValue={item.url} fontSize={11} />
          <div className={classes.marginTop}></div>
          <TextField className={classes.fullwidthTextField} label="ショップ名" defaultValue={item.shopName} fontSize={11} />
          <div className={classes.marginTop}></div>
          <TextField className={classes.fullwidthTextField} label="商品名" defaultValue={item.name} fontSize={11} />
        </Box>
        <div className={classes.marginTop}></div>
        <Box className={classes.imageBoxRoot + ' item-img-fixed-container'}>
          <img className="item-img-fixed" src={item.imageUrl} />
        </Box>

        <div>
          <Icon 
            path={mdiCurrencyJpy}
            size={0.6}
            horizontal
            vertical
            rotate={180}
            color="#777"
            style={{marginRight: 4}}
          />
          <label className="yugFont" style={{color: '#999', fontSize: 12, marginBottom: 0}}>価格</label>
          <div style={{marginLeft: 8}}>
            <label className="yugFont" style={{color: '#222', fontSize: 14, fontWeight: 400, marginBottom: 0}}>{item.price.toLocaleString()}</label>
          </div>
        </div>
        <div style={{marginTop: 16}}>
          <Icon 
            path={mdiClock}
            size={0.6}
            horizontal
            vertical
            rotate={180}
            color="#777"
            style={{marginRight: 4}}
          />
          <label className="yugFont" style={{color: '#999', fontSize: 12, marginBottom: 0}}>販売開始日時</label>
          <div style={{marginLeft: 8}}>
            <label className="yugFont" style={{color: '#222', fontSize: 14, fontWeight: 400, marginBottom: 0}}>{item.salesDateTime}</label>
          </div>
        </div>
      </Box>
    </div>
  );
}