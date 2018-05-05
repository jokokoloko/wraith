// filterByProperty - returns a new array containing all the matching objects or an empty array if no matches
export const filterByProperty = (array, name, value) => array.filter((object) => object[name] === value);

// findByProperty - scans array until it finds an exact match and then stops, ignoring any remaining objects in the array
export const findByProperty = (array, name, value) => {
    const object = array.find((object) => object[name] === value);
    return object ? object : {}; // returns only one object from the array or an empty object if no match (possibly remove this line and refactor)
};

// findIndexByProperty - returns the index number of the object within the array or -1 if no match
export const findIndexByProperty = (array, name, value) => array.findIndex((object) => object[name] === value);
