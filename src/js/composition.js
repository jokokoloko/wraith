export const positions = ['top', 'jungle', 'middle', 'bottom', 'support'];

export const emptyLanes = () => [
    { position: 'top', champion: {} },
    { position: 'jungle', champion: {} },
    { position: 'middle', champion: {} },
    { position: 'bottom', champion: {} },
    { position: 'support', champion: {} },
];

export const formatLanes = (lanesMap, championsMap) => {
    const lanes = [];
    lanesMap &&
        positions.forEach((position) => {
            const champion = lanesMap[position];
            lanes.push({
                champion: champion ? championsMap[champion] : {},
                position,
            });
        });
    return lanesMap ? lanes : emptyLanes();
};
