import Dupli from './component/SDD';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [cacheData, setCacheData] = useState(null);
  const [_, setVersion] = useState();
  let [input1OptionObject, setInput1OptionObject] = useState(undefined)
  let [input2OptionObject, setInput2OptionObject] = useState(undefined)
  let [input1UtilityOptionObject, setInput1UtilityOptionObject] = useState(undefined)
  let [input2UtilityOptionObject, setInput2UtilityOptionObject] = useState(undefined)

  useEffect(() => {
    // Get the cache data from localStorage and set it in state
    const storedCacheData = localStorage.getItem('cacheData');
    if (storedCacheData) {
      setCacheData(JSON.parse(storedCacheData));
    }
    else {
      console.log("Fetching from net")
      fetchCacheData()
      window.location.reload()
    }
    
  }, []); // Empty dependency array to run this only once when the component mounts

  const fetchCacheData = async () => {
    try {
      const response = await fetch('http://localhost:5000/Cache');
      const data = await response.json();
      const newVersion = data.Version[0];

      if (!localStorage.getItem('version') || !localStorage.getItem('cacheData')) {
        localStorage.setItem('version', newVersion);
        localStorage.setItem('cacheData', JSON.stringify(data));
        setVersion(newVersion);
      }
    } catch (error) {
      console.error('Error fetching cache data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Cache Sync App</h1>

      {/* Only render Dupli if cacheData exists */}
      {cacheData ? <Dupli cacheData={cacheData.Data} value1={setInput1OptionObject} value1Utility={setInput1UtilityOptionObject} value2={setInput2OptionObject} value2Utility={setInput2UtilityOptionObject}/> : <p>Loading data...</p>}
      <hr />
      {input1OptionObject && (
        <>
          {input1OptionObject.Option && <div>Option1: {input1OptionObject.Option}</div>}
          {input1OptionObject.category && <div>Category1: {input1OptionObject.category}</div>}
          {input1OptionObject.category && <div>Id1: {input1OptionObject.id}</div>}
        </>
      )}
      {input2OptionObject && input1OptionObject && (
        <>
          {input2OptionObject.Option && <div>Option2: {input2OptionObject.Option}</div>}
          {input2OptionObject.category && <div>Category2: {input2OptionObject.category}</div>}
          {input2OptionObject.category && <div>id2: {input2OptionObject.id}</div>}
        </>
      )}
      {input1UtilityOptionObject && input1OptionObject && (
        <>
          {input1UtilityOptionObject.Option && <div>Utility Option1: {input1UtilityOptionObject.Option}</div>}
          {input1UtilityOptionObject.category && <div>Utility Category1: {input1UtilityOptionObject.category}</div>}
          {input1UtilityOptionObject.category && <div>Utility Id1: {input1UtilityOptionObject.id}</div>}
        </>
      )}
      {input2UtilityOptionObject && input2OptionObject && input1OptionObject &&(
        <>
          {input2UtilityOptionObject.Option && <div>Utility Option2: {input2UtilityOptionObject.Option}</div>}
          {input2UtilityOptionObject.category && <div>Utility Category2: {input2UtilityOptionObject.category}</div>}
          {input2UtilityOptionObject.category && <div>Utility Category2: {input2UtilityOptionObject.id}</div>}
        </>
      )}
    </div>
  );
};

export default App;
