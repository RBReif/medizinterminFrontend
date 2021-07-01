import Card from "../UI/Card";
import DynamicDropdown from "./DynamicDropdown";
import { Form } from "react-bootstrap";

const LanguageForm = (props) => {
  const languagelist = [{ displayname: "German" }, { displayname: "English" }];

  return (
    <Form>
      <div>
        <Card>
          <DynamicDropdown
            label="What Language Should The Doctor Speak?"
            items={languagelist}
          ></DynamicDropdown>
        </Card>
      </div>
    </Form>
  );
};

export default LanguageForm;
