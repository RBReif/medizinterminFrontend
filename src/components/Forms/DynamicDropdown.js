import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const DynamicDropdown = (props) => {
  const classes = useStyles();
  const [val, setVal] = React.useState(props.displayname);

  // const handleChange = (event) => {
  //   console.log("handleChange DynamicDropdown :" , event.target.value);
  //   setVal(event.target.value);
  //   // props.onClick(event.target.value);
  // };


  return (
    <FormControl className={classes.formControl}>
      <p>{props.label}</p>
       <Select
        key={props.items.id}
        defaultValue={props.defaultValue}
        labelId="demo-simple-select-label"
        id={props.items.id}
        value={val}
        onClick={props.onChange}
        >
          {props.items.map((item) => {
            return <MenuItem key={item.id} value={item.displayname}>{item.displayname}</MenuItem>;
          })}
        </Select>
    </FormControl>
  );
};

export default DynamicDropdown;
