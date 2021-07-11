import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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


const MultiSelectDropdown = (props) => {
    const classes = useStyles(props.id);
    let [values, setValues] = React.useState([]);

    const handleChange = (event) => {
        setValues(event.target.value);
    };
    // const handleChangeMultiple = (event) => {
    //     setValues = (Array.isArray(event)? event.map(x=>x.label): []);
    // };


    return (
        <FormControl className={classes.formControl}>
            <p>{props.label}</p>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values}
                onChange={handleChange}
                multiple
            >
                {props.items.map((item) => {
                    return <MenuItem value={item.displayname}>{item.displayname}</MenuItem>;
                })}
            </Select>
        </FormControl>
    );
};

export default MultiSelectDropdown;












// import Select from 'react-select'
// import React, {setState} from 'react'
// import Select2 from '@material-ui/core/Select'
//
// function MultiSelectDropdown() {
//     let LanguageList = [
//         {
//             value: 1,
//             label: 'German'
//         },
//         {
//             value: 2,
//             label: 'English'
//         },
//         {
//             value: 3,
//             label: 'Russian'
//         },
//         {
//             value: 4,
//             label: 'Turkish'
//         }
//     ];
//     return (
//         <div>
//             <Select isMulti options={LanguageList}></Select>
//         </div>
//     )
// }
//
// export default MultiSelectDropdown;