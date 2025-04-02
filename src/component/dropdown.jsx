import React from 'react';

const Appdrop = ({ data, setinputfunction }) => {
    console.log("Here from dropdown by dropdowncontroller. Rendering dropdown");

    return (
        <div
            style={{
                backgroundColor: 'white',
                color: 'black',
                zIndex: '1',
                border: '1px solid #ccc', // Add border to mimic a select box
                borderRadius: '4px', // Rounded corners
                padding: '8px 0', // Padding to space out buttons
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for better visibility
                width: '200px', // Fixed width to look like a select
                maxHeight: '300px', // Limit height for scrolling when items are many
                overflowY: 'auto', // Scrollable if there are too many items
            }}
        >
            {Object.keys(data).map((key) => (
                <div key={key} style={{ padding: '8px' }}>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>{key}</strong>
                    {data[key].map((keyValue, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                alert(keyValue.Option); // Alert to simulate selection
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
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')} // Hover effect
                            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')} // Reset hover effect
                        >
                            {keyValue.Option}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Appdrop;
