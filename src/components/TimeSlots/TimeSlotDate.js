const TimeSlotDate = (props) => {
  const startmonth = props.startdate.toLocaleString("en-US", { month: "long" });
  const startday = props.startdate.toLocaleString("en-US", { day: "2-digit" });
  const startyear = props.startdate.getFullYear();
  const starthour = props.startdate.getHours();
  const startminute = props.startdate.getMinutes();
  const endmonth = props.enddate.toLocaleString("en-US", { month: "long" });
  const endday = props.enddate.toLocaleString("en-US", { day: "2-digit" });
  const endyear = props.enddate.getFullYear();
  const endhour = props.enddate.getHours();
  const endminute = props.enddate.getMinutes();



  return (
    <div>
        <div>Start: {startday} {startmonth} {startyear}, {starthour}:{startminute}</div>
        <div>End: {endday} {endmonth} {endyear}, {endhour}:{endminute}</div>
    </div>
  );
};

export default TimeSlotDate;
