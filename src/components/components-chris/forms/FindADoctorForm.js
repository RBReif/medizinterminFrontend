import Card from "../UI/Card";
import DynamicDropdown from "./DynamicDropdown";
import { Form } from "react-bootstrap";

const FindADoctorForm = (props) => {
  const doctorlist = [
    { id: "1", displayname: "Dentist" },
    { id: "2", displayname: "Cardiologist" },
    { id: "2", displayname: "Something" },
    { id: "2", displayname: "More" },
  ];

  return (
    <Form>
      <div>
        <Card>
          <DynamicDropdown
            label="What Doctor Do You Need?"
            items={doctorlist}
            placeholder="Area of Expertise"
          ></DynamicDropdown>
        </Card>
      </div>
    </Form>
  );
};

export default FindADoctorForm;
