import React from 'react';
import Calendar from "react-awesome-calendar";

//What this component is about: This component is the calendar view which is used in the doctors dashboard
//It visualizes a calendar and takes a json from the respective doctor as an input
//Please check out NewCalendarEvent and CalendarEventForm for more information
//The calendar is used in the Doctors Dashboard view

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
      //  console.log("sgisghiehg" , this.props.events)
        return (
            <Calendar
                ref={this.calendar}
                events={this.props.events}
            />
        );
    }
}