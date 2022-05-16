function Deck(divId, hidden) {
   this.cards = [];
   this.amtCards = 0;
   this.hand = document.getElementById(divId);
   this.isHidden = hidden;

   this.addCards = function (cards) {
      this.cards = cards;
      this.amtCards = this.cards.length;
   };

   this.getCard = function (card) {
      return this.cards[card];
   };

   this.setAmtCards = function (amount) {
      this.amtCards = amount;
   };

   this.drawCard = function () {
      if (this.forcePlay()) {
         let audio = new Audio("/audio/error.mp3");
         audio.play();
      } else {
         drawACard();
      }
   };

   this.forcePlay = function () {
      for (let i = 0; i < this.cards.length; i++) {
         if (this.isValid(i)) return true;
      }
      return false;
   };

   this.playCard = function (card) {
      if (this.isValid(card)) {
         let card_playing = this.cards[card];
         switch (card_playing.value) {
            case 13:
            case 14:
               cardWild(card);
               break;
            default:
               playACard(card);
         }
      } else {
         this.cardInvalid(card);
         return false;
      }
      return true;
   };

   this.isValid = function (card) {
      if (this.cards[card] !== undefined) {
         let card_color = this.cards[card].color;
         let card_number = this.cards[card].value;

         if (game_data.draw_stack.stack_amt != 0) {
            if (card_number != game_data.draw_stack.card_value || (card_number == 1 && card_color != "Special")) {
               return false;
            } else {
               return true;
            }
         }
         if (
            card_number == discard_pile.cards[discard_pile.cards.length - 1].value ||
            card_color == discard_pile.cards[discard_pile.cards.length - 1].color ||
            card_color == "Special"
         ) {
            return true;
         }
      }
      return false;
   };

   this.cardInvalid = function (card) {
      let audio = new Audio("/audio/error.mp3");
      audio.play();
      this.hand.childNodes[card].classList.add("invalid");
      setTimeout(
         function () {
            this.hand.childNodes[card].classList.remove("invalid");
         }.bind(this),
         500
      );
   };

   this.reloadHand = function () {
      this.hand.innerHTML = "";
      for (let i = 0; i < this.amtCards; i++) {
         let cardDiv = document.createElement("div");
         this.hand.append(cardDiv);
         cardDiv.classList.add("gcard");

         if (!this.isHidden) {
            addImageToCard(cardDiv, this.getCard(i).value, this.getCard(i).color);

            if (this.hand.id != "discardDeckDiv") {
               cardDiv.classList.add("my-card");
            }

            if (this.hand.id == "discardDeckDiv") {
               if (i == discard_pile.cards.length - 1) {
                  if (cardDiv.classList.contains("wild") || cardDiv.classList.contains("plus-4")) {
                     cardDiv.classList.add("chosen-wild-card-color");
                  }
               }
            }
         } else {
            cardDiv.append();
            addImageToBackOfCard(cardDiv);
         }
      }
   };
}
