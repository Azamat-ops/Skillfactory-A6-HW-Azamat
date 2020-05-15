const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  // надо бы убрать "target" прежде чем искать новый
  $(".game-field").removeClass("target");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  
  //  помечать target текущим номером
  $(divSelector).text(hits + 1);


  

  // тут надо определять при первом клике firstHitTime
  
  if (hits === 1) {
    firstHitTime = getTimestamp();
  } else if (hits === maxHits) {

    endGame();
  }
}

function endGame() {
  // спрятать игровое поле сначала
  $(".game-field").remove();
  $("#button-start").remove();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // убирать текст со старых таргетов. Кажется есть .text?
  $(".game-field").text("");

  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }

  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$("#button-start").click(init);
