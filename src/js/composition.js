export const sortPositions = (lanes) => {
    const order = {
        top: 1,
        jungle: 2,
        middle: 3,
        bottom: 4,
        support: 5,
    };
    return lanes.sort((a, b) => order[a.position] - order[b.position]);
};

export const formatLanes = (lanesArray, lane, championsMap) => {
    const lanes = [];
    lanesArray.forEach((key) => {
        const champion = lane[key];
        lanes.push({
            position: key,
            champion: champion ? championsMap[champion] : {},
        });
    });
    return sortPositions(lanes);
};
