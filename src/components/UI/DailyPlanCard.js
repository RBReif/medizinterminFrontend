import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Col, Row} from "react-bootstrap";
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: 75,
        paddingLeft: 5,
        paddingRight: 5
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

export default function DailyPlanCard(props) {
    const classes = useStyles();
    const [color, changeColor] = useState();
    const clickHandler = () => (
        props.onClick(props.item.id)
        //console.log(props.item.id)
    )
    return (
    <Card onClick={clickHandler} >
        <CardActionArea className={classes.root} style={{backgroundColor: props.color}}>
            <Typography variant="body2" component="p">
            <div>
                <Row>
                    <Col sm={10}>{props.item.purpose}</Col>
                    <Col>
                        <Row>
                            {props.item.start_time}
                        </Row>
                        <Row>
                            {props.item.end_time}
                        </Row>
                    </Col>
                </Row>
            </div>
            </Typography>
        </CardActionArea>
    </Card>
    );
}