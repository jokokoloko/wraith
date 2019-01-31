export const positions = ['top', 'jungle', 'middle', 'bottom', 'support'];

export const buildLanes = (lanesMap, championsMap, wildcardsMap) =>
    positions.map((position) => {
        const champion = lanesMap && lanesMap[position];
        return {
            champion: (champion && championsMap[champion]) || (champion && wildcardsMap[champion]) || {},
            position,
        };
    });
