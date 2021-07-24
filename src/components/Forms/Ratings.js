import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const StyledRating = withStyles({
  iconFilled: {
    //   color: '#6D9A6F',
    color: "#D7C49EFF",
  },
  iconHover: {
    //   color: '#6D9A6F',
    color: "#AC9D7E",
  },
})(Rating);

function Ratings(props) {
  const [value, setValue] = React.useState(props.avgAudienceRating);
  let rating = Math.round(props.avgAudienceRating * 10)/10;

  const changeHandler = (e, value) => {
      setValue(value);
      props.onChangeOwnRating(value);
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <StyledRating
            key={props.id}
            id={props.id}
            value={
              props.readOnly
                ? props?.avgAudienceRating
                : props?.avgAudienceRating
            }
            onChange={
              props.readOnly
                ? ""
                : changeHandler
            }
            readOnly={props.readOnly}
            precision={props.readOnly ? 0.5 : 1}
            size={props.readOnly ? "small" : "medium"}
          />
          {props.readOnly ? (
            <>
              (
              {props?.avgAudienceRating ? rating : 0}/5)
            </>
          ) : (
            ""
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
}

// attributes of props and their type
Ratings.propTypes = {
  avgAudienceRating: PropTypes.number,
  // editMode: PropTypes.bool,
  onChangeOwnRating: PropTypes.func,
};

export default Ratings;
