import { useEffect, useState } from "react";
import DoctorService from "../../services/DoctorService";

const DoctorList = (props) => {
  const [doctor, setDoctor] = useState("");
  const getDoctor = async () => {
    const doctor = await DoctorService.getDoctor(props.result.doctor);
    // console.log("RECEIVED DOCTOR", doctor);
    console.log("RECEIVED DOCTOR", doctor);
    setDoctor(doctor);
  };

  console.log(doctor);

  return <div>{console.log("DOCTORLIST", doctor)}</div>;
};

export default DoctorList;
