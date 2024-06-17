
const PokemiltonMaster = require('./PokemiltonMaster'); // Replace 'your_classes_filename' with the actual filename
const Pokemilton = require('./Pokemilton');
const PokemiltonWorld = require('./PokemiltonWorld');
const PokemiltonArena = require('./PokemiltonArena');
const readline = require('readline');
const SaveManager = require('./SaveManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});



async function waitForEnter() {
  return new Promise((resolve) => {
    rl.question(
        `Press enter to continue`,  (input) =>{
          resolve();
        });
  });
}



function askForName() {

  return new Promise((resolve, reject) => {
    rl.question("Welcome to Pokemilton. What's your name Pokemilton Master ? \n>", (username) => {
      
      if (username.trim()) {
        console.log(`Hello ${username}, welcome to the jungle`);
        resolve(username);

      } else {
        console.error('No name entered');
        reject(new Error('No name entered'));
      }

    });
  });
}



let reroll = 0
async function proposeFirstPokemilton(objPokeMaster) {

  const pokemiltonChoice = [];

  for (let i = 1; i <= 3; i++) {
     let Poke = new Pokemilton();
     pokemiltonChoice.push(Poke);
     console.log(`${i}. ${Poke.name} - Level : ${Poke.level} - Attack : ${Poke.attackRange} - Defense : ${Poke.defenseRange} - Health : ${Poke.healthPool}`);
  }
  return new Promise((resolve, reject) => {
  rl.question("Choose your Pokemilton (press 1-3), to reroll press anything else.(3 attempts max)\n>",  (choice) => {
    
    if (choice >= "1" && choice <= "3") {

       objPokeMaster.pokemiltonCollection.push(pokemiltonChoice[choice - 1]);
       //console.log(objPokeMaster.pokemiltonCollection)
       resolve (console.log(`${objPokeMaster.name} received ${pokemiltonChoice[choice - 1].name}!`))
       
     } else {

       reroll++ 
       if (reroll < 4) {
          console.clear()
          console.log(`Reroll remaining : ${reroll}/3. Plz press (1-3):`)
          resolve(proposeFirstPokemilton(objPokeMaster));
          

        } else {
          rl.close()
          console.log("Too much attempts, goodbye cheater")
        }

     }
  });
  });
 }



async function wildPokemiltonAppears(objPokeMaster,objPokeWorld){
  
  const wildPoke = new Pokemilton();
  
  rl.question(`A wild Pokemilton,${wildPoke.name} lvl ${wildPoke.level} appears, it has ${wildPoke.health} HP! Watchougonadou?
1. Run
2. Fight \n>`, async (answer) => {

    if (answer === '1') {
      console.log("You ran and it's sad.\n"); 
      await routineDay(objPokeMaster,objPokeWorld)

    } else if (answer === '2') {
      objPokeMaster.showCollection()
      rl.question(`Choose your Pokemilton (1-${objPokeMaster.pokemiltonCollection.length}): `, async (choice)=>{
        const ownPoke = objPokeMaster.pokemiltonCollection[choice - 1];
        let objPokeArena = new PokemiltonArena(ownPoke,wildPoke,routineDay,objPokeMaster,objPokeWorld);
        console.log(`\n${objPokeMaster.name} sends out ${ownPoke.name} to fight versus ${wildPoke.name}, ${ownPoke.catchPhrase}\n`);
        await objPokeArena.playerAction();     
        
      })
    }  
  })
} 




/**
 * 
 * @param {PokemiltonMaster} objPokeMaster 
 * @param {PokemiltonWorld} objPokeWorld 
 */
async function routineDay(objPokeMaster,objPokeWorld) {

  console.log("\nDay " + objPokeWorld.day + " in PokemiltonTown :\n");
  rl.question(`What do you want to do today?
1. Heal Pokemilton
2. Revive Pokemilton
3. Release Pokemilton
4. Rename Pokemilton
5. Do nothing
6. Leave the game and save
Choose an option (1-5): `, async (choice) => {
  switch(choice){

    case "1":
      objPokeMaster.showCollection();
      rl.question(`Which Pokemilton do you want to heal?\n>`, async (pokeNumber) =>{
        objPokeMaster.healPokemilton(pokeNumber);
        await waitForEnter();
        await routineDay(objPokeMaster,objPokeWorld);
      })
      break;

    case "2":
      objPokeMaster.showCollection();
      rl.question(`Which Pokemilton do you want to revive?\n>`, async (pokeNumber) =>{
        objPokeMaster.revivePokemilton(pokeNumber);
        await waitForEnter();
        await routineDay(objPokeMaster,objPokeWorld);
      });
      break;

    case "3":
      objPokeMaster.showCollection();
      rl.question(`Which Pokemilton do you want to release?\n>`, async (pokeNumber) =>{
        objPokeMaster.releasePokemilton(pokeNumber);
        await waitForEnter();
        await routineDay(objPokeMaster,objPokeWorld);
      });
      break;

    case "4":
      objPokeMaster.showCollection();
      rl.question(`Which Pokemilton do you want to rename?\n>`, async (pokeNumber) =>{
        if (pokeNumber) {
          rl.question(`And what's his new name\n>`, async (newName)=>{
            await objPokeMaster.renamePokemilton(pokeNumber,newName);
            await waitForEnter();
            await routineDay(objPokeMaster,objPokeWorld);
          });
       }       
      });
      break;

    case "5":
      
      if (objPokeWorld.randomizeEvent(objPokeMaster) === true){
      await wildPokemiltonAppears(objPokeMaster,objPokeWorld);
      }
      await routineDay(objPokeMaster,objPokeWorld);
      break;

    case "6": 
      SaveManager.saveToFile(objPokeMaster,objPokeWorld);
      rl.close();
      break;

    default:
      await routineDay(objPokeMaster,objPokeWorld);
      break;
  } 
})
}



async function initGame(){

  // check for gamesave => load or new game ------- TODO
  SaveManager.loadSaveFromFile();
  //console.log(GameSave)
  if (SaveManager.gameSave) {
   
    rl.question(`Save file found. Whatchougonnado ?
    1. Load game.
    2. Start a new game.\n>`,async (saveAnswer)=>{
      if(saveAnswer === '1'){

        let MasterWorld = SaveManager.loadSavefromGameSaveVar();
        await waitForEnter();
        await routineDay(MasterWorld.objPokeMaster,MasterWorld.objPokeWorld);
        
      } else {
        return startNewGame();
      }
    })

  } else {
    return startNewGame();
  }

}



async function startNewGame(){

  let objPokeWorld = new PokemiltonWorld();
  let username = await askForName(); 
  let objPokeMaster = new PokemiltonMaster(username); 
  await proposeFirstPokemilton(objPokeMaster); //send it to initGame()
  objPokeWorld.addLog(`${objPokeMaster.pokemiltonCollection[0].name} has been added to your collection.`);
  await waitForEnter();

// routineDay loop to choose in PokeMaster options or go to the wild and fight.
  await routineDay(objPokeMaster,objPokeWorld);

}


initGame();