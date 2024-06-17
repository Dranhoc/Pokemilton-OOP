const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal:false
});

class PokemiltonWorld {

  constructor(day,logs = []) {

    this.day = day || 0
    this.logs = logs || []
   
  }

  /**
   * Spend a day
   */
  oneDayPasses(){   
    //console.clear() 
    this.day += 1;
    console.log("\nDay " + this.day + " in PokemiltonTown :\n");

  }

   randomizeEvent(objPokeMaster) {
    this.oneDayPasses()

    const rand = Math.floor(Math.random() * (5)) + 1;
    
    switch (rand) {

      case 1:
      case 2:
        console.log("You are strolling through the country paths and suddenly"); // a wild Pokemon appears
        return true;

      case 3:
        console.log("Oh, a POKEBALL in the middle of the forest, what a chance!\n");
        objPokeMaster.POKEBALLS += 1;
        console.log(`${objPokeMaster.name} have now ${objPokeMaster.POKEBALLS} POKEBALLS.\n`);
        break;
        
      case 4:
        console.log("Oh, what a surprise, a healing item in my Fruits Loops ! Incredible !\n");
        objPokeMaster.healingItems += 1;
        console.log(`${objPokeMaster.name} have now ${objPokeMaster.healingItems} Healing Items.\n`);
        break;

      case 5:
        console.log("A Revive Item  ! Incredible !");
        objPokeMaster.reviveItems += 1;
        console.log(`${objPokeMaster.name} have now ${objPokeMaster.reviveItems} Revive Items.\n`);
        break;

      default:
        break;
    }
  }

  addLog(newLog){
    this.logs.push(`Day ${this.day}: ${newLog}`)
  }
}


module.exports = PokemiltonWorld
