
class PokemiltonMaster {
  constructor(name, pokemiltonCollection = [], healingItems, reviveItems, POKEBALLS) {
    this.name = name;
    this.pokemiltonCollection = pokemiltonCollection || [];
    this.healingItems = healingItems || 5; 
    this.reviveItems = reviveItems || 3; 
    this.POKEBALLS = POKEBALLS || 10; 
  }


  addPokemilton(pokemilton) {
    this.pokemiltonCollection.push(pokemilton);
 }


  async renamePokemilton(pokeNumber,newName) {

    let Oldname = this.pokemiltonCollection[pokeNumber-1].name;
    this.pokemiltonCollection[pokeNumber-1].name = newName;
    return console.log(`${Oldname} was renamed to ${this.pokemiltonCollection[pokeNumber-1].name}. ${this.pokemiltonCollection[pokeNumber-1].catchPhrase}`);

  }



  healPokemilton(pokeNumber) {

    if(this.healingItems <= 0){
      return console.log(`Healing items : ${this.healingItems} left.`);
    }
    else{
      if (this.pokemiltonCollection[pokeNumber-1].alive === true){
        this.healingItems -=1
        this.pokemiltonCollection[pokeNumber-1].health = this.pokemiltonCollection[pokeNumber-1].healthPool;
        return console.log(`${this.pokemiltonCollection[pokeNumber-1].name} HP are now ${this.pokemiltonCollection[pokeNumber-1].health}/${this.pokemiltonCollection[pokeNumber-1].healthPool}. ${this.pokemiltonCollection[pokeNumber-1].catchPhrase}`);
      }
      else{
        return console.log(`This Pokemilton is dead, you have to revived it before healing.`)
      }
    }
  }

  revivePokemilton(pokeNumber) {

  if(this.pokemiltonCollection[pokeNumber-1].alive === false){

    if(this.reviveItems <= 0){

      return console.log(`Revive items : ${this.reviveItems} left.`);

    }
    else{

      this.reviveItems -= 1;
      this.pokemiltonCollection[pokeNumber-1].health = (this.pokemiltonCollection[pokeNumber-1].healthPool)/2;
      this.pokemiltonCollection[pokeNumber-1].alive = true;
      return console.log(`${this.pokemiltonCollection[pokeNumber-1].name} HP are now ${this.pokemiltonCollection[pokeNumber-1].health}/${this.pokemiltonCollection[pokeNumber-1].healthPool}. ${this.pokemiltonCollection[pokeNumber-1].catchPhrase}`);

    }
  }
  else{//alive === true

    return console.log("This Pokemilton is alive, you can't revive it");
    
  }

}

  releasePokemilton(pokeNumber) {

    let name = this.pokemiltonCollection[pokeNumber-1].name;
    this.pokemiltonCollection.splice(pokeNumber-1,1);
    console.log(`${name} has been released.`);
    return this.showCollection();
    
  }

  showCollection() {

    console.log("\nYour Pokemilton collection : ");
    console.log("------------------------------");
    const Pokemiltons = this.pokemiltonCollection;
    for (let i=0;i<Pokemiltons.length;i++)
    console.log(`${i+1}.${Pokemiltons[i].name} : level ${Pokemiltons[i].level} - health ${Pokemiltons[i].health}/${Pokemiltons[i].healthPool} - Attack-Defense : ${Pokemiltons[i].attackRange} - ${Pokemiltons[i].defenseRange}`);
  }
}

module.exports = PokemiltonMaster
