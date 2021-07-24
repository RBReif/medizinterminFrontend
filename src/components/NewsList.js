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
    console.log("NEWSLIST ",props.mostRecent)
    return (
        <ListGroup>
            <ListGroup.Item> <EmojiObjectsIcon /> You have {props.outstanding} upcoming appointment(s)</ListGroup.Item>
            { props.mostRecent===null?(
                <ListGroup.Item><StarIcon /> We have no previous appointments stored from you.</ListGroup.Item>
            ):(
            <ListGroup.Item><StarIcon /> How was your most recent appointment (with {props.mostRecent.doctor_name} {props.mostRecent.doctor_last_name})?</ListGroup.Item>)}
            <ListGroup.Item><AssignmentTurnedInIcon /> Update your Checkup Schedule</ListGroup.Item>
        </ListGroup>
    )
};

export default NewsList;
