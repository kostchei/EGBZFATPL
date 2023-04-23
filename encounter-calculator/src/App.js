import React, { useState } from "react";
import "./App.css";

function App() {
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(1);
  const [difficulty, setDifficulty] = useState("medium");
  const [encounterList, setEncounterList] = useState([]);
  const [terrain, setTerrain] = useState('');
  const [factions, setFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState('');



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
  

  const challengeRatingList = [
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
  

  const monstersByCR = {
    "1/4": [
      { name: "Skeleton", cr: "1/4", terrain: "arctic", faction: "Frostmourne" },
      { name: "Winter Sprite", cr: "1/4", terrain: "arctic", faction: "Feyfrost" },
      { name: "Mountain Goat Buck and Nannie", cr: "1/4", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Anarch", cr: "1/4", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Snow Barbarian", cr: "1/4", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Pair of Yeti Tykes", cr: "1/4", terrain: "arctic", faction: "Indigenous" },
      { name: "Apprentice Wizard", cr: "1/4", terrain: "arctic", faction: "Sueloise" },
    ],
    "1/2": [
      { name: "Shadow", cr: "1/2", terrain: "arctic", faction: "Frostmourne" },
      { name: "Valenar Steed", cr: "1/2", terrain: "arctic", faction: "Feyfrost" },
      { name: "Young Hill Giant", cr: "1/2", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Soldier", cr: "1/2", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Scout", cr: "1/2", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Ice Mephit", cr: "1/2", terrain: "arctic", faction: "Indigenous" },
      { name: "Thug", cr: "1/2", terrain: "arctic", faction: "Sueloise" },
    ],
    "1": [
      { name: "Snow Maiden", cr: "1", terrain: "arctic", faction: "Frostmourne" },
      { name: "Dread Warrior", cr: "1", terrain: "arctic", faction: "Frostmourne" },
      { name: "Specter", cr: "1", terrain: "arctic", faction: "Frostmourne" },
      { name: "Returned Sentry", cr: "1", terrain: "arctic", faction: "Frostmourne" },
      { name: "Quickling", cr: "1", terrain: "arctic", faction: "Feyfrost" },
      { name: "Dryad", cr: "1", terrain: "arctic", faction: "Feyfrost" },
      { name: "Half-Ogre", cr: "1", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Skull Lasher", cr: "1", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Spy", cr: "1", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Brown Bear", cr: "1", terrain: "arctic", faction: "Indigenous" },
      { name: "Giant Eagle", cr: "1", terrain: "arctic", faction: "Indigenous" },
      { name: "Evil Mage", cr: "1", terrain: "arctic", faction: "Sueloise" },
      ],
    "2": [
      { name: "Ghast (gheist)", cr: "2", terrain: "arctic", faction: "Frostmourne" },
      { name: "Will-o-Wisp", cr: "2", terrain: "arctic", faction: "Frostmourne" },
      { name: "Undying Soldier", cr: "2", terrain: "arctic", faction: "Frostmourne" },
      { name: "Ice Nymph", cr: "2", terrain: "arctic", faction: "Feyfrost" },
      { name: "Glacial Hag", cr: "2", terrain: "arctic", faction: "Feyfrost" },
      { name: "Ogre", cr: "2", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Fathomer", cr: "2", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Barbarian Leader", cr: "2", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Berserker", cr: "2", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Barbarian Leader", cr: "2", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Barbarian Shaman", cr: "2", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Druid", cr: "2", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Sabretooth", cr: "2", terrain: "arctic", faction: "Indigenous" },
      { name: "Polar Bear", cr: "2", terrain: "arctic", faction: "Indigenous" },
      { name: "Protege (Thayan Apprentice)", cr: "2", terrain: "arctic", faction: "Sueloise" },
      { name: "Bandit Captain", cr: "2", terrain: "arctic", faction: "Sueloise" }, 
    ],
    "3": [
      { name: "Wight", cr: "3", terrain: "arctic", faction: "Frostmourne" },
      { name: "Redcap", cr: "3", terrain: "arctic", faction: "Feyfrost" },
      { name: "Hag of fetid Gaze", cr: "3", terrain: "arctic", faction: "Feyfrost" },
      { name: "Ice Troll", cr: "3", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Werewolf", cr: "3", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Archer", cr: "3", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Winter Wolf", cr: "3", terrain: "arctic", faction: "Indigenous" },
      { name: "Yeti", cr: "3", terrain: "arctic", faction: "Indigenous" },
      { name: "Precognitive Mage", cr: "3", terrain: "arctic", faction: "Sueloise" },
      ],
    "4": [
      { name: "Banshee", cr: "4", terrain: "arctic", faction: "Frostmourne" },
      { name: "Deathlock", cr: "4", terrain: "arctic", faction: "Frostmourne" },
      { name: "Soul shaker", cr: "4", terrain: "arctic", faction: "Frostmourne" },
      { name: "Ghost", cr: "4", terrain: "arctic", faction: "Frostmourne" },
      { name: "Yeth Hound", cr: "4", terrain: "arctic", faction: "Feyfrost" },
      { name: "Sea Hag", cr: "4", terrain: "arctic", faction: "Feyfrost" },
      { name: "Verbeeg Marauder", cr: "4", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Ettin", cr: "4", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Weretiger", cr: "4", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Wereboar", cr: "4", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Oracle", cr: "4", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Guardian Wolf", cr: "4", terrain: "arctic", faction: "Indigenous" },
      { name: "Sueloise Reckoner", cr: "4", terrain: "arctic", faction: "Sueloise" },
      ],
    "5": [
      { name: "Wraith", cr: "5", terrain: "arctic", faction: "Frostmourne" },
      { name: "Knight of the Order", cr: "5", terrain: "arctic", faction: "Frostmourne" },
      { name: "Woodwoad", cr: "5", terrain: "arctic", faction: "Feyfrost" },
      { name: "Harpy Matriarch", cr: "5", terrain: "arctic", faction: "Feyfrost" },
      { name: "Ice Troll", cr: "5", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Hill Giant", cr: "5", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Frost Giant Servant", cr: "5", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Gladiator", cr: "5", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Great Warrior", cr: "5", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Tlacatecolo", cr: "5", terrain: "arctic", faction: "Indigenous" },
      { name: "Unicorn", cr: "5", terrain: "arctic", faction: "Indigenous" },
      { name: "Immortal Lotus Monk", cr: "5", terrain: "arctic", faction: "Sueloise" },
      ],
      
  };
  
  function updateFactions(terrain) {
    const factionsByTerrain = {
      arctic: [
        "Frostmourne",
        "Feyfrost",
        "Hodir Ordning",
        "Frost Barbarians",
        "Snow Barbarians",
        "Indigenous",
        "Sueloise",
      ],
      desert: [
        "Baklunish", 
        "Rary-Bright Empire",
        "Old Sulm", 
        "Flan",
        "Azak-Zil Demihumans",
        "Elemental Fire",
        "Desert Fauna",
      ],
      forest: [
        "Elvish",
        "Haunted",
        "Feywild", 
        "Primordial",
        "Settled Woodland",

      ]
      // ... (Add faction lists for other terrains)
    };
  
    setFactions(factionsByTerrain[terrain] || []);
    setSelectedFaction('');
  }
  

  function filterMonstersByTerrainAndFaction(monstersByCR, terrain, faction) {
    const filteredMonstersByCR = {};
  
    for (const cr in monstersByCR) {
      filteredMonstersByCR[cr] = monstersByCR[cr].filter(
        (monster) => monster.terrain === terrain && (monster.faction === faction || Math.random() > 0.5)
      );
    }
  
    return filteredMonstersByCR;
  }
  



  function generateEncounter(xpBudget, challengeRatingList, monstersByCR) {
    const encounter = [];
  
    while (xpBudget > 0) {
      const maxAffordableCR = challengeRatingList
        .slice()
        .reverse()
        .find((cr) => cr.xp <= xpBudget);
  
      if (!maxAffordableCR) {
        break;
      }
  
      const affordableMonsters = monstersByCR[maxAffordableCR.cr];
  
      if (affordableMonsters && affordableMonsters.length > 0) {
        const randomMonsterIndex = Math.floor(Math.random() * affordableMonsters.length);
        const selectedMonster = affordableMonsters[randomMonsterIndex];
        encounter.push(selectedMonster);
        xpBudget -= maxAffordableCR.xp;
      } else {
        break;
      }
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
  
    const adjustedXPBudget = getPartyXPThreshold(partySize, partyLevel, difficultyThresholds, difficulty);
    const generatedEncounter = generateEncounter(adjustedXPBudget, challengeRatingList, filteredMonstersByCR);
  
    setEncounterList(generatedEncounter);
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
            <option value="desert">Arctic</option>
            <option value="forest">Arctic</option>
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
      <h2>Encounter:</h2>
      <ul>
        {encounterList.map((monster, index) => (
          <li key={index}>
            {monster.name} (CR: {monster.cr})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;