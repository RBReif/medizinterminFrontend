const TimeSlotDate = (props) => {
    const month = props.date.toLocaleString('en-US', { month: 'long' });
    const day = props.date.toLocaleString('en-US', { day: '2-digit' });
    const year = props.date.getFullYear();
  
    return (
      <div className='expense-date'>
        <div>{month}</div>
        <div>{year}</div>
        <div>{day}</div>
      </div>
    );
  };
  
  export default TimeSlotDate;