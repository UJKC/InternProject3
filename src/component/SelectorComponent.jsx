import { useEffect, useState } from "react";
import App from "./dropdownController";

const SelectorComponent = ({ options, utility }) => {

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
    }
  }, [input1OptionObject]);

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
      <hr />
      {input1OptionObject && (
        <>
          {input1OptionObject.Option && <div>Option1: {input1OptionObject.Option}</div>}
          {input1OptionObject.category && <div>Category1: {input1OptionObject.category}</div>}
          {input1OptionObject.category && <div>Id1: {input1OptionObject.id}</div>}
        </>
      )}
      {input2OptionObject && (
        <>
          {input2OptionObject.Option && <div>Option2: {input2OptionObject.Option}</div>}
          {input2OptionObject.category && <div>Category2: {input2OptionObject.category}</div>}
          {input2OptionObject.category && <div>id2: {input2OptionObject.id}</div>}
        </>
      )}
      {input1UtilityOptionObject && (
        <>
          {input1UtilityOptionObject.Option && <div>Utility Option1: {input1UtilityOptionObject.Option}</div>}
          {input1UtilityOptionObject.category && <div>Utility Category1: {input1UtilityOptionObject.category}</div>}
          {input1UtilityOptionObject.category && <div>Utility Id1: {input1UtilityOptionObject.id}</div>}
        </>
      )}
      {input2UtilityOptionObject && (
        <>
          {input2UtilityOptionObject.Option && <div>Utility Option2: {input2UtilityOptionObject.Option}</div>}
          {input2UtilityOptionObject.category && <div>Utility Category2: {input2UtilityOptionObject.category}</div>}
          {input2UtilityOptionObject.category && <div>Utility Category2: {input2UtilityOptionObject.id}</div>}
        </>
      )}
      <hr />
      <button onClick={() => {
        setInput1OptionObject(undefined);
        setInput2OptionObject(undefined);
        setInput1UtilityOptionObject(undefined);
        setInput2UtilityOptionObject(undefined);
        setSecondRequired(false);
        setSecondCategory([]);
      }}>reset</button>
    </>
  );
};

export default SelectorComponent;
