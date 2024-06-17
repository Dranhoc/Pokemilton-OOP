const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


class PokemiltonArena {
  constructor(ownPoke, enemyPoke,routineDay, objPokeMaster,objPokeWorld) {

    this.ownPoke = ownPoke;
    this.enemyPoke = enemyPoke;
    this.objPokeMaster = objPokeMaster;
    this.objPokeWorld = objPokeWorld;
    this.round = 0;
    this.catchPoke = false;
    this.routineDay = routineDay;

  }

 

  async startRound() {
    this.round%2 === 0 ?  await this.playerAction() : this.enemyPokemiltonAction(); 
  }



  async playerAction() {
    return new Promise((resolve,reject) => {
      rl.question(
`Choose an action (1-3):
1. Attack
2. Try to catch
3. Run away\n>`,  (choicePlayer) =>{
        switch (choicePlayer){

          case "1":
            this.attack(this.ownPoke,this.enemyPoke);
            break;

          case "2":
            this.tryToCatch();
            break;

          case "3":
            console.log(`You ran away little coward`);
            this.objPokeWorld.oneDayPasses();
            this.routineDay();
            break;

          default :
            console.error("Choose between (1-3)");
            this.startRound();

        }
        
      });
    });
  }

  attack(attackPoke, defendPoke) {

    console.log(`${attackPoke.name} attacks ${defendPoke.name}.`);
    const damage = this.calculateDamage(attackPoke,defendPoke);
    defendPoke.health -= damage;
    if (defendPoke.health < 0 ) {
      defendPoke.health = 0
    }

    if (this.checkBattleStatus() === false) {
      this.endBattle();
    } else {
        console.log(`${attackPoke.name} inflict ${damage} damage to ${defendPoke.name}, it has now ${defendPoke.health}/${defendPoke.healthPool} HP.\n `);
        this.startNewRound();
    }
  }

  tryToCatch() {

    const randomNumber = parseInt(this.enemyPoke.healthPool/this.enemyPoke.health);
    const rand = Math.floor(Math.random() * (randomNumber)) + 1;

    //If the EnemyPoke is less than 1/3 healthpool, 1/2 chance to catch him
    if (rand <= 3) {

      const catchRandom = Math.floor(Math.random() * (2)) + 1;

      if (catchRandom === 1) {
        this.objPokeMaster.pokemiltonCollection.push(this.enemyPoke);
        this.catchPoke = true;
        this.objPokeMaster.POKEBALLS --;
        this.endBattle();

      } else {
        this.objPokeMaster.POKEBALLS --;
        console.log(`\n${this.objPokeMaster.name} launch A POKEBALL : ${this.enemyPoke.name} ate your PokeBall, ${this.objPokeMaster.POKEBALLS} left\n`);
        this.startNewRound();
      }

    } else {
      this.objPokeMaster.POKEBALLS --;
      console.log(`\n${this.objPokeMaster.name} launch A POKEBALL :${this.enemyPoke.name} ate your PokeBall, ${this.objPokeMaster.POKEBALLS} left\n`);
      this.startNewRound();
    }
    
  }


  calculateDamage(attackPoke, defensePoke) {

    const attackRand = Math.floor(Math.random() * (attackPoke.attackRange*attackPoke.level)) + 1;
    const defenseRand = Math.floor(Math.random() * (defensePoke.defenseRange*defensePoke.level)) + 1;
    return attackRand - defenseRand <= 0 ? 0 : attackRand - defenseRand;

  }

  enemyPokemiltonAction() { 
    this.attack(this.enemyPoke, this.ownPoke); 
  }

  checkBattleStatus() {

    if (this.ownPoke.health === 0) {
      this.ownPoke.alive = false;
      return false;

    } else if (this.enemyPoke.health === 0) {
      this.enemyPoke.alive = false;
      return false;

    } else {
      return true;
    } 

  }

  async startNewRound() {
 
    this.round +=1;
    console.log(`--- Round ${this.round} ---`);
    this.startRound();
    
  }

  async endBattle() {

    if (this.catchPoke === true) {
      this.ownPoke.gainExperience(this.enemyPoke.level);
      this.objPokeWorld.addLog(`${this.enemyPoke.name} has been catched and added to your collection! ${this.enemyPoke.catchPhrase}`)
      console.log(`\nYou catch ${this.enemyPoke.name}!`);

    } else if(this.ownPoke.alive === false) {
      this.objPokeWorld.addLog(`${this.ownPoke.name} is dead, beaten by ${this.enemyPoke.name}`)
      console.log(`\n${this.ownPoke.name} lost the fight, he's dead now.`);

    } else if(this.enemyPoke.alive === false) {
      this.ownPoke.gainExperience(this.enemyPoke.level);
      this.objPokeWorld.addLog(`${this.ownPoke.name} won the fight against ${this.enemyPoke.name}`)
      console.log(`\n${this.ownPoke.name} won the fight, congratulations !`);
    } 
    

    await waitForEnter();
    this.objPokeWorld.oneDayPasses()
    await this.routineDay(this.objPokeMaster,this.objPokeWorld);
  }
}

  async function waitForEnter() {
    return new Promise((resolve) => {
      rl.question(
          `Press enter to continue`,  (input) =>{
            resolve();
          });
    });
  }
module.exports = PokemiltonArena