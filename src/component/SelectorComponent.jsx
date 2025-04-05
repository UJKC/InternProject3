import { useEffect, useState } from "react";
import App from "./dropdownController";

const SelectorComponent = ({ options, utility, value1, value1Utility, value2, value2Utility }) => {

  console.log("Here from SelectorComponent by SDD. Cloning x2 Objects and buttons")
  let [input1OptionObject, setInput1OptionObject] = useState(undefined)
  let [input2OptionObject, setInput2OptionObject] = useState(undefined)
  let [input1UtilityOptionObject, setInput1UtilityOptionObject] = useState(undefined)
  let [input2UtilityOptionObject, setInput2UtilityOptionObject] = useState(undefined)
  let [disableSecond, setDisableSecond] = useState(true)
  let [secondRequired, setSecondRequired] = useState(false)
  let [secondCategory, setSecondCategory] = useState()

  useEffect(() => setDisableSecond(true), [])

  useEffect(() => {
    if (input1OptionObject && Object.keys(input1OptionObject).length > 0) {
      setDisableSecond(false); // Enable second App if input1OptionObject is defined

      // Case 1: 'host' (Second Input is Required)
      if (input1OptionObject.category === 'host') {
        setSecondRequired(true);
        setSecondCategory(['host', 'geolocation']); // Multiple categories
      }
      // Case 2: 'hostGroupName' (Second Input is Optional)
      else if (input1OptionObject.category === 'hostGroupName') {
        setSecondRequired(false);
        setSecondCategory(['host', 'hostGroupName', 'geolocation']);
      }
      // Case 3: 'geolocation' (Second Input is Optional)
      else if (input1OptionObject.category === 'geolocation') {
        setSecondRequired(false);
        setSecondCategory(['host', 'hostGroupName']);
      }
      // Default Case
      else {
        setSecondRequired(false);
        setSecondCategory([input1OptionObject.category]); // Single category
      }
    } else {
      setDisableSecond(true); // Disable second App if input1OptionObject is undefined
      setSecondCategory([]);
      setSecondRequired(false);
      setInput1UtilityOptionObject(undefined)
      setInput2OptionObject(undefined)
      setInput2UtilityOptionObject(undefined)
    }
  }, [input1OptionObject]);

  useEffect(() => {

      value1(input1OptionObject);
      value2(input2OptionObject);
      value1Utility(input1UtilityOptionObject);
      value2Utility(input2UtilityOptionObject);
  }, [input1OptionObject, input2OptionObject, input1UtilityOptionObject, input2UtilityOptionObject]);

  const dataToSend = Array.isArray(secondCategory)
    ? secondCategory.reduce((acc, key) => {
      if (options[key]) {
        acc[key] = options[key];
      }
      return acc;
    }, {})
    : secondCategory
      ? { [secondCategory]: options[secondCategory] }
      : options;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', zIndex: '0'}}>
        <App data={options} setterInput={setInput1OptionObject} disableSecond={false} letItReset={input1OptionObject} secondRequired={true} utility={utility} utilityFunction={setInput1UtilityOptionObject} name={'first'}/>
        <App
          data={dataToSend}
          setterInput={setInput2OptionObject}
          disableSecond={disableSecond ?? true}
          letItReset={input1OptionObject}
          secondRequired={secondRequired}
          utility={utility}
          utilityFunction={setInput2UtilityOptionObject}
          name={'second'}
        />
      </div>
    </>
  );
};

export default SelectorComponent;
