import { useEffect, useState } from "react";
import DoctorService from "../../services/DoctorService";
import Doctor from "./Doctor";
import DynamicCard from "../UI/DynamicCard";

const DoctorList = (props) => {
  const [doctor, setDoctor] = useState("");

  console.log("props.result.doctor ", props.result.doctor);

  useEffect(async () => {
    const getDoctor = async () => {
      const doctor = await DoctorService.getDoctor(props.result.doctor);
      // console.log("RECEIVED DOCTOR", doctor);
      console.log("RECEIVED DOCTOR", doctor);
      setDoctor(doctor);
    };
    getDoctor();
  }, []);

  console.log("RECEIVED RESULT PROPS props.result", props.result);

  return (
    <DynamicCard
      variant="outlined"
      content={
        <div>
          {doctor ? <Doctor doctor={doctor} appointment={props.result}></Doctor> : ""}
        </div>
      }
    ></DynamicCard>
  );
};

export default DoctorList;
