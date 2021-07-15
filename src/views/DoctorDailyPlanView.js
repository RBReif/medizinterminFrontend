import {Form, Container, Row, Col} from "react-bootstrap";
import NewsList from "../components/NewsList";
import CheckupList from "../components/CheckupList";
import AppointmentCard from "../components/AppointmentCard";
import Page from "../components/Page";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../components/UI/Theme";
import DynamicCard from "../components/UI/DynamicCard";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        maxHeight: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
    },
    media: {
        paddingTop: "10.25%", // 16:9
        paddingBottom: "5%",
    },
    colorOne: {
        backgroundColor: "#E3CEA3",
    },
    colorTwo: {
        backgroundColor: "#BF866F",
    },
}));

const DoctorDailyPlanView = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={Theme}>
            <Page>
                <Container fluid>
                    <Row>
                        <Col lg={60}>
                            <br/>
                            <h4>Agenda for Today</h4>
                            <DynamicCard
                                variant="outlined"
                                content={
                                    <div>
                                    <h5>Thursday, July 15th 2021</h5>
                                        <DynamicCard style={{backgroundColor: "#E3CEA3"}}
                                            variant="body2"
                                            content={
                                                <div>
                                                    <Row>
                                                        <Col sm={10}>Full Body checkup</Col>
                                                        <Col>
                                                            <Row>
                                                                11:00
                                                            </Row>
                                                            <Row>
                                                                11:30
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            }>
                                        </DynamicCard>
                                        <DynamicCard
                                            variant="body2"
                                            className={classes.colorTwo}
                                            content={
                                                <div>
                                                    <Row>
                                                        <Col sm={10}>Heart checkup</Col>
                                                        <Col>
                                                            <Row>
                                                                11:00
                                                            </Row>
                                                            <Row>
                                                                11:30
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            }>
                                        </DynamicCard>
                                        <DynamicCard
                                            variant="body2"
                                            className={classes.colorTwo}
                                            content={
                                                <div>
                                                    <Row>
                                                        <Col sm={10}>Hand Surgery</Col>
                                                        <Col>
                                                            <Row>
                                                                13:00
                                                            </Row>
                                                            <Row>
                                                                16:30
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            }>
                                        </DynamicCard>
                                        <DynamicCard
                                            variant="body2"
                                            className={classes.colorTwo}
                                            content={
                                                <div>
                                                    <Row>
                                                        <Col sm={10}>Check documents</Col>
                                                        <Col>
                                                            <Row>
                                                                16:30
                                                            </Row>
                                                            <Row>
                                                                17:00
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            }>
                                        </DynamicCard>
                                    </div>
                                }
                                >
                            </DynamicCard>
                        </Col>
                    </Row>
                </Container>
            </Page>
        </ThemeProvider>

    );
};
export default DoctorDailyPlanView;