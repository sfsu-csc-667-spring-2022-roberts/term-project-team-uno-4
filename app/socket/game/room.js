const Deck = require("./deck");
const Card = require("./card");

module.exports = class Room {
   constructor(id, name) {
      this.id = id;
      this.name = name;
      this.turn = 0;
      this.players = [];
      this.direction = 1;
      this.player_count = 0;
      this.discard_pile = new Deck();
      this.draw_stack = {
         card_value: 0,
         stack_amt: 0,
         card_type: 2,
      };
      this.status = 0;
   }

   addPlayer(player) {
      this.players.push(player);
      this.player_count = this.players.length;
   }

   checkMyTurn(name) {
      if (name !== undefined) {
         for (let p of this.players) {
            if (p.name === name) {
               if (p.index === this.turn) return true;
            }
         }
      }
      return false;
   }

   getPlayers() {
      let players = [];
      for (let player of this.players) {
         let data = {
            id: player.id,
            name: player.name,
         };
         players.push(data);
      }
      return players;
   }

   removePlayer(name) {
      for (let i = 0; i < this.players.length; i++) {
         if (this.players[i].name == name) {
            this.players.splice(i, 1);
            this.player_count = this.players.length;
            return true;
         }
      }
      return false;
   }

   playerExists(name) {
      for (let p of this.players) {
         if (p.name == name) {
            return true;
         }
      }
      return false;
   }

   playerIsAdmin(name) {
      if (this.players[0] && this.players[0].name == name) {
         return true;
      }
      return false;
   }

   getPlayerData(name) {
      let player;
      for (let p of this.players) {
         if (p.name === name) {
            let data = {
               id: p.id,
               name: p.name,
               index: p.index,
               cards: p.deck.cards,
               cards_amt: p.deck.cards_amt,
            };
            player = data;
         }
      }
      return player;
   }

   getOtherPlayerData(name) {
      let players = [];
      for (let p of this.players) {
         if (p.name !== name) {
            let data = {
               id: p.id,
               name: p.name,
               index: p.index,
               cards_amt: p.deck.cards_amt,
            };
            players.push(data);
         }
      }
      return players;
   }

   rotatePlayers() {
      this.turn = this.turn + this.direction;

      if (this.turn == this.players.length) {
         this.turn = 0;
      } else if (this.turn < 0) {
         this.turn = this.players.length - 1;
      }
   }

   discardCard(card) {
      this.discard_pile.addCard(card);
      if (this.discard_pile.cards.length > 5) this.discard_pile.removeCard(0);
   }

   drawACard() {
      if (this.draw_stack.stack_amt != 0) {
         let draw_times = this.draw_stack.card_type * this.draw_stack.stack_amt;
         for (let i = 0; i < draw_times; i++) {
            this.players[this.turn].deck.drawCard();
         }
         this.players[this.turn].uno_call = false;
         this.draw_stack.stack_amt = 0;
         this.rotatePlayers();
         return true;
      } else if (this.forcePlay()) {
         return false;
      } else {
         this.players[this.turn].deck.drawCard();
         this.players[this.turn].uno_call = false;
         return true;
      }
   }

   forcePlay() {
      for (let i = 0; i < this.players[this.turn].deck.cards.length; i++) {
         if (this.players[this.turn].deck.isValid(this, i)) return true;
      }
      return false;
   }

   callUno() {
      if (this.players[this.turn].deck.cards_amt < 20) {
         if (this.players[this.turn].deck.cards_amt > 2) {
            this.players[this.turn].deck.drawCard();
            this.players[this.turn].deck.drawCard();
            this.players[this.turn].uno_call = false;
         } else {
            this.players[this.turn].uno_call = true;
         }
      }
   }

   selectPlayfieldCard() {
      let colorArray = ["Red", "Green", "Blue", "Yellow"];
      let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      let randValue = Math.floor(Math.random() * 10);
      let tempCard = new Card(randColor, randValue);
      this.discardCard(tempCard);
   }
};
