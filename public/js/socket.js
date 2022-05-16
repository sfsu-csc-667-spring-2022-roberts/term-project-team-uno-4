var players_list = document.getElementById("players_list");
var leavebtn = document.getElementById("leavebtn");
var startbtn = document.getElementById("startbtn");
var playing_field = document.getElementById("playing_field");
var waiting_field = document.getElementById("waiting_field");

socket.emit("connect room", roomid, (data) => {
   if (data.status == false) {
      alert(res.message);
      window.location.href = endpoint;
   } else {
      socket.emit("join game", (data) => {
         console.log(data);
         game_data = data;
         if (data.draw_stack.stack_amt == 0) {
            drawStack.clearVisual();
         } else {
            drawStack.updateVisual(data.draw_stack.card_type, data.draw_stack.stack_amt);
         }
         initGame(data);
         if (data.status == 1) {
            playing_field.style.display = "block";
            waiting_field.style.display = "none";
            if (startbtn) {
               startbtn.style.display = "none";
            } else {
               leavebtn.style.display = "none";
            }
         }
      });
   }
});

function leaveRoom() {
   socket.emit("leave room", roomid, (data) => {
      if (data.status == true) {
         window.location.href = endpoint;
      }
   });
}

socket.on("update lobby list", function (data) {
   players_list.innerHTML = "";
   data.players.forEach((player) => {
      let list = document.createElement("li");
      list.classList.add("list-group-item", "d-flex", "justify-content-between");
      list.innerHTML = `<span> ${player.name} </span>`;
      players_list.appendChild(list);
   });
   if (startbtn) {
      if (data.players.length > 1) {
         startbtn.disabled = false;
      } else {
         startbtn.disabled = true;
      }
   }
});

socket.on("game started", () => {
   socket.emit("join game", (data) => {
      console.log(data);
      game_data = data;
      if (data.draw_stack.stack_amt == 0) {
         drawStack.clearVisual();
      } else {
         drawStack.updateVisual(data.draw_stack.card_type, data.draw_stack.stack_amt);
      }
      initGame(data);

      playing_field.style.display = "block";
      waiting_field.style.display = "none";
      if (startbtn) {
         startbtn.style.display = "none";
      } else {
         leavebtn.style.display = "none";
      }
   });
});

socket.on("refresh data request", () => {
   socket.emit("refresh data request", (data) => {
      console.log(data);
      game_data = data;
      if (data.draw_stack.stack_amt == 0) {
         drawStack.clearVisual();
      } else {
         drawStack.updateVisual(data.draw_stack.card_type, data.draw_stack.stack_amt);
      }
      updateGame(data);
   });
});

socket.on("end game", (data) => {
   if (data.status == true) {
      alert(data.message);
      window.location.href = endpoint;
   }
});

function startGame() {
   socket.emit("start game");
}

$(document).ready(function () {
   $(document).on("click", ".my-card", function () {
      let card_index = $(".my-card").index(this);
      if (checkMyTurn()) {
         players[game_data.turn].deck.playCard(card_index);
      }
   });
});

function drawCard() {
   if (checkMyTurn()) {
      players[game_data.turn].deck.drawCard();
   }
}

function callUno() {
   if (checkMyTurn()) {
      socket.emit("call uno");
   }
}

function drawACard() {
   socket.emit("draw card");
}

function playACard(index, color = null) {
   socket.emit("play card", { index: index, color: color });
}

function checkMyTurn() {
   if (game_data.turn == game_data.player.index) {
      return true;
   } else {
      let audio = new Audio("/audio/error.mp3");
      audio.play();
      return false;
   }
}

function cardWild(index) {
   playing_index = index;
   document.getElementById("chose_color").style.display = "block";
   return true;
}

function selectWildColor(color) {
   if (playing_index !== undefined && color !== undefined) {
      playACard(playing_index, color);
      document.getElementById("chose_color").style.display = "none";
      playing_index = undefined;
   }
}

var chatform = document.getElementById("chatform");
var chatinput = document.getElementById("chatinput");
var messages = document.getElementById("messages");

chatform.addEventListener("submit", function (e) {
   e.preventDefault();
   if (chatinput.value) {
      socket.emit("room chat", chatinput.value);
      chatinput.value = "";
   }
});

socket.on("room chat", function (msg) {
   var message = document.createElement("li");
   message.innerHTML = `<span style="width:25px;height:25px;"><img style="width:25px;height:25px;" src="/img/avatar/default-image.png"
									alt="#" /></span>
							<span class="ml-2">${msg}</span>`;
   message.classList.add("list-group-item");
   messages.appendChild(message);
   messages.scrollTo(0, document.body.scrollHeight);
});
