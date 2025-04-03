import React, { useState } from 'react';

const Appdrop = ({ data, setinputfunction, name, letItRest }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleShowMore = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div>
      {Object.keys(data).map((key) => {
        const items = data[key];
        const isExpanded = expandedCategory === key;
        const visibleItems = isExpanded ? items : items.slice(0, 4);

        return (
          <div key={key} style={{ padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ marginBottom: '4px' }}>{key}</strong>
              {items.length > 4 && (
                <button
                  onClick={() => toggleShowMore(key)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#e0e0e0',
                    border: 'none',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: 'black',
                  }}
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
            {visibleItems.map((keyValue, index) => {
              // Skip rendering if the name is 'second' and letItRest is defined and not an empty object
              if (name === 'second' && letItRest && Object.keys(letItRest).length > 0) {
                // Skip the item that matches letItRest.Option and letItRest.category
                if (keyValue.Option === letItRest.Option && keyValue.category === letItRest.category) {
                  return null; // Skip rendering this item
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => {
                    alert(keyValue.Option);
                    setinputfunction(keyValue);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'black',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                >
                  {keyValue.Option}
                </button>
              );
            })}
            {items.length > 4 && (
              <button
                onClick={() => toggleShowMore(key)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#e0e0e0',
                  border: 'none',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: 'black',
                  marginTop: '4px',
                }}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Appdrop;
