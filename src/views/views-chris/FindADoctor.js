import Card from "../../components/components-chris/UI/Card";
import MultiSelect from "../../components/components-chris/forms/MultiSelect";

const FindADoctor = (props) => {
  const doctorlist = ["Something", "Another"];
  const languages = [{ title: "German" }, { title: "English" }];

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
          <MultiSelect label="Choose Language"></MultiSelect>
        </Card>
      </div>
    </div>
  );
};

export default FindADoctor;
