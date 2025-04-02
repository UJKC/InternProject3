export function exactMatch (inputLower, data) {
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

export function includeMatch (inputLower, data)  {
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

export function filterData (data, input, addHost = false) {
    let inputClone = input.toLowerCase(); // Create inputClone before the loop
    let found = false; // Flag to track if data is found
    let filteredData = {}; // Variable to store the filtered data

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
                    if (includeMatched['host']) {
                        includeMatched['host'].push({
                            Option: input,
                            category: 'host',
                            id: input,
                        });
                    } else {
                        includeMatched['host'] = [{
                            Option: input,
                            category: 'host',
                            id: input,
                        }];
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
