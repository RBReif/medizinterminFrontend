import DynamicSwitch from "./DynamicSwitch";

const DisabilitySwitches = (props) => {
  return (
    <div>
      <DynamicSwitch id="custom-switch-1" label="Wheel chair availability needed" />
      <DynamicSwitch id="custom-switch-2" label="Elevator needed" />
      <DynamicSwitch id="custom-switch-3" label="Car parking nearby" />
      <DynamicSwitch id="custom-switch-4" label="Public transport station nearby" />
    </div>
  );
};

export default DisabilitySwitches;
