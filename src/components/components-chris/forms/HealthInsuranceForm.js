import Card from "../UI/Card";
import DynamicDropdown from "./DynamicDropdown";
import { Form } from "react-bootstrap";

const HealthInsuranceForm = (props) => {
  const healthinsurancelist = [{ displayname: "Public" }, { displayname: "Private" }];

  return (
    <Form>
      <div>
        <Card>
          <DynamicDropdown
            label="Please Choose Your Health Insurance"
            items={healthinsurancelist}
          ></DynamicDropdown>
        </Card>
      </div>
    </Form>
  );
};

export default HealthInsuranceForm;
