import React, { useState } from "react";
import "./App.css";

function App() {   //constants go here
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(1);
  const [difficulty, setDifficulty] = useState("medium");
  const [encounterList, setEncounterList] = useState([]);
  const [terrain, setTerrain] = useState('');
  const [factions, setFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState('');
  const [encounterDistance, setEncounterDistance] = useState(0);
  const [wind, setWind] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [generatedFeatures, setGeneratedFeatures] = useState([]);

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
  const featuresList = [
    { name: "Crevasse, rock, ice or lava - across or parallel" },
    { name: "Cave or sinkhole: rock, ice or lava" },
    { name: "Steep slope up - moderate athletics or treat as difficult (or ½ move), easy athletics or acrobatics to go down (or ½ move)" },
    { name: "Steep slope down - easy athletics or acrobatics to go down (or ½ move), moderate athletics or treat as difficult to go up (or ½ move)" },
    { name: "Peak" },
    { name: "Cliff up or down - climb DC 10, but half speed. Height 10-200 feet, assumes across line of travel" },
    { name: "Boulders or other broken ground" },
    { name: "Light Foliage - bushes, heather or saplings" },
    { name: "Snow or sand dunes or hillocks or dense thick trees (full cover)" },
    { name: "Medium intermittent cover - ice formations, medium size trees etc, ¾ cover" },
    { name: "Ridgeline - assumes above you unless you are on it, across your path" },
    { name: "Ridgeline - assumes above you unless you are on it, parallel to your path" },
    { name: "Gully - assumes below you unless you are on it, across your path" },
    { name: "Gully - assumes below you unless you are on it, parallel to your path" },
    { name: "River or water course, parallel to your path" },
    { name: "River or water course" },
    { name: "Slippery surface - ice, wet rock, fallen trees, wet grass, loose shale" },
    { name: "Very Soft ground - snow drifts, mud, floating plants, soft fine sand" },
    { name: "Bridge, rail or guided path, no cover except prone" },
    { name: "Ruin ¾ cover, no roof", areaModifier: 0.5 },
    { name: "Building full cover, roof", areaModifier: 0.5 },
    { name: "Monument, way marker, shrine, well or cache ¾ cover", areaModifier: 0.1 },
  ];
  
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
  
  const monstersByCR = {
    "0": [
      { name: "Arctic Hare", cr: "0", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Snowy Owl", cr: "0", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Ptarmigan", cr: "0", terrain: "arctic", faction: "Calanthian Frozen North" }, 
  { name: "Deer", cr: "1/4", terrain: "arctic", faction: "Calanthian Frozen North" },
    ],
    "1/8": [
      { name: "Arctic Fox", cr: "1/8", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Seal", cr: "1/8", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Ice Snake", cr: "1/4", terrain: "arctic", faction: "Calanthian Frozen North" },
    ],
    "1/4": [
      { name: "Skeleton", cr: "1/4", terrain: "arctic", faction: "Frostmourne" },
      { name: "Goblin Scout", cr: "1/4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Elk", cr: "1/4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Dwarf Scout", cr: "1/4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Winter Sprite", cr: "1/4", terrain: "arctic", faction: "Feyfrost" },
      { name: "Mountain Goat Buck and Nannie", cr: "1/4", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Anarch", cr: "1/4", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Reindeer", cr: "1/4", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Pair of Yeti Tykes", cr: "1/4", terrain: "arctic", faction: "Indigenous" },
      { name: "Apprentice Wizard", cr: "1/4", terrain: "arctic", faction: "Sueloise" },
      { name: "Acolyte", cr: "1/4", terrain: "desert", faction: "Baklunish" },
      { name: "Night Blade", cr: "1/4", terrain: "desert", faction: "Rary-Bright Empire" },
      { name: "Riding Horse", cr: "1/4", terrain: "desert", faction: "Tribal" },
      { name: "Engineer - gnome or dwarf", cr: "1/4", terrain: "desert", faction: "Azak-Zil Demihumans" },
      { name: "Steam Mephit", cr: "1/4", terrain: "desert", faction: "Elemental Fire" },
      { name: "Giant Riding Lizard", cr: "1/4", terrain: "desert", faction: "Desert Fauna" },
      { name: "Skeleton", cr: "1/4", terrain: "desert", faction: "Old Sulm" },
      { name: "Engineer", cr: "1/4", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "1/4", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "1/4", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "1/4", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "1/4", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "1/4", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "1/4", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "1/4", terrain: "jungle", faction: "Primordial" }, 
      { name: "Swarm of Evil bities  and sweat", cr: "1/4", terrain: "jungle", faction: "Karast" },  
      { name: "2 Dwarf Guards", cr: "1/4", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "1/4", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "1/4", terrain: "farmland", faction: "Flan and Oerdian" },        
      

    ],
    "1/2": [
      { name: "Shadow", cr: "1/2", terrain: "arctic", faction: "Frostmourne" },
      { name: "Goblin Soldier", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Human Scout", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Hobgoblin Warrior", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Orc Raider", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Dwarf Soldier", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Arctic Wolf", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Wolverine", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Lynx", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Muskox", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Ice Mephit", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Magmin", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Arctic Constrictor Snake", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Ambush Drake", cr: "1/2", terrain: "arctic", faction: "Calanthian Frozen North" },    
      { name: "Valenar Steed", cr: "1/2", terrain: "arctic", faction: "Feyfrost" },
      { name: "Young Hill Giant", cr: "1/2", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Soldier", cr: "1/2", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Scout", cr: "1/2", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Ice Mephit", cr: "1/2", terrain: "arctic", faction: "Indigenous" },
      { name: "Thug", cr: "1/2", terrain: "arctic", faction: "Sueloise" },
      { name: "Sage", cr: "1/2", terrain: "desert", faction: "Baklunish" },
      { name: "Soldier", cr: "1/2", terrain: "desert", faction: "Rary-Bright Empire" },
      { name: "Scout", cr: "1/2", terrain: "desert", faction: "Tribal" },
      { name: "Battlehammer Dwarf", cr: "1/2", terrain: "desert", faction: "Azak-Zil Demihumans" },
      { name: "Dust Mephit", cr: "1/2", terrain: "desert", faction: "Elemental Fire" },
      { name: "Swarm of Beetles", cr: "1/2", terrain: "desert", faction: "Desert Fauna" },
      { name: "Death’s Head", cr: "1/2", terrain: "desert", faction: "Old Sulm" },
      { name: "Engineer", cr: "1/2", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "1/2", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "1/2", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "1/2", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "1/2", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "1/2", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "1/2", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "1/2", terrain: "jungle", faction: "Primordial" }, 
      { name: "Giant Dragonfly", cr: "1/2", terrain: "jungle", faction: "Karast" },  
      { name: "2 Dwarf Guards", cr: "1/2", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "1/2", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "1/2", terrain: "farmland", faction: "Flan and Oerdian" },     
    ],
    "1": [
      { name: "Snow Maiden", cr: "1", terrain: "arctic", faction: "Frostmourne" },
      { name: "Brown Bear", cr: "1", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Harpy", cr: "1", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Dire Wolf", cr: "1", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Walrus", cr: "1", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Bugbear Thug", cr: "1", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Dread Warrior", cr: "1", terrain: "arctic", faction: "Frostmourne" },
      { name: "Duergar", cr: "1", terrain: "arctic", faction: "Calanthian Frozen North" },
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
      { name: "Engineer", cr: "1", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "1", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "1", terrain: "hills", faction: "Tribal" },
      { name: "Swarm of Raven", cr: "1", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "1", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "1", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "1", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "1", terrain: "jungle", faction: "Primordial" }, 
      { name: "Insects  and sweat", cr: "1", terrain: "jungle", faction: "Karast" },   
      { name: "2 Dwarf Guards", cr: "1", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "1", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "1", terrain: "farmland", faction: "Flan and Oerdian" },    
      ],
    "2": [
      { name: "Ghast (gheist)", cr: "2", terrain: "arctic", faction: "Frostmourne" },
      { name: "Bison", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Giant Elk", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Human Berserker", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Human Shaman", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Bandit Captain", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Half-Orc Barbarian", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Polar Bear", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Azer", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "White Dragon Wyrmling", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Purple Wormling", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "White Guard Drake", cr: "2", terrain: "arctic", faction: "Calanthian Frozen North" },    
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
      { name: "Engineer", cr: "2", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "2", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "2", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "2", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "2", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "2", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "2", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "2", terrain: "jungle", faction: "Primordial" }, 
      { name: "Insects  and sweat", cr: "2", terrain: "jungle", faction: "Karast" },  
      { name: "2 Dwarf Guards", cr: "2", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "2", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "2", terrain: "farmland", faction: "Flan and Oerdian" },     
    ],
    "3": [
      { name: "Wight", cr: "3", terrain: "arctic", faction: "Frostmourne" },
      { name: "Human Tribal Leader", cr: "3", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Human Werewolf", cr: "3", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Redcap", cr: "3", terrain: "arctic", faction: "Feyfrost" },
      { name: "Bugbear Chief", cr: "3", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Goblin Warlord", cr: "3", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Hobgoblin Captain", cr: "3", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Outcast Human Warlock", cr: "3", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Siberian Tiger", cr: "3", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Hag of fetid Gaze", cr: "3", terrain: "arctic", faction: "Feyfrost" },
      { name: "Ice Troll", cr: "3", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Werewolf", cr: "3", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Archer", cr: "3", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Winter Wolf", cr: "3", terrain: "arctic", faction: "Indigenous" },
      { name: "Yeti", cr: "3", terrain: "arctic", faction: "Indigenous" },
      { name: "Precognitive Mage", cr: "3", terrain: "arctic", faction: "Sueloise" },
      { name: "Engineer", cr: "3", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "3", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "3", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "3", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "3", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "3", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "3", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "3", terrain: "jungle", faction: "Primordial" }, 
      { name: "Insects  and sweat", cr: "3", terrain: "jungle", faction: "Karast" },   
      { name: "2 Dwarf Guards", cr: "3", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "3", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "3", terrain: "farmland", faction: "Flan and Oerdian" },    
      ],
    "4": [
      { name: "Banshee", cr: "4", terrain: "arctic", faction: "Frostmourne" },
      { name: "Human Weretiger", cr: "4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Duergar Stone Guard", cr: "4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Orc War Chief", cr: "4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Hobgoblin Tribal Chieftain", cr: "4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Ogre Berserker", cr: "4", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Mixed-Blood Sorcerer", cr: "4", terrain: "arctic", faction: "Calanthian Frozen North" },
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
      { name: "Engineer", cr: "4", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "4", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "4", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "4", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "4", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "4", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "4", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "4", terrain: "jungle", faction: "Primordial" }, 
      { name: "Insects  and sweat", cr: "4", terrain: "jungle", faction: "Karast" },   
      { name: "2 Dwarf Guards", cr: "4", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "4", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "4", terrain: "farmland", faction: "Flan and Oerdian" },    
      ],
    "5": [
      { name: "Wraith", cr: "5", terrain: "arctic", faction: "Frostmourne" },
      { name: "Fire Elemental", cr: "5", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Water Elemental", cr: "5", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Young Remorhaz", cr: "5", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Troll Marauder", cr: "5", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Human Werebear", cr: "5", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Human Chieftain", cr: "5", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Harpy Matriarch", cr: "5", terrain: "arctic", faction: "Calanthian Frozen North" },
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
      { name: "Engineer", cr: "5", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "5", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "5", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "5", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "5", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "5", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "5", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "5", terrain: "jungle", faction: "Primordial" }, 
      { name: "Insects  and sweat", cr: "5", terrain: "jungle", faction: "Karast" },
      { name: "2 Dwarf Guards", cr: "5", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "5", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "5", terrain: "farmland", faction: "Flan and Oerdian" },       
      ],
     "6": [
      { name: "Frost Giant Skeleton", cr: "6", terrain: "arctic", faction: "Frostmourne" },
      { name: "Human Warlord", cr: "6", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Annis Hag", cr: "6", terrain: "arctic", faction: "Feyfrost" },
      { name: "Young White Dragon", cr: "6", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Icebound Ettin", cr: "6", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Hobgoblin Warlord", cr: "6", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Cyclops", cr: "6", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "3 Berserkers", cr: "6", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Young White Dragon", cr: "6", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Mammoth", cr: "6", terrain: "arctic", faction: "Indigenous" },
      { name: "Mage", cr: "6", terrain: "arctic", faction: "Sueloise" },
      { name: "Engineer", cr: "6", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "6", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "6", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "6", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "6", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "6", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "6", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "6", terrain: "jungle", faction: "Primordial" }, 
      { name: "Insects  and sweat", cr: "6", terrain: "jungle", faction: "Karast" },
      { name: "2 Dwarf Guards", cr: "6", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "6", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "6", terrain: "farmland", faction: "Flan and Oerdian" },    
      { name: "Galeb Duhr", cr: "6", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Duergar Warlord", cr: "6", terrain: "arctic", faction: "Calanthian Frozen North" },
      { name: "Duergar Xarrorn", cr: "6", terrain: "arctic", faction: "Calanthian Frozen North" },   
      ],
      "7": [
        { name: "Skeletal Knight", cr: "7", terrain: "arctic", faction: "Frostmourne" },
        { name: "Bheur Hag", cr: "7", terrain: "arctic", faction: "Feyfrost" },
        { name: "Stone giant", cr: "7", terrain: "arctic", faction: "Hodir Ordning" },
        { name: "5 Berserkers", cr: "7", terrain: "arctic", faction: "Frost Barbarians" },
        { name: "Druid of the Old Ways", cr: "7", terrain: "arctic", faction: "Snow Barbarians" },
        { name: "Giant White Ape", cr: "7", terrain: "arctic", faction: "Indigenous" },
        { name: "Lorehold Professor of Order", cr: "7", terrain: "arctic", faction: "Sueloise" },
        { name: "Engineer", cr: "7", terrain: "hills", faction: "Kronspire" },
        { name: "Emptiness", cr: "7", terrain: "hills", faction: "Barren" },
        { name: "Dude in a colourful hat", cr: "7", terrain: "hills", faction: "Flan" },
        { name: "Swarm of Raven", cr: "7", terrain: "mountain", faction: "Primal Ordning" },
        { name: "Vista", cr: "7", terrain: "mountain", faction: "Desolate" },
        { name: "Swearing Dwarf", cr: "7", terrain: "mountain", faction: "Dwarven" },
        { name: "Apprentice Wizard", cr: "7", terrain: "jungle", faction: "Sueloise Homeland" },
        { name: "Dinosaur", cr: "7", terrain: "jungle", faction: "Primordial" }, 
        { name: "Insects  and sweat", cr: "7", terrain: "jungle", faction: "Karast" }, 
        { name: "2 Dwarf Guards", cr: "7", terrain: "farmland", faction: "Ulek" },
        { name: "1d3 Bandits", cr: "7", terrain: "farmland", faction: "Borderlands" }, 
        { name: "1d6 Human Commoners", cr: "7", terrain: "farmland", faction: "Flan and Oerdian" },      
        ],     
     "8": [
      { name: "Swordwraith Commander", cr: "8", terrain: "arctic", faction: "Frostmourne" },
      { name: "Astral Elf Aristocrat", cr: "8", terrain: "arctic", faction: "Feyfrost" },
      { name: "Frost Giant", cr: "8", terrain: "arctic", faction: "Hodir Ordning" },
      { name: "Goliath Werebear", cr: "8", terrain: "arctic", faction: "Frost Barbarians" },
      { name: "Occult Silvertongue", cr: "8", terrain: "arctic", faction: "Snow Barbarians" },
      { name: "Ice Troll", cr: "8", terrain: "arctic", faction: "Indigenous" },
      { name: "Sueloise Assassin", cr: "8", terrain: "arctic", faction: "Sueloise" },
      { name: "Engineer", cr: "8", terrain: "hills", faction: "Kronspire" },
      { name: "Emptiness", cr: "8", terrain: "hills", faction: "Barren" },
      { name: "Dude in a colourful hat", cr: "8", terrain: "hills", faction: "Flan" },
      { name: "Swarm of Raven", cr: "8", terrain: "mountain", faction: "Primal Ordning" },
      { name: "Vista", cr: "8", terrain: "mountain", faction: "Desolate" },
      { name: "Swearing Dwarf", cr: "8", terrain: "mountain", faction: "Dwarven" },
      { name: "Apprentice Wizard", cr: "8", terrain: "jungle", faction: "Sueloise Homeland" },
      { name: "Dinosaur", cr: "8", terrain: "jungle", faction: "Primordial" }, 
      { name: "Insects  and sweat", cr: "8", terrain: "jungle", faction: "Karast" }, 
      { name: "2 Dwarf Guards", cr: "8", terrain: "farmland", faction: "Ulek" },
      { name: "1d3 Bandits", cr: "8", terrain: "farmland", faction: "Borderlands" }, 
      { name: "1d6 Human Commoners", cr: "8", terrain: "farmland", faction: "Flan and Oerdian" },      
      ],
      "9": [
        { name: "Frost Giant Zombie", cr: "9", terrain: "arctic", faction: "Frostmourne" },
        { name: "Conclave Dryad", cr: "9", terrain: "arctic", faction: "Feyfrost" },
        { name: "Frost Salamander", cr: "9", terrain: "arctic", faction: "Calanthian Frozen North" },
        { name: "Cloud Giant", cr: "9", terrain: "arctic", faction: "Hodir Ordning" },
        { name: "Fire Giant", cr: "9", terrain: "arctic", faction: "Hodir Ordning" },
        { name: "Warpriest", cr: "9", terrain: "arctic", faction: "Frost Barbarians" },
        { name: "Treant", cr: "9", terrain: "arctic", faction: "Snow Barbarians" },
        { name: "Abominable Yeti", cr: "9", terrain: "arctic", faction: "Indigenous" },
        { name: "Sueloise Evoker Wizard", cr: "9", terrain: "arctic", faction: "Sueloise" },
        { name: "Engineer", cr: "9", terrain: "hills", faction: "Kronspire" },
        { name: "Emptiness", cr: "9", terrain: "hills", faction: "Barren" },
        { name: "Dude in a colourful hat", cr: "9", terrain: "hills", faction: "Flan" },
        { name: "Swarm of Raven", cr: "9", terrain: "mountain", faction: "Primal Ordning" },
        { name: "Vista", cr: "9", terrain: "mountain", faction: "Desolate" },
        { name: "Swearing Dwarf", cr: "9", terrain: "mountain", faction: "Dwarven" },
        { name: "Apprentice Wizard", cr: "9", terrain: "jungle", faction: "Sueloise Homeland" },
        { name: "Dinosaur", cr: "9", terrain: "jungle", faction: "Primordial" }, 
        { name: "Insects  and sweat", cr: "9", terrain: "jungle", faction: "Karast" },
        { name: "2 Dwarf Guards", cr: "9", terrain: "farmland", faction: "Ulek" },
        { name: "1d3 Bandits", cr: "9", terrain: "farmland", faction: "Borderlands" }, 
        { name: "1d6 Human Commoners", cr: "9", terrain: "farmland", faction: "Flan and Oerdian" },       
        ],
        "10": [
          { name: "Lesser Death Dragon", cr: "10", terrain: "arctic", faction: "Frostmourne" },
          { name: "Winter Eldarin", cr: "10", terrain: "arctic", faction: "Feyfrost" },
          { name: "Sunder Shaman", cr: "10", terrain: "arctic", faction: "Hodir Ordning" },
          { name: "Chardalyn Berserker and 6 Beserkers", cr: "10", terrain: "arctic", faction: "Frost Barbarians" },
          { name: "Stone Golem", cr: "10", terrain: "arctic", faction: "Snow Barbarians" },
          { name: "Quaggoth Thonot and 4 Quaggoths", cr: "10", terrain: "arctic", faction: "Indigenous" },
          { name: "Monastic High Curator", cr: "10", terrain: "arctic", faction: "Sueloise" },
          { name: "Engineer", cr: "10", terrain: "hills", faction: "Kronspire" },
          { name: "Emptiness", cr: "10", terrain: "hills", faction: "Barren" },
          { name: "Dude in a colourful hat", cr: "10", terrain: "hills", faction: "Flan" },
          { name: "Swarm of Raven", cr: "10", terrain: "mountain", faction: "Primal Ordning" },
          { name: "Vista", cr: "10", terrain: "mountain", faction: "Desolate" },
          { name: "Swearing Dwarf", cr: "10", terrain: "mountain", faction: "Dwarven" },
          { name: "Apprentice Wizard", cr: "10", terrain: "jungle", faction: "Sueloise Homeland" },
          { name: "Dinosaur", cr: "10", terrain: "jungle", faction: "Primordial" }, 
          { name: "Insects  and sweat", cr: "10", terrain: "jungle", faction: "Karast" },
          { name: "2 Dwarf Guards", cr: "10", terrain: "farmland", faction: "Ulek" },
          { name: "1d3 Bandits", cr: "10", terrain: "farmland", faction: "Borderlands" }, 
          { name: "1d6 Human Commoners", cr: "10", terrain: "farmland", faction: "Flan and Oerdian" },       
          ],
          
          "11": [
          { name: "Blackguard on Nightmare", cr: "11", terrain: "arctic", faction: "Frostmourne" },
          { name: "Adult Remorhaz", cr: "11", terrain: "arctic", faction: "Calanthian Frozen North" },
          { name: "3 Yeth hounds and a Dragon Hunter", cr: "11", terrain: "arctic", faction: "Feyfrost" },
          { name: "Spirit Troll", cr: "11", terrain: "arctic", faction: "Hodir Ordning" },
          { name: "Death Embrace", cr: "11", terrain: "arctic", faction: "Frost Barbarians" },
          { name: "Behir", cr: "11", terrain: "arctic", faction: "Snow Barbarians" },
          { name: "Remorhaz", cr: "11", terrain: "arctic", faction: "Indigenous" },
          { name: "2 Monastic Infiltrators", cr: "11", terrain: "arctic", faction: "Sueloise" },
          { name: "Engineer", cr: "11", terrain: "hills", faction: "Kronspire" },
          { name: "Emptiness", cr: "11", terrain: "hills", faction: "Barren" },
          { name: "Dude in a colourful hat", cr: "11", terrain: "hills", faction: "Flan" },
          { name: "Swarm of Raven", cr: "11", terrain: "mountain", faction: "Primal Ordning" },
          { name: "Vista", cr: "11", terrain: "mountain", faction: "Desolate" },
          { name: "Swearing Dwarf", cr: "11", terrain: "mountain", faction: "Dwarven" },
          { name: "Apprentice Wizard", cr: "11", terrain: "jungle", faction: "Sueloise Homeland" },
          { name: "Dinosaur", cr: "11", terrain: "jungle", faction: "Primordial" }, 
          { name: "Insects  and sweat", cr: "11", terrain: "jungle", faction: "Karast" }, 
          { name: "2 Dwarf Guards", cr: "11", terrain: "farmland", faction: "Ulek" },
          { name: "1d3 Bandits", cr: "11", terrain: "farmland", faction: "Borderlands" }, 
          { name: "1d6 Human Commoners", cr: "11", terrain: "farmland", faction: "Flan and Oerdian" },      
          ],
          
          "12": [
          { name: "Boneclaw", cr: "12", terrain: "arctic", faction: "Frostmourne" },
          { name: "Human Archmage", cr: "12", terrain: "arctic", faction: "Calanthian Frozen North" },
  { name: "Human Archdruid", cr: "12", terrain: "arctic", faction: "Calanthian Frozen North" },
          { name: "Sea Fury", cr: "12", terrain: "arctic", faction: "Feyfrost" },
          { name: "Frost Giant Everlasting One", cr: "12", terrain: "arctic", faction: "Hodir Ordning" },
          { name: "Warlord", cr: "12", terrain: "arctic", faction: "Frost Barbarians" },
          { name: "ArchDruid", cr: "12", terrain: "arctic", faction: "Snow Barbarians" },
          { name: "6 Yeti", cr: "12", terrain: "arctic", faction: "Indigenous" },
          { name: "ArchMage", cr: "12", terrain: "arctic", faction: "Sueloise" },
          { name: "Engineer", cr: "12", terrain: "hills", faction: "Kronspire" },
          { name: "Emptiness", cr: "12", terrain: "hills", faction: "Barren" },
          { name: "Dude in a colourful hat", cr: "12", terrain: "hills", faction: "Flan" },
          { name: "Swarm of Raven", cr: "12", terrain: "mountain", faction: "Primal Ordning" },
          { name: "Vista", cr: "12", terrain: "mountain", faction: "Desolate" },
          { name: "Swearing Dwarf", cr: "12", terrain: "mountain", faction: "Dwarven" },
          { name: "Apprentice Wizard", cr: "12", terrain: "jungle", faction: "Sueloise Homeland" },
          { name: "Dinosaur", cr: "12", terrain: "jungle", faction: "Primordial" }, 
          { name: "Insects  and sweat", cr: "12", terrain: "jungle", faction: "Karast" }, 
          { name: "2 Dwarf Guards", cr: "12", terrain: "farmland", faction: "Ulek" },
          { name: "1d3 Bandits", cr: "12", terrain: "farmland", faction: "Borderlands" }, 
          { name: "1d6 Human Commoners", cr: "12", terrain: "farmland", faction: "Flan and Oerdian" },   

        ],
          
        "13": [
        { name: "Vampire", cr: "13", terrain: "arctic", faction: "Frostmourne" },
        { name: "Adult White Dragon", cr: "13", terrain: "arctic", faction: "Calanthian Frozen North" },
        { name: "Young Purple Worm", cr: "13", terrain: "arctic", faction: "Calanthian Frozen North" },
      


      ],
          
      "14": [
      { name: "Greater Death Dragon", cr: "14", terrain: "arctic", faction: "Frostmourne" },

    ],
          
    "15": [
    { name: "Skull Lord", cr: "15", terrain: "arctic", faction: "Frostmourne" },
    { name: "Frost Purple Worm", cr: "15", terrain: "arctic", faction: "Calanthian Frozen North" },

  ],
          
  "16": [
  { name: "Storm Giant Skeleton", cr: "16", terrain: "arctic", faction: "Frostmourne" },

],
          
"17": [
{ name: "Death Knight", cr: "17", terrain: "arctic", faction: "Frostmourne" },
{ name: "Frost Worm", cr: "17", terrain: "arctic", faction: "Calanthian Frozen North" },

],
"18": [
  { name: "Demilich", cr: "18", terrain: "arctic", faction: "Frostmourne" },
  
],
"19": [
  { name: "Lord Soth", cr: "19", terrain: "arctic", faction: "Frostmourne" },
  
],
"20": [
  { name: "Nightwalker", cr: "20", terrain: "arctic", faction: "Frostmourne" },
  { name: "Ancient White Dragon", cr: "20", terrain: "arctic", faction: "Calanthian Frozen North" },
 ],
   };

   function generateRandomFeature(encounterDistance) {
    const randomFeature = featuresList[Math.floor(Math.random() * featuresList.length)];
    const distanceModifier = Math.random() * 2 - 0.5;
    const distance = encounterDistance * distanceModifier;
  
    const sizeModifier = Math.random() * 1.95 + 0.05;
    let area = encounterDistance * sizeModifier;
    if (randomFeature.areaModifier) {
      area *= randomFeature.areaModifier;
    }
  
    return {
      ...randomFeature,
      distance: Math.round(distance),
      area: Math.round(area),
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
        

  function updateFactions(terrain) {
    const factionsByTerrain = {
      arctic: [
        "Calanthian Frozen North",
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
        "Tribal",
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
      "Flan and Oerdian", //mostly human lands with central figures, majors etc

    ]
    };
  
    setFactions(factionsByTerrain[terrain] || []);
    setSelectedFaction('');
  }
  

  function filterMonstersByTerrainAndFaction(monstersByCR, terrain, faction) {
    const filteredMonstersByCR = {};
  
    for (const cr in monstersByCR) {
      filteredMonstersByCR[cr] = monstersByCR[cr].filter(
        (monster) => monster.terrain === terrain && (monster.faction === faction || Math.random() > 0.1)
      );
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
        // Method 3: Six monsters each worth up to or equal to 1/12 of the xp budget
        const minionBudget = xpBudget / 12;
  
        if (minionBudget > 0) {
          for (let i = 0; i < 6; i++) {
            const cr = findHighestCR(minionBudget, challengeRatingList, filteredMonstersByCR);
            const potentialMonsters = filteredMonstersByCR[cr];
  
            if (potentialMonsters && potentialMonsters.length > 0) {
              const randomIndex = Math.floor(Math.random() * potentialMonsters.length);
              const selectedMonster = potentialMonsters[randomIndex];
              addToEncounter(selectedMonster, cr);
            }
          }
        }
        break;
  
      case 4:
        // Method 4: Fifteen monsters each worth up to or equal to 1/60 of the xp budget
        const swarmBudget = xpBudget / 60;
  
        if (swarmBudget > 0) {
          for (let i = 0; i < 15; i++) {
            const cr = findHighestCR(swarmBudget, challengeRatingList, filteredMonstersByCR);
            const potentialMonsters = filteredMonstersByCR[cr];
  
            if (potentialMonsters && potentialMonsters.length > 0) {
              const randomIndex = Math.floor(Math.random() * potentialMonsters.length);
              const selectedMonster = potentialMonsters[randomIndex];
              addToEncounter(selectedMonster, cr);
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
  
    const adjustedXPBudget = getPartyXPThreshold(partySize, partyLevel, difficultyThresholds, difficulty);
    const generatedEncounter = generateEncounter(adjustedXPBudget, challengeRatingList, filteredMonstersByCR);
  
    setEncounterList(generatedEncounter);
  
    // Set the encounter distance
    setEncounterDistance(generateEncounterDistance(terrain));
    // Set the environmental effects
    setWind(generateWind());
    setPrecipitation(generatePrecipitation());
    setLightLevel(generateLightLevel());
  
    // Generate and set features
    const newFeatures = [
      generateRandomFeature(),
      generateRandomFeature(),
      generateRandomFeature(),
    ];
  
    setGeneratedFeatures(newFeatures);
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
      <h2>Encounter:</h2>
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
          {feature.name} (Distance: {feature.distance} feet, Area: {feature.area} feet)
        </li>
      ))}
    </ul>
    </div>
  );
}




export default App;