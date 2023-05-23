import React, { useState } from "react";
import "./App.css";
import testImage from './assets/test-image.jpg';
import monstersByCRData from './data/monstersByCR.json';
import featuresListData from './data/featuresList.json';


function App() {   //constants go here
  const [partySize, setPartySize] = useState(2);
  const [partyLevel, setPartyLevel] = useState(1);
  const [difficulty, setDifficulty] = useState("random");
  const [encounterList, setEncounterList] = useState([]);
  const [terrain, setTerrain] = useState('');
  const [factions, setFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState('');
  const [encounterDistance, setEncounterDistance] = useState(0);
  const [wind, setWind] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [generatedFeatures, setGeneratedFeatures] = useState([]);
  const [actualDifficulty, setActualDifficulty] = useState("");
  const [xpBudget, setXpBudget] = useState(0);

  const terrainDistanceMap = {
    desert: () => rollDice(6, 6) * 10,
    arctic: () => rollDice(6, 6) * 10,
    forest: () => rollDice(2, 8) * 10,
    hills:  () => rollDice(2, 10) * 10,
    mountains: () => rollDice(4, 10) * 10,
    jungle: () => rollDice(2, 6) * 10,
  };
   
  const difficultyThresholds = [
    { level: 1, easy: 25, medium: 50, hard: 75, deadly: 100 },
    { level: 2, easy: 50, medium: 100, hard: 150, deadly: 200 },
    { level: 3, easy: 75, medium: 150, hard: 225, deadly: 400 },
    { level: 4, easy: 125, medium: 250, hard: 375, deadly: 500 },
    { level: 5, easy: 250, medium: 500, hard: 750, deadly: 1100 },
    { level: 6, easy: 300, medium: 600, hard: 900, deadly: 1400 },
    { level: 7, easy: 350, medium: 750, hard: 1100, deadly: 1700 },
    { level: 8, easy: 450, medium: 900, hard: 1400, deadly: 2100 },
    { level: 9, easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
    { level: 10, easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
    { level: 11, easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
    { level: 12, easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
    { level: 13, easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
    { level: 14, easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
    { level: 15, easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
    { level: 16, easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
    { level: 17, easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
    { level: 18, easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
    { level: 19, easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
    { level: 20, easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
  ];

  const featuresList = featuresListData.featuresList;
  
  const challengeRatingList = [
    { cr: "0", xp: 10 },
    { cr: "1/8", xp: 25 },
    { cr: "1/4", xp: 50 },
    { cr: "1/2", xp: 100 },
    { cr: 1, xp: 200 },
    { cr: 2, xp: 450 },
    { cr: 3, xp: 700 },
    { cr: 4, xp: 1100 },
    { cr: 5, xp: 1800 },
    { cr: 6, xp: 2300 },
    { cr: 7, xp: 2900 },
    { cr: 8, xp: 3900 },
    { cr: 9, xp: 5000 },
    { cr: 10, xp: 5900 },
    { cr: 11, xp: 7200 },
    { cr: 12, xp: 8400 },
    { cr: 13, xp: 10000 },
    { cr: 14, xp: 11500 },
    { cr: 15, xp: 13000 },
    { cr: 16, xp: 15000 },
    { cr: 17, xp: 18000 },
    { cr: 18, xp: 20000 },
    { cr: 19, xp: 22000 },
    { cr: 20, xp: 25000 },
  ];
  
  const monstersByCR = monstersByCRData;
 

   function generateRandomFeature(encounterDistance) {
    const randomFeature = featuresList[Math.floor(Math.random() * featuresList.length)];
    const distanceModifier = Math.random() * 2 - 0.5;
    const distance = encounterDistance * distanceModifier;
  
    const sizeModifier = Math.random() * 1.95 + 0.05;
    let area = encounterDistance * sizeModifier;
    if (randomFeature.areaModifier) {
      area *= randomFeature.areaModifier;
    }
  
    const heightModifier = randomFeature.heightModifier || 0; // Use heightModifier from the feature or default to 1
    const heightFraction = Math.random() * 0.9 + 0.1;
    const height = encounterDistance * heightFraction * heightModifier;
  
    return {
      ...randomFeature,
      distance: Math.round(distance),
      area: Math.round(area),
      height: Math.round(height),
    };
  }
  

  

        function rollDice(number, sides) {
          return Array.from({ length: number }, () => Math.ceil(Math.random() * sides)).reduce((a, b) => a + b);
        }
      
        function generateEncounterDistance(terrain) {
          const generator = terrainDistanceMap[terrain];
          return generator ? generator() : 0;
        }
 
        function generateWind() {
          const roll = rollDice(1, 20);
          if (roll <= 12) return 'no wind';
          if (roll <= 17) return 'light wind';
          return 'strong wind (Disadvantage on ranged, ¾ cover at long range)';
        }
        
        function generatePrecipitation() {
          const roll = rollDice(1, 20);
          if (roll <= 12) return 'none';
          if (roll <= 17) return 'light rain or snow (½ Cover over 100ft)';
          return 'strong rain or snow (¾ cover over 100ft)';
        }
        
        function generateLightLevel() {
          const roll = rollDice(1, 11);
          const lightLevels = [
            'Dawn, dim',
            'Dawn, bright',
            'Morning, overcast',
            'Morning, clear unless precipitation',
            'Midday or night if travelling at night',
            'Afternoon, overcast',
            'Afternoon clear unless precipitation',
            'Dusk, bright',
            'Dusk, dim',
            'Night, moonlight',
            'Night, dark',
          ];
          return lightLevels[roll - 1];
        }
        
  /*"Suloise", "Northern Barbarians", "Wildthings", "Magma Dwellers", "Pale Wyrms", "Goblinkin", "Frostmourne", "Feyfrost", "Hodir Ordning" */
  function updateFactions(terrain) {
    const factionsByTerrain = {
      arctic: [
        "Wildthings",
        "Dungeon",
        "Frostmourne",
        "Feyfrost",
        "Pale Wyrms",
        "Magma Dwellers",
        "Goblinkin",
        "Hodir Ordning",
        "Northern Barbarians",
        "Sueloise",
      ],
      desert: [
        "Baklunish", 
        "Rary-Bright Empire",
        "Old Sulm", 

      ],
      forest: [
        "Elvish",
        "Haunted",
        "Feywild", 
        "Primordial",
        "Settled Woodland",

      
    ],
    hills: [
      "Kronspire",
      "Barren",
      "Flan",

    ],
    mountains: [
      "Primal Ordning",
      "Desolate",
      "Dwarven",

    ],
    jungle: [
      "Sueloise Homeland",
      "Primordial",
      "Karast",

    ],
    farmland: [
      "Ulek", // lots of demihumans, dwarves, halflings, gnomes, elves
      "Borderlands", // lots of bandits, more wolves , adventurers and raiders
      "Oerdian", //mostly human lands with central figures, majors etc

    ]
    };
  
    setFactions(factionsByTerrain[terrain] || []);
    setSelectedFaction('');
  }
  

  function filterMonstersByTerrainAndFaction(monstersByCR, terrain, faction) {
    const filteredMonstersByCR = {};
  
    for (const cr in monstersByCR) {
      filteredMonstersByCR[cr] = monstersByCR[cr].filter((monster) => {
        // Check if the monster's terrains includes the selected terrain
        if (monster.terrain.includes(terrain)) {
          const randomRoll = Math.random() * 100; // Generate a random number between 0 and 100
  
          if (randomRoll <= 75) {
            // Check if the monster's factions includes the selected faction AND monster's terrains includes the selected terrain
            return monster.faction.includes(faction) && monster.terrain.includes(terrain);
          } else {
            // Choose a random monster from the selected terrain
            return true;
          }
        }
  
        return false;
      });
    }
  
    return filteredMonstersByCR;
  }
  
  function findHighestCR(xpBudget, challengeRatingList, filteredMonstersByCR) {
    for (let i = challengeRatingList.length - 1; i >= 0; i--) {
      if (challengeRatingList[i].xp <= xpBudget) {
        if (filteredMonstersByCR[challengeRatingList[i].cr].length > 0) {
          return challengeRatingList[i].cr;
        }
      }
    }
    return 0;
  }
  
  function generateEncounter(xpBudget, challengeRatingList, filteredMonstersByCR) {
    const encounter = [];
  
    const addToEncounter = (monster, cr) => {
      encounter.push(monster);
      xpBudget -= challengeRatingList.find(crItem => crItem.cr === cr).xp;
    };
  
    let method;
  
// Determine the encounter generation method based on the xp budget and probabilities
if (xpBudget >= 3000 && Math.random() < 0.25) {
  // Method 4: Fifteen monsters each worth up to or equal to 1/60 of the xp budget
  method = 4;
} else if (xpBudget >= 600 && Math.random() < 0.5) {
  // Method 3: Six monsters each worth up to or equal to 1/12 of the xp budget
  method = 3;
} else if (xpBudget >= 100 && Math.random() < 0.75) {
  // Method 2: A pair of monsters, each worth up to or equal to 1/3 of the xp budget
  method = 2;
} else {
  // Method 1: A big monster, sometimes with other smaller ones up to or equal the xp budget
  method = 1;
}
  
    switch (method) {
      case 1:
        // Method 1: A big monster, sometimes with other smaller ones up to or equal the xp budget
        const cr = findHighestCR(xpBudget, challengeRatingList, filteredMonstersByCR);
        const potentialMonsters = filteredMonstersByCR[cr];
  
        if (potentialMonsters && potentialMonsters.length > 0) {
          const randomIndex = Math.floor(Math.random() * potentialMonsters.length);
          const selectedMonster = potentialMonsters[randomIndex];
          addToEncounter(selectedMonster, cr);
          xpBudget *= Math.random() * 0.5 + 0.5; // Reduce the xp budget by 50-100%
        }
        break;
      case 2:
        // Method 2: A pair of monsters, each worth up to or equal to 1/3 of the xp budget
        const pairBudget = xpBudget / 3;
  
        if (pairBudget > 0) {
          for (let i = 0; i < 2; i++) {
            const cr = findHighestCR(pairBudget, challengeRatingList, filteredMonstersByCR);
            const potentialMonsters = filteredMonstersByCR[cr];
  
            if (potentialMonsters && potentialMonsters.length > 0) {
              const randomIndex = Math.floor(Math.random() * potentialMonsters.length);
              const selectedMonster = potentialMonsters[randomIndex];
              addToEncounter(selectedMonster, cr);
            }
          }
        }
        break;
        case 3:
          // Method 3: ~Six monsters each worth up to or equal to 1/12 of the xp budget
          const minionBudget = xpBudget / 12;
        
          if (minionBudget > 0) {
            const cr1 = findHighestCR(minionBudget, challengeRatingList, filteredMonstersByCR);
            const potentialMonsters1 = filteredMonstersByCR[cr1];
        
            if (potentialMonsters1 && potentialMonsters1.length > 0) {
              const randomIndex1 = Math.floor(Math.random() * potentialMonsters1.length);
              const selectedMonster1 = potentialMonsters1[randomIndex1];
              addToEncounter(selectedMonster1, cr1);
        
              const diceRoll1 = Math.floor(Math.random() * 6) + 1; // Roll 1d6 for the number of monsters
        
              for (let i = 0; i < diceRoll1; i++) {
                addToEncounter(selectedMonster1, cr1);
              }
        
              const cr2 = findHighestCR(minionBudget, challengeRatingList, filteredMonstersByCR);
              const potentialMonsters2 = filteredMonstersByCR[cr2];
        
              if (potentialMonsters2 && potentialMonsters2.length > 0) {
                const randomIndex2 = Math.floor(Math.random() * potentialMonsters2.length);
                const selectedMonster2 = potentialMonsters2[randomIndex2];
                addToEncounter(selectedMonster2, cr2);
        
                const diceRoll2 = Math.floor(Math.random() * 6) + 1; // Roll 1d6 for the number of monsters
        
                for (let i = 0; i < diceRoll2; i++) {
                  addToEncounter(selectedMonster2, cr2);
                }
              }
            }
          }
          
        break;
  
        case 4:
          // Method 4: ~Fifteen monsters each worth up to or equal to 1/60 of the xp budget
          const swarmBudget = xpBudget / 60;
        
          if (swarmBudget > 0) {
            const cr1 = findHighestCR(swarmBudget, challengeRatingList, filteredMonstersByCR);
            const potentialMonsters1 = filteredMonstersByCR[cr1];
        
            if (potentialMonsters1 && potentialMonsters1.length > 0) {
              const randomIndex1 = Math.floor(Math.random() * potentialMonsters1.length);
              const selectedMonster1 = potentialMonsters1[randomIndex1];
              addToEncounter(selectedMonster1, cr1);
        
              const diceRoll1 = Math.floor(Math.random() * 10) + 1; // Roll 1d10 for the number of monsters
        
              for (let i = 0; i < diceRoll1; i++) {
                addToEncounter(selectedMonster1, cr1);
              }
        
              const cr2 = findHighestCR(swarmBudget, challengeRatingList, filteredMonstersByCR);
              const potentialMonsters2 = filteredMonstersByCR[cr2];
        
              if (potentialMonsters2 && potentialMonsters2.length > 0) {
                const randomIndex2 = Math.floor(Math.random() * potentialMonsters2.length);
                const selectedMonster2 = potentialMonsters2[randomIndex2];
                addToEncounter(selectedMonster2, cr2);
        
                const diceRoll2 = Math.floor(Math.random() * 10) + 1; // Roll 1d10 for the number of monsters
        
                for (let i = 0; i < diceRoll2; i++) {
                  addToEncounter(selectedMonster2, cr2);
                }
        
                const diceRoll3 = Math.floor(Math.random() * 10) + 1; // Roll 1d10 for the number of monsters
        
                for (let i = 0; i < diceRoll3; i++) {
                  addToEncounter(selectedMonster2, cr2);
                }
              }
            }
          }
        
        break;
  default:
        break;
    }
  
    return encounter;
  }
  
  
  
  function getPartyXPThreshold(partySize, partyLevel, difficultyThresholds, difficulty) {
    return (
      difficultyThresholds.find((threshold) => threshold.level === partyLevel)[
        difficulty
      ] * partySize
    );
  }
  
  function handleSubmit(event) {
    event.preventDefault();
  
    const filteredMonstersByCR = filterMonstersByTerrainAndFaction(monstersByCR, terrain, selectedFaction);
  
    let finalDifficulty = difficulty;
    if (difficulty === "random") {
      const randomValue = Math.random();
      if (randomValue < 0.14) {
        finalDifficulty = "easy";
      } else if (randomValue < 0.82) {
        finalDifficulty = "medium";
      } else if (randomValue < 0.95) {
        finalDifficulty = "hard";
      } else {
        finalDifficulty = "deadly";
      }
    }
    setActualDifficulty(finalDifficulty);
  
    const adjustedXPBudget = getPartyXPThreshold(partySize, partyLevel, difficultyThresholds, finalDifficulty);
    setXpBudget(adjustedXPBudget);

    const generatedEncounter = generateEncounter(adjustedXPBudget, challengeRatingList, filteredMonstersByCR);
    

    setEncounterList(generatedEncounter);
    // Set the environmental effects
    setWind(generateWind());
    setPrecipitation(generatePrecipitation());
    setLightLevel(generateLightLevel());
  
    // Set the encounter distance
    const generatedEncounterDistance = generateEncounterDistance(terrain);
    setEncounterDistance(generatedEncounterDistance);
  
    if (generatedEncounterDistance > 0) {
      // Generate and set features
      const newFeatures = [
        generateRandomFeature(generatedEncounterDistance),
        generateRandomFeature(generatedEncounterDistance),
        generateRandomFeature(generatedEncounterDistance),
      ];
  
      setGeneratedFeatures(newFeatures);
    }
  }
   

  return (
    <div className="App">
      <h1>Encounter Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Party Size:
          <input
            type="number"
            value={partySize}
            onChange={(e) => setPartySize(parseInt(e.target.value))}
          />
        </label>
        <label>
          Party Level:
          <input
            type="number"
            value={partyLevel}
            onChange={(e) => setPartyLevel(parseInt(e.target.value))}
          />
        </label>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="deadly">Deadly</option>
            <option value="random">Random</option>
          </select>
        </label>
        <label>
          Terrain:
          <select
            value={terrain}
            onChange={(e) => {
              setTerrain(e.target.value);
              updateFactions(e.target.value);
            }}
          >
            <option value="">Select terrain</option>
            <option value="arctic">Arctic</option>
            <option value="desert">Desert</option>
            <option value="forest">Forest</option>
            <option value="hills">Hills</option>
            <option value="mountains">Mountains</option>
            <option value="jungle">Jungle</option>
            <option value="farmland">Farmland</option>


            {/* Add more terrain options here */}
          </select>
        </label>
        <label>
          Faction:
          <select
            value={selectedFaction}
            onChange={(e) => setSelectedFaction(e.target.value)}
          >
            <option value="">Select faction</option>
            {factions.map((faction) => (
              <option key={faction} value={faction}>
                {faction}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Generate Encounter</button>
      </form>
      <div className="output-container">
      <h2>Encounter:</h2>
      <h3>Difficulty: {actualDifficulty.charAt(0).toUpperCase() + actualDifficulty.slice(1)}</h3>
       <h3>XP Budget: {xpBudget}</h3>
      <ul>
      {encounterList.map((monster, index) => (
          <li key={index}>
            {monster.name} (CR: {monster.cr})
          </li>
        ))}
      </ul>
      <h3>Encounter Distance: {encounterDistance} feet</h3>
      <h3>Wind: {wind}</h3>
      <h3>Precipitation: {precipitation}</h3>
      <h3>Light Level: {lightLevel}</h3>
      <h2>Generated Features:</h2>
    <ul>
    {generatedFeatures.map((feature, index) => (
      <li key={index}>
        {feature.name} (Distance: {feature.distance} feet, Area: {feature.area} feet, Height: {feature.height} feet)
      </li>
      ))}
    </ul>
    </div>
    <div 
 className="background-image"
 style={{ backgroundImage: `url(${testImage})` }}
>
    </div>
  </div>
  );
}




export default App;