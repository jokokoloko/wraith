// positions - array that defines the order of each lane
export const positions = ['top', 'jungle', 'middle', 'bottom', 'support'];

// buildLanes - returns a new array of objects which each contain a specific champion object and position string
export const buildLanes = (lanesMap, championsMap, wildcardsMap) =>
    positions.map((position) => {
        const champion = lanesMap && lanesMap[position];
        return {
            champion: (champion && championsMap[champion]) || (champion && wildcardsMap[champion]) || {},
            position,
        };
    });

// isFull - scans array and checks if all champs are selected
export const isFull = (array) => {
    for (let item of array) {
        if (item.champion.id === undefined) {
            return false;
        }
    }
    return true;
};

// findNextEmpty - scans array looking for the first empty index, starting with the startIndex, then going back to the first element if the array is full, will return -1
export const findNextEmpty = (array, startIndex) => {
    for (let i = startIndex; i < array.length; i++) {
        if (array[i].champion.id === undefined) {
            return i;
        }
    }
    for (let i = 0; i < startIndex; i++) {
        if (array[i].champion.id === undefined) {
            return i;
        }
    }
    return -1;
};
