
const students = 
["Sop", "hie",
  "Man", "on",
  "Quen", "tin",
  "Sam", "uel",
  "Jona", "than",
  "Dan", "iel",
  "Cyr", "il",
  "Dam", "ien",
  "Auré", "liane",
  "Den", "is",
  "Emi", "lie",
  "Jér", "ôme",
  "Quen", "tin",
  "Nat", "alya",
  "Auré", "lien",
  "Chris", "tophe",
  "Gil", "les",
  "Cél", "ine",
  "Mari", "lou",
  "Lou", "is",
  "Math", "ilde",
  "Enk", "elan",
  "Ma", "rc",
  "Yas", "mine",
  "Sam", "uel",
  "Thom", "as",
  "Jul", "ien",
  "Greg", "ory",
  "Cyr", "ille",
  "Ken", "ny"
]

class Pokemon {
  constructor(name, level, experienceMeter, attackRange, defenseRange, healthPool, catchPhrase, health, alive) {
    this.name = name || this.generateRandomName();
    this.level = level || 1;
    this.experienceMeter = experienceMeter|| 0;
    this.attackRange = attackRange || this.getRandomNumber(1, 8);
    this.defenseRange = defenseRange || this.getRandomNumber(1, 3);
    this.healthPool = healthPool || this.getRandomNumber(10, 30);
    this.catchPhrase = catchPhrase || this.generateCatchPhrase();
    this.health = health || this.healthPool
    this.alive = alive || true
  }

  generateRandomName() {
    const randomStudent1 = students[Math.floor(Math.random() * students.length)];
    const randomStudent2 = students[Math.floor(Math.random() * students.length)];
    return `${randomStudent1}${randomStudent2}`;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateCatchPhrase() {
    const phrases = ["I choose you!", "Let the battle begin!", "Pokemilton, go!"];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  attack(defender) {
    const damage = this.getRandomNumber(this.attackRange * this.level, this.attackRange) - defender.defenseRange;
    defender.healthPool -= damage;
    console.log(`${this.name} attacked ${defender.name} and dealt ${damage} damage!`);
  }

  gainExperience(opponentLevel) {
    const experienceGain = this.getRandomNumber(1, 5) * opponentLevel;
    this.experienceMeter += experienceGain;
    console.log(`${this.name} gained ${experienceGain} experience points!`);
    if (this.experienceMeter >= this.level * 100) {
      this.evolve();
    }
  }

  evolve() {
    this.level += 1;
    const attackIncrease = this.getRandomNumber(1, 5);
    const defenseIncrease = this.getRandomNumber(1, 5);
    const healthIncrease = this.getRandomNumber(1, 5);

    this.attackRange += attackIncrease;
    this.defenseRange += defenseIncrease;
    this.healthPool += healthIncrease;

    console.log(`${this.name} evolved into a higher level! New stats: Level ${this.level}, Attack Range ${this.attackRange}, Defense Range ${this.defenseRange}, Health Pool ${this.healthPool}`);
  }

  sayCatchPhrase() {
    console.log(`${this.name} says: "${this.catchPhrase}"`);
  }
}

module.exports = Pokemon
