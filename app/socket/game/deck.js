const Card = require("./card");

module.exports = class Deck {
   constructor() {
      this.cards = [];
      this.cards_amt = 0;
   }

   addCard = function (card) {
      this.cards.push(card);
      this.cards_amt = this.cards.length;
   };

   getCard = function (index) {
      return this.cards[index];
   };

   removeCard = function (index) {
      this.cards.splice(index, 1);
      this.cards_amt = this.cards.length;
   };

   drawCard = function () {
      let colorArray = ["Red", "Green", "Blue", "Yellow", "Special"];
      let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      let randValue = Math.floor(Math.random() * 13);
      if (randColor == "Special") {
         let randNum = Math.round(Math.random() * 2 + 1);
         if (randNum == 1 || randNum == 2) {
            randValue = randValue % 2;
            if (randValue == 0) {
               randValue = 13;
            } else {
               randValue = 14;
            }
         } else {
            randColor = colorArray[Math.floor(Math.random() * (colorArray.length - 1))];
            randValue = Math.floor(Math.random() * 13);
         }
      }
      let tempCard = new Card(randColor, randValue);
      this.addCard(tempCard);
      return true;
   };

   playCard = function (room, index, color) {
      if (this.isValid(room, index)) {
         if (room.players[room.turn].deck.cards_amt == 2 && room.players[room.turn].uno_call != true) {
            room.players[room.turn].deck.drawCard();
            room.players[room.turn].deck.drawCard();
            room.players[room.turn].uno_call = false;
         }

         let card = this.cards[index];

         switch (card.value) {
            case 10:
               this.cardDraw2(room);
               break;
            case 11:
               this.cardReverse(room);
               break;
            case 12:
               this.cardSkip(room);
               break;
            case 13:
               card.color = color;
               break;
            case 14:
               card.color = color;
               this.cardDraw4(room);
               break;
         }

         room.discardCard(card);

         this.removeCard(index);

         if (this.cards.length == 0) {
            console.log(room.players[room.turn].name + " wins!");
            return true;
         }
      } else {
         return false;
      }

      room.rotatePlayers();
      return false;
   };

   cardSkip(room) {
      room.rotatePlayers();
   }

   cardReverse(room) {
      if (room.players.length == 2) {
         room.rotatePlayers();
      } else {
         room.direction = -1 * room.direction;
      }
   }

   cardDraw2(room) {
      room.draw_stack.stack_amt++;
      room.draw_stack.card_type = 2;
      room.draw_stack.card_value = 10;
   }

   cardDraw4(room) {
      room.draw_stack.stack_amt++;
      room.draw_stack.card_type = 4;
      room.draw_stack.card_value = 1;
   }

   isValid = function (room, index) {
      let card_color = this.cards[index].color;
      let card_number = this.cards[index].value;

      if (room.draw_stack.stack_amt != 0) {
         if (card_number != room.draw_stack.card_value || (card_number == 1 && card_color != "Special")) {
            return false;
         } else {
            return true;
         }
      }

      if (
         card_number == room.discard_pile.cards[room.discard_pile.cards.length - 1].value ||
         card_color == room.discard_pile.cards[room.discard_pile.cards.length - 1].color ||
         card_color == "Special"
      ) {
         return true;
      } else {
         return false;
      }
   };
};
