import Dupli from './component/SDD';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [cacheData, setCacheData] = useState(null);
  const [_, setVersion] = useState();

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
      {cacheData ? <Dupli cacheData={cacheData.Data} /> : <p>Loading data...</p>}
    </div>
  );
};

export default App;
