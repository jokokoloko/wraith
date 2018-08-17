export const positions = ['top', 'jungle', 'middle', 'bottom', 'support'];

export const formatLanes = (lane, championsMap) => {
    const lanes = [];
    lane &&
        positions.forEach((position) => {
            const champion = lane[position];
            lanes.push({
                champion: champion ? championsMap[champion] : {},
                position,
            });
        });
    return lanes;
};
