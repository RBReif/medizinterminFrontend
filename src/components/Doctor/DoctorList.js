import { useEffect, useState } from "react";
import DoctorService from "../../services/DoctorService";
import Doctor from "./Doctor";
import DynamicCard from "../UI/DynamicCard";

const DoctorList = (props) => {
  const [doctor, setDoctor] = useState("");

  useEffect(async () => {
    const getDoctor = async () => {
      const doctor = await DoctorService.getDoctor(props.result[0]);
      setDoctor(doctor);
    };
    getDoctor();
  }, []);

  return (
    <DynamicCard
      variant="outlined"
      content={
        <div>
          {doctor ? (
            <Doctor
              patientAddress={props.patientAddress}
              id={doctor._id}
              key={doctor._id}
              doctor={doctor}
              appointments={props.result[1]}
            ></Doctor>
          ) : (
            ""
          )}
        </div>
      }
    ></DynamicCard>
  );
};

export default DoctorList;
