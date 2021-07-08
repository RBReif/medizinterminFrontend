import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value} km`;
}

const LocationSlider = () => {
    const classes = useStyles();

    const marks = [
        {
          value: 0,
          label: '',
        },
        {
          value: 2,
          label: '2km',
        },
        {
          value: 5,
          label: '5km',
        },
        {
          value: 10,
          label: '10km',
        },
        {
            value: 15,
            label: '15km',
          },
          {
            value: 20,
            label: '20km',
          },
      ];
    return (
        <div className={classes.root}>
          <Typography id="discrete-slider-restricted" gutterBottom>
            Range
          </Typography>
          <Slider
            defaultValue={2}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-restrict"
            valueLabelDisplay="auto"
            // step={1}
            step={null}
            marks={marks}
            min={0}
            max={20}
          />
          </div>
          );
}

export default LocationSlider;


