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
    lanesArray.forEach((position) => {
        const champion = lane[position];
        lanes.push({
            champion: champion ? championsMap[champion] : {},
            position,
        });
    });
    return sortPositions(lanes);
};
