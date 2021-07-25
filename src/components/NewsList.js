import ListGroup from 'react-bootstrap/ListGroup'
import {Container, Col, Row} from "react-bootstrap";
import React from "react";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import StarIcon from '@material-ui/icons/Star';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const onClickTravel = () => {
    window.open("https://www.who.int/travel-advice/vaccines", "_blank");
};
const NewsList = (props) => {
    console.log("NEWSLIST ", props.mostRecent)
    return (
        <ListGroup>
            <ListGroup.Item> <Row><Col sm={1}><EmojiObjectsIcon/> </Col>
                <Col>You have {props.outstanding} upcoming appointment(s)</Col>
            </Row>
            </ListGroup.Item>
            {props.mostRecent === null ? (
                <ListGroup.Item> <Row><Col sm={1}><EmojiObjectsIcon/> </Col>
                    <Col>We have no previous appointments stored from you.</Col>
                </Row>
                </ListGroup.Item>
            ) : (
                <ListGroup.Item>
                    <Row><Col sm={1}><StarIcon/> </Col>
                        <Col>How was your most recent appointment
                            (with {props.mostRecent.doctor_name} {props.mostRecent.doctor_last_name})?</Col>
                    </Row>
                </ListGroup.Item>)}
            <ListGroup.Item action onClick={onClickTravel}>
                <Row><Col sm={1}><FlightTakeoffIcon/> </Col>
                    <Col>Are you planning to travel? Click here to check out WHO's newest vaccination advices</Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    )
};

export default NewsList;
