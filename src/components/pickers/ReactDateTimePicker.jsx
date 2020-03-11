import React from 'react';
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// @material-ui/icons
// core components

const styles = {
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  },
};

class DateTimePicker extends React.Component{
  render(){
    const { classes } = this.props;
    return (
      <div className="mx-auto" style={{ width: 200, textAlign: 'center' }}>
        { /*
        <InputLabel className={classes.label}>
          Datetime Picker
        </InputLabel>
        <br />
        */ }
        <FormControl fullWidth>
          <Datetime
            defaultValue={this.props.values.date}
            inputProps={{ placeholder: "Select Date" }}
            onChange={ this.props.handleChangedDate.bind(this.value) }
            className="text-center"
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(DateTimePicker);