import React, { useState, useEffect, useRef } from 'react';
import Appdrop from './dropdown';
import { filterData } from '../utlity/dropDownUtility';

const App = ({ data, setterInput, disableSecond, letItReset, secondRequired, utility, utilityFunction, name}) => {
    console.log("Here from dropdownController by SelectorComponent. Adding input field for controlling");

    const [input, setInput] = useState('');
    const [filteredData, setFilteredData] = useState({});
    const [showAppdrop, setShowAppDrop] = useState(false);
    const [error, setError] = useState(false); // Error state
    const divRef = useRef(null);
    const [readOnly, setReadOnly] = useState(false)
    const [utilityAdded, setUtilityAdded] = useState()

    const handleInputTypeChange = (e) => {
        setShowAppDrop(true);
        const newInput = e.target.value.trim(); // Trim the input
    
        // If the input is empty, reset everything
        if (newInput.length === 0) {
            setInput('');
            setShowAppDrop(false)
            setterInput(undefined)
            utilityFunction(undefined)
            return; // Return early to avoid further processing
        }
    
        // Check if there's a colon in the input
        if (newInput.includes(":")) {
            // Split the input into two parts based on the colon
            const [firstPart, secondPart] = newInput.split(":");
    
            // Set the input state to the full value (first part + colon + second part)
            setInput(newInput);
            setterInput({ id: firstPart, category: 'host', Option: firstPart });
    
            // Call the filterData function with the second part (after the colon)
            const { filteredData, showAppDrop } = filterData(utility, secondPart, false, name, letItReset); // set addHostRequired to false
    
            // Update the filtered data and dropdown visibility based on the filtered result
            setFilteredData(filteredData);
            setShowAppDrop(showAppDrop);
    
            setUtilityAdded(true);
        } else {
            // If no colon, proceed normally
            setInput(newInput);
            setUtilityAdded(false);
        
            // Check if name is 'second' and letItReset.Option matches newInput
            if (name === 'second' && letItReset.Option === newInput) {
                // Call the filterData function with addHost = false
                const { filteredData, showAppDrop } = filterData(data, newInput, false, name, letItReset);
        
                // Update the filtered data and dropdown visibility
                setFilteredData(filteredData);
                setShowAppDrop(showAppDrop);
            } else {
                // Otherwise, call filterData with addHost = true
                const { filteredData, showAppDrop } = filterData(data, newInput, true, name, letItReset);
        
                // Update the filtered data and dropdown visibility
                setFilteredData(filteredData);
                setShowAppDrop(showAppDrop);
            }
        }
    };
    



    const handleSelectFromDropDown = (value) => {
        if (utilityAdded) {
            setInput(letItReset.category + " == " + letItReset.Option + " && " + value.category + " == " + value.Option)
            utilityFunction(value)
            setShowAppDrop(false)
            setReadOnly(true)
        }
        else {
            setInput(value.category + " == " + value.Option || '');
            setterInput(value)
            setShowAppDrop(false)
            setReadOnly(true)
        }
    };

    useEffect(() => {
        if (!letItReset || Object.keys(letItReset).length <= 0) {
            setInput('');
            setReadOnly(false)
        }
    }, [letItReset]);

    useEffect(() => {
        if (secondRequired && input.trim() === '') {
            setError(true); // Set error if required and empty
            setterInput(undefined)
        } else {
            setError(false); // Clear error when valid
        }
    }, [input, secondRequired]);

    const handleClickOutside = (e) => {
        // If the click is outside the div, close the dropdown
        if (divRef.current && !divRef.current.contains(e.target)) {
            setShowAppDrop(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClearInput = () => {
        setInput('');
        setReadOnly(false)
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} ref={divRef}>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    onChange={handleInputTypeChange}
                    value={input || ''}
                    placeholder="Search..."
                    disabled={disableSecond} // Using handleDisable function here
                    style={{
                        border: error ? '2px solid red' : '1px solid #ccc',
                        outline: error ? 'red' : 'none',
                        paddingRight: '30px' // Add padding for the 'X' button
                    }}
                    readOnly={readOnly}
                />
                {/* Show 'X' button if there is input and input is not disabled */}
                {input && !disableSecond && (
                    <button 
                        onClick={handleClearInput} 
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: 'gray'
                        }}
                    >
                        x
                    </button>
                )}
            </div>
            {error && <span style={{ color: 'red', fontSize: '12px' }}>This field is required.</span>}
            {showAppdrop && <Appdrop data={filteredData} setinputfunction={handleSelectFromDropDown} />}
        </div>
    );
};

export default App;
