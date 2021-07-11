import React from 'react';
import Calendar from "react-awesome-calendar";

export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.calendar = React.createRef();
    }

    componentDidMount() {
        const details = this.calendar.current.getDetails();
        console.log(details);
        /* result
            {
                mode: 'monthlyMode',
                year: 2019,
                month: 0,
                day: 1
            }
        */
        // call endpoint to retrieve events
    }

    render() {
        return (
            <Calendar
                ref={this.calendar}
                events={this.props.events}
            />
        );
    }
}