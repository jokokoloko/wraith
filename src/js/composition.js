export const positions = ['top', 'jungle', 'middle', 'bottom', 'support'];

export const buildLanes = (lanesMap, championsMap) =>
    positions.map((position) => {
        const champion = lanesMap && lanesMap[position];
        return {
            champion: champion ? championsMap[champion] : {},
            position,
        };
    });
