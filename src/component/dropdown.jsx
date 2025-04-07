import React, { useState } from 'react';

const Appdrop = ({ data, setinputfunction }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    
    const toggleShowMore = (category) => {
        setExpandedCategory(prevCategory => prevCategory === category ? null : category);
    };
    
    return (
        <div
            style={{
                backgroundColor: 'white',
                color: 'black',
                zIndex: '1',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px 0',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '200px',
                maxHeight: '300px',
                overflowY: 'auto',
            }}
        >
            {Object.keys(data).map((key) => {
                const items = data[key];
                if (items.length === 0) return null;
                const isExpanded = expandedCategory === key;
                const visibleItems = isExpanded ? items : items.slice(0, 4);
                
                return (
                    <div key={key} style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <strong style={{ marginBottom: '4px' }}>{key}</strong>
                        </div>
                        {visibleItems.map((keyValue, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    alert(keyValue.Option);
                                    setinputfunction(keyValue);
                                }}
                                style={{
                                    display: 'block', // Makes the buttons stack vertically
                                    width: '100%', // Buttons should take full width like options
                                    padding: '8px', // Padding inside buttons
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    color: 'black',
                                    transition: 'background-color 0.3s ease', // Smooth transition
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                            >
                                {keyValue.Option}
                            </button>
                        ))}
                        {items.length > 4 && (
                            <button
                                onClick={() => toggleShowMore(key)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '8px',
                                    border: 'none',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    color: 'blue',
                                    marginTop: '4px',
                                    textDecorationLine: 'underline',
                                    background: 'none'
                                }}
                            >
                                {isExpanded ? 'Show Less' : 'Show More...'}
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Appdrop;
