const PokemiltonMaster = require('./PokemiltonMaster'); 
const Pokemilton = require('./Pokemilton');
const PokemiltonWorld = require ('./PokemiltonWorld');
const fs = require('fs');









class SaveManager {
 
  static gameSave = null;
  

  static loadSaveFromFile() {
    let fileContent = null;
    const filePath = ('./GameSave.json');
    if (fs.existsSync(filePath)) {
      try {
        
        fileContent = fs.readFileSync(filePath, 'utf8');

      } catch (err) {
        console.error('Error reading file:', err);
      }

      if (fileContent && Object.keys(fileContent).length !== 0) {
        this.gameSave = JSON.parse(fileContent);
      }

    } else {
        console.error('File does not exist:', filePath);
    }

  }

  static saveToFile(objPokeMaster,objPokeWorld) { 

    this.gameSave = {"Saved_on": Date(),"PokeMaster": objPokeMaster,"PokeWorld" : objPokeWorld}
    const data = JSON.stringify(this.gameSave, null, 2);
    fs.writeFileSync('GameSave.json', data);

  }

  static loadSavefromGameSaveVar(){

    let objPokeWorld = new PokemiltonWorld(
      this.gameSave.PokeWorld.day,
      this.gameSave.PokeWorld.logs
     );
    let objPokeMaster = new PokemiltonMaster(
      this.gameSave.PokeMaster.name,
      [],
      this.gameSave.PokeMaster.healingItems,
      this.gameSave.PokeMaster.reviveItems,
      this.gameSave.PokeMaster.POKEBALLS
     );
     this.gameSave.PokeMaster.pokemiltonCollection.forEach(pokemiltonData => {
      let pokemilton = new Pokemilton(
         pokemiltonData.name,
         pokemiltonData.level,
         pokemiltonData.experienceMeter,
         pokemiltonData.attackRange,
         pokemiltonData.defenseRange,
         pokemiltonData.healthPool,
         pokemiltonData.catchPhrase,
         pokemiltonData.health,
         pokemiltonData.alive
      );
      objPokeMaster.addPokemilton(pokemilton);
     });
     //console.log(objPokeMaster.name)
     console.log(objPokeMaster.pokemiltonCollection);
     return {'objPokeMaster': objPokeMaster,'objPokeWorld': objPokeWorld}
  }

}

module.exports = SaveManager;