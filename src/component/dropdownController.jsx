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
    const [disableChildInput, setDisableChildInput] = useState()
    const [utilityAdded, setUtilityAdded] = useState()

    const handleInputTypeChange = (e) => {
        setShowAppDrop(true)
        const newInput = e.target.value.trim(); // Trim the input

        // Check if there's a colon in the input
        if (newInput.includes(":")) {
            // Split the input into two parts based on the colon
            const [firstPart, secondPart] = newInput.split(":");

            // Set the input state to the full value (first part + colon + second part)
            setInput(newInput);
            setterInput({ id: firstPart, category: 'host', Option: firstPart })

            // Call the filterData function with the second part (after the colon)
            const { filteredData, showAppDrop } = filterData(utility, secondPart, false); // set addHostRequired to false

            // Update the filtered data and dropdown visibility based on the filtered result
            setFilteredData(filteredData);
            setShowAppDrop(showAppDrop);

            setUtilityAdded(true)

        } else {
            // If no colon, proceed normally
            setInput(newInput);
            setUtilityAdded(false)

            // Call the filterData function with the entire input
            const { filteredData, showAppDrop } = filterData(data, newInput, true);

            // Update the filtered data and dropdown visibility
            setFilteredData(filteredData);
            setShowAppDrop(showAppDrop);
        }
    };



    const handleSelectFromDropDown = (value) => {
        if (utilityAdded) {
            setInput(letItReset.category + " == " + letItReset.Option + " && " + value.category + " == " + value.Option)
            utilityFunction(value)
            setShowAppDrop(false)
            setDisableChildInput(true)
        }
        else {
            setInput(value.category + " == " + value.Option || '');
            setterInput(value)
            setShowAppDrop(false)
            setDisableChildInput(true)
        }
    };

    useEffect(() => {
        if (!letItReset) {
            setInput('');
            setDisableChildInput(false)
        }
    }, [letItReset]);

    useEffect(() => {
        if (secondRequired && input.trim() === '') {
            setError(true); // Set error if required and empty
            setterInput({})
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

    const handleDisable = (disableSecond, disableChildInput) => {
        if (disableSecond) {
            return true
        }
        else {
            if (disableChildInput) {
                return true
            }
            else {
                return false
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} ref={divRef}>
            <input
                type="search"
                onChange={handleInputTypeChange}
                value={input || ''}
                placeholder="Search..."
                disabled={handleDisable(disableSecond, disableChildInput)}  // Using handleDisable function here
                style={{
                    border: error ? '2px solid red' : '1px solid #ccc',
                    outline: error ? 'red' : 'none'
                }}
            />
            {error && <span style={{ color: 'red', fontSize: '12px' }}>This field is required.</span>}
            {showAppdrop && <Appdrop data={filteredData} setinputfunction={handleSelectFromDropDown} name={name} letItRest={letItReset}/>}

        </div>
    );
};

export default App;
