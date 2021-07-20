import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DynamicCard from "./DynamicCard";
import {Col, Row} from "react-bootstrap";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
});

export default function AppointmentDetailCard(props) {
    const classes = useStyles();

    return (
        <div>
            <DynamicCard
                variant="outline"
                content={
                    <div>
                        <h5>Thursday, July 15th 2021</h5>
                        {props.items.map((item) => {
                            return (
                                <DynamicCard
                                    variant="body2"
                                    content={
                                        <div>
                                            <Row>
                                                <Col sm={10}>{item.purpose}</Col>
                                                <Col>
                                                    <Row>
                                                        {item.start_time}
                                                    </Row>
                                                    <Row>
                                                        {item.end_time}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    }>
                                </DynamicCard>
                            );
                        })
                        }
                    </div>
                }
            >
            </DynamicCard>
        </div>
    )
}