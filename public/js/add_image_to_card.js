function getCard(value, color, special) {
   let val;
   switch (color) {
      case "Red":
         val = special ? value + 8 : value;
         break;
      case "Blue":
         val = special ? value + 10 : value + 25;
         break;
      case "Green":
         val = special ? value + 12 : value + 50;
         break;
      case "Yellow":
         val = special ? value + 14 : value + 75;
         break;
      default:
         val = value;
   }

   let card = document.createElement("img");
   card.src = "../img/cards/card_" + val + ".png";
   return card;
}

function addImageToCard(cardDiv, cardValue, cardColor) {
   let card;
   switch (cardValue) {
      case 10:
         card = getCard(20, cardColor, false);
         cardDiv.append(card);
         break;
      case 11:
         card = getCard(21, cardColor, false);
         cardDiv.append(card);
         break;
      case 12:
         card = getCard(22, cardColor, false);
         cardDiv.append(card);
         break;
      case 13:
         card = getCard(101, cardColor, true);
         break;
      case 14:
         card = getCard(102, cardColor, true);
         break;
      default:
         card = getCard(cardValue + 1, cardColor, false);
   }
   cardDiv.append(card);
}

function addImageToBackOfCard(cardDiv) {
   let card = document.createElement("img");
   card.src = "../img/cards/card_deck.png";
   cardDiv.append(card);
}
