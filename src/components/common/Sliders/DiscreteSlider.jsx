import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(props.defaultValue);
  function valueText(_value) {
    setValue(_value);
    props.valueText(props.id, _value);
    return _value;
  }
  
  return (
    <>
<Box fontSize={11}>{props.textLabel}<span style={{marginLeft: 10}}>{value}</span>{props.unitLabel}</Box>
      <Slider
        defaultValue={props.defaultValues[props.id]}
        getAriaValueText={valueText}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={props.step}
        min={props.min}
        max={props.max}
      />
    </>
  );
}