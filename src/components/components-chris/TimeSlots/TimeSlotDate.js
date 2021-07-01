const TimeSlotDate = (props) => {  
    const month = props.date.toLocaleString('en-US', {month: 'long'});
    const day = props.date.toLocaleString('en-US', { day: '2-digit'});
    const year = props.date.getFullYear();
  
    return (
      <div>
        <div>{day} {month} {year}</div>
      </div>
    );
  };
  
  export default TimeSlotDate;