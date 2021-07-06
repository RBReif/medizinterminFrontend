import ListGroup from 'react-bootstrap/ListGroup'
import React from "react";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import StarIcon from '@material-ui/icons/Star';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


// const UnorderedList = (props) => {
//     return(['You have one upcoming task this week', 'How was the appointment with Dr. Schulz?', 'Another task in here'].map((breakpoint, idx) => (
//         <ListGroup horizontal={breakpoint} className="my-2" key={idx}>
//             <ListGroup.Item>{breakpoint}</ListGroup.Item>
//         </ListGroup>
//     )));
// };

const NewsList = (props) => {
    return (
        <ListGroup>
            <ListGroup.Item> <EmojiObjectsIcon /> You have one upcoming task this week</ListGroup.Item>
            <ListGroup.Item><StarIcon /> How was the appointment with Dr. Schulz?</ListGroup.Item>
            <ListGroup.Item><AssignmentTurnedInIcon /> Update your Checkup Schedule</ListGroup.Item>
        </ListGroup>
    )
};

export default NewsList;
