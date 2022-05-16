const Deck = require("./deck");

module.exports = class Player {
   constructor(id, name, index) {
      this.id = id;
      this.name = name;
      this.index = index;
      this.deck = new Deck();
      this.uno_call = false;
   }
};
