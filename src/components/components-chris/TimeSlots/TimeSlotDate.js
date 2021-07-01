const TimeSlotDate = (props) => {
    const month = props.item.date.toLocaleString('en-US', { month: 'long' });
    const day = props.item.date.toLocaleString('en-US', { day: '2-digit' });
    const year = props.item.date.getFullYear();
  
    return (
      <div>
        <div>{month}</div>
        <div>{year}</div>
        <div>{day}</div>
      </div>
    );
  };
  
  export default TimeSlotDate;