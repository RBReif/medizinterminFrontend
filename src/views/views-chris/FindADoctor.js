import Card from "../../components/components-chris/UI/Card";
import MultiSelect from "../../components/components-chris/forms/MultiSelect";

const FindADoctor = (props) => {
  const doctorlist = [{id: "1", displayname: "Something"}, {id: "2", displayname: "Another"}];
  const languages = [{ displayname: "German" }, { displayname: "English" }];

  return (
    <div>
      <div>
        <Card>
          <MultiSelect
            label="Choose a Field of Expertise"
            items={doctorlist}
          ></MultiSelect>
        </Card>
      </div>
      <div>
        <Card>
          <MultiSelect label="Choose Language" items={languages}>
          </MultiSelect>
        </Card>
      </div>
    </div>
  );
};

export default FindADoctor;
