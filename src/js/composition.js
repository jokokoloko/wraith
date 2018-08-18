export const positions = ['top', 'jungle', 'middle', 'bottom', 'support'];

export const emptyLanes = () =>
    positions.map((position) => ({
        champion: {},
        position,
    }));

export const formatLanes = (lanesMap, championsMap) =>
    positions.map((position) => {
        const champion = lanesMap && lanesMap[position];
        return {
            champion: champion ? championsMap[champion] : {},
            position,
        };
    });
