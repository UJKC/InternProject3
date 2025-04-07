export function exactMatch(inputLower, data) {
    let isExactMatchInOtherCategories = false;

    Object.keys(data).forEach((dataKey) => {
        const exactMatch = data[dataKey].some(
            (item) => typeof item.Option === 'string' && item.Option.toLowerCase() === inputLower
        );
        if (exactMatch) {
            isExactMatchInOtherCategories = true;
        }
    });

    return isExactMatchInOtherCategories;
};

export function includeMatch(inputLower, data) {
    if (!data || typeof data !== 'object' || inputLower.length <= 0) {
        return {}; // Return an empty object if data is invalid
    }
    let matchedItems = {};

    Object.keys(data).forEach((dataKey) => {
        matchedItems[dataKey] = data[dataKey].filter(
            (item) => typeof item.Option === 'string' && item.Option.toLowerCase().includes(inputLower)
        );
    });

    return matchedItems;
};

export function filterData(data, input, addHost = false, name, letItReset, optionName) {
    let inputClone = input.toLowerCase(); // Create inputClone before the loop
    let found = false; // Flag to track if data is found
    let filteredData = {}; // Variable to store the filtered data

    if (name === 'second' && letItReset && Object.keys(letItReset).length !== 0) {
        const { Option, category } = letItReset;

        // Check if letItReset.Option exists in letItReset.category within data[letItReset.category]
        if (category && data[category]) {
            const categoryData = data[category];
            const index = categoryData.findIndex(item => item.Option === Option);

            // If the item exists, remove it
            if (index !== -1) {
                categoryData.splice(index, 1);
            }
        }
    }

    while (!found && inputClone.length > 0) {
        // Check for Exact Match
        for (const dataKey of Object.keys(data)) {
            const exactMatch = data[dataKey].some(
                (item) => typeof item.Option === 'string' && item.Option.toLowerCase() === inputClone.toLowerCase()
            );

            if (exactMatch) {
                filteredData = { [dataKey]: data[dataKey].filter(item => item.Option.toLowerCase() === inputClone) };
                found = true;
                break;
            }
        }

        // Check for Include Match if no exact match found
        if (!found) {
            const includeMatched = includeMatch(inputClone, data);
            if (Object.values(includeMatched).some(items => items.length > 0)) {
                filteredData = includeMatched;
                found = true;

                // Only add the 'host' category if addHost is true
                if (addHost) {
                    if (optionName === 'port') {
                        // Check if input is a number string
                        const trimmedInput = input.trim();
                        const portNumber = Number(trimmedInput);
                        if (!isNaN(portNumber) &&
                            trimmedInput !== '' &&
                            Number.isInteger(portNumber) &&
                            portNumber >= 0 &&
                            portNumber <= 65535) {
                            // Input is a valid number string
                            if (includeMatched[optionName]) {
                                includeMatched[optionName].push({
                                    Option: input,
                                    category: optionName,
                                    id: input,
                                });
                            } else {
                                includeMatched[optionName] = [{
                                    Option: input,
                                    category: optionName,
                                    id: input,
                                }];
                            }
                        }
                    } else {
                        // Handle other optionName values as per original logic
                        if (includeMatched[optionName]) {
                            includeMatched[optionName].push({
                                Option: input,
                                category: optionName,
                                id: input,
                            });
                        } else {
                            includeMatched[optionName] = [{
                                Option: input,
                                category: optionName,
                                id: input,
                            }];
                        }
                    }
                }

            }
        }

        // Truncate the last character for the next iteration
        if (!found) {
            inputClone = inputClone.slice(0, -1);
        }
    }

    // Determine whether to show the drop-down or not
    const showAppDrop = input.length > 0;

    return { filteredData, showAppDrop };
};
