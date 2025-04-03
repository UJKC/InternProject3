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
