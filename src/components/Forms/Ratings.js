import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import PropTypes from "prop-types";


/**
 * For presenting and changing rating details
 * @param {props} props
 */
function Ratings(props) {
    return (
        <Table>
            <TableBody>
                <TableRow>
                        <Rating
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
    criticsRating: PropTypes.number,
    avgAudienceRating: PropTypes.number,
    editMode: PropTypes.bool,
    onChangeCriticsRating: PropTypes.func,
    onChangeOwnRating: PropTypes.func,
};

export default Ratings;