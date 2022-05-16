let game_data;
let discard_pile = new Deck("discardDeckDiv", false);
let players = [];
let playing_index;

let drawStack = {
   updateVisual: function (card_type, stack_amt) {
      document.getElementById("drawCardPile").innerHTML = "+" + card_type * stack_amt;
   },
   clearVisual: function () {
      document.getElementById("drawCardPile").innerHTML = "";
   },
};

function initGame(data) {
   initializeWindow(data);
   initializePlayer(data);
   initializePlayers(data);
   highlightPlayerTurn(data.turn);
}

function updateGame(data) {
   getPlayfieldCards(data.discard_pile.cards);
   discard_pile.reloadHand();

   players[data.player.index].deck.addCards(data.player.cards);
   players[data.player.index].deck.reloadHand();
   for (let i = 0; i < data.players.length; i++) {
      players[data.players[i].index].deck.setAmtCards(data.players[i].cards_amt);
      players[data.players[i].index].deck.reloadHand();
   }
   highlightPlayerTurn(data.turn);
}

function initializeWindow(data) {
   getPlayfieldCards(data.discard_pile.cards);
   discard_pile.reloadHand();
}

function getPlayfieldCards(cards) {
   let tempCards = [];
   for (let card of cards) {
      let tempCard = new Card(card.color, card.value);
      tempCards.push(tempCard);
   }
   discard_pile.addCards(tempCards);
}

function initializePlayer(data) {
   let playerHandDiv = "BottomSeat";
   let playerHandLabel = playerHandDiv + "ID";

   let tempDeck = new Deck(playerHandDiv, false);

   document.getElementById(playerHandLabel).innerHTML = "<h3> You </h3>";

   let tempPlayer = new Player(data.player.id, data.player.name, tempDeck, data.player.index);

   players[data.player.index] = tempPlayer;
   players[data.player.index].deck.addCards(data.player.cards);
   players[data.player.index].deck.reloadHand();
}

function initializePlayers(data) {
   let seats = ["BottomSeat", "LeftSeat", "TopSeat", "RightSeat"];
   if (data.player_count == 2) {
      let playerHandDiv = "TopSeat";
      let playerHandLabel = playerHandDiv + "ID";

      let tempDeck = new Deck(playerHandDiv, true);

      document.getElementById(playerHandLabel).innerHTML = "<h3>" + data.players[0].name + "</h3>";

      let tempPlayer = new Player(data.players[0].id, data.players[0].name, tempDeck, data.players[0].index);
      players[data.players[0].index] = tempPlayer;
      players[data.players[0].index].deck.setAmtCards(data.players[0].cards_amt);
      players[data.players[0].index].deck.reloadHand();
   } else {
      for (let i = 0; i < data.players.length; i++) {
         let pindex = data.players[i].index - data.player.index;
         console.log(pindex);
         let playerHandDiv;
         if (pindex > 0) {
            playerHandDiv = seats[pindex];
         } else {
            playerHandDiv = seats[data.player_count + pindex];
         }
         let playerHandLabel = playerHandDiv + "ID";
         let tempDeck = new Deck(playerHandDiv, true);
         document.getElementById(playerHandLabel).innerHTML = "<h3>" + data.players[i].name + "</h3>";

         let tempPlayer = new Player(data.players[i].id, data.players[i].name, tempDeck, data.players[i].index);
         players[data.players[i].index] = tempPlayer;
         players[data.players[i].index].deck.setAmtCards(data.players[i].cards_amt);
         players[data.players[i].index].deck.reloadHand();
      }
   }
}

function highlightPlayerTurn(turn) {
   for (let i = 0; i < players.length; i++) {
      document.getElementById(players[i].deck.hand.id + "ID").childNodes[0].classList.remove("active-player");
   }
   document.getElementById(players[turn].deck.hand.id + "ID").childNodes[0].classList.add("active-player");
}
