import { champions } from './firebase';

class apiChampion {
    // Load
    static championsLoad = () =>
        champions
            .get()
            .then((snapshot) => {
                console.log(`Champions: ${snapshot.size}`); // remove
                // snapshot.forEach((champion) => console.log(champion.id, '=>', champion.data())); // remove
                return snapshot.docs.map((champion) => champion.data());
            })
            .catch((error) => console.error('Error getting champions:', error)); // remove

    // Watch
    static championsWatch = () =>
        champions.onSnapshot(
            (snapshot) => {
                console.log(`Champions: ${snapshot.size} (watching)`); // remove
                snapshot.forEach((champion) => console.log(champion.id, '=>', champion.data())); // remove
                return snapshot.docs.map((champion) => champion.data());
            },
            (error) => console.error('Error getting champions:', error), // remove
        );
}

export default apiChampion;
