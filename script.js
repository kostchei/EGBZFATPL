document.getElementById("encounter-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const partySize = parseInt(document.getElementById("party-size").value);
    const partyLevel = parseInt(document.getElementById("party-level").value);
    const difficulty = document.getElementById("difficulty").value;

    const encounterOutput = document.getElementById("encounter-output");

    // Calculate the encounter difficulty threshold
    // Use the table provided in the DMG for thresholds based on party level and difficulty
    // For simplicity, we will use an array of objects containing the threshold values
    const difficultyThresholds = [
        { level: 1, easy: 25, medium: 50, hard: 75, deadly: 100 },
        { level: 2, easy: 50, medium: 100, hard: 150, deadly: 200 },
        // ... add the remaining level thresholds up to level 20
    ];

    // Find the threshold object for the given party level
    const threshold = difficultyThresholds.find((threshold) => threshold.level === partyLevel);

    // Calculate the encounter XP budget based on difficulty and party size
    const xpBudget = threshold[difficulty] * partySize;

    // Generate the encounter using the xpBudget
    // In this example, we'll use a CR list with XP values
    const challengeRatingList = [
        { cr: "1/8", xp: 25 },
        { cr: "1/4", xp: 50 },
        { cr: "1/2", xp: 100 },
        { cr: "1", xp: 200 },
        { cr: "2", xp: 450 },
        // ... add more challenge ratings with their XP values
    ];
    const monstersByCR = {
        "1/8": [
            { name: "Giant Rat", cr: "1/8" },
            // ... add more CR 1/8 monsters
        ],
        "1/4": [
            { name: "Goblin", cr: "1/4" },
            // ... add more CR 1/4 monsters
        ],
        "1/2": [
            { name: "Orc", cr: "1/2" },
            // ... add more CR 1/2 monsters
        ],
        "1": [
            { name: "Ogre", cr: "1" },
            // ... add more CR 1 monsters
        ],
        // ... add monsters for more challenge ratings
    };

// Update the generateEncounter function to use challenge ratings
function generateEncounter(xpBudget, challengeRatingList, monstersByCR) {
    let encounter = [];
    let remainingXp = xpBudget;

    while (remainingXp > 0) {
        // Filter challenge ratings that are within the remaining XP budget
        const affordableCRs = challengeRatingList.filter((cr) => cr.xp <= remainingXp);

        // If no affordable challenge ratings remain, break the loop
        if (affordableCRs.length === 0) break;

        // Pick a random challenge rating from the affordable list
        const randomCR = affordableCRs[Math.floor(Math.random() * affordableCRs.length)];

        // Get the list of monsters for the chosen challenge rating
        const monsters = monstersByCR[randomCR.cr];

        // Pick a random monster from the list
        const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];

        // Add the monster to the encounter and subtract its XP from the remaining budget
        encounter.push(randomMonster);
        remainingXp -= randomCR.xp;
    }

    return encounter;
}

// Generate an encounter using the XP budget and display it
const encounter = generateEncounter(xpBudget, challengeRatingList, monstersByCR);
encounterOutput.innerHTML = `Encounter: ${encounter.map((monster) => monster.name).join(', ')}`;

// 
});
