import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";


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
/**
 * For presenting and changing rating details
 * @param {props} props
 */
function Ratings(props) {
    return (
        <Table>
            <TableBody>
                <TableRow>
                        <StyledRating
                            value={props.value}
                            onChange={(e, value) =>
                                props.onChangeOwnRating(value)
                            }
                            readOnly={props.readOnly}
                            name="audience-rating"
                        />
                </TableRow>
            </TableBody>
        </Table>
    );
}

// attributes of props and their type
Ratings.propTypes = {
    avgAudienceRating: PropTypes.number,
    editMode: PropTypes.bool,
    onChangeOwnRating: PropTypes.func,
};

export default Ratings;