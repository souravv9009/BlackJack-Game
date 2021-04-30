const imageObj = {
  1: {
    value: 10,
    url: "imges/cards/all/a.png",
  },
  2: {
    value: 2,
    url: "imges/cards/all/2.png",
  },
  3: {
    value: 3,
    url: "imges/cards/all/3.png",
  },
  4: {
    value: 4,
    url: "imges/cards/all/4.png",
  },
  5: {
    value: 5,
    url: "imges/cards/all/5.png",
  },
  6: {
    value: 6,
    url: "imges/cards/all/6.png",
  },
  7: {
    value: 7,
    url: "imges/cards/all/7.png",
  },
  8: {
    value: 8,
    url: "imges/cards/all/8.png",
  },
  9: {
    value: 9,
    url: "imges/cards/all/9.png",
  },
  10: {
    value: 10,
    url: "imges/cards/all/10.png",
  },
  11: {
    value: 10,
    url: "imges/cards/all/k.png",
  },
  12: {
    value: 10,
    url: "imges/cards/all/q.png",
  },
  13: {
    value: 10,
    url: "imges/cards/all/j.png",
  },
};

var myScore = 0;
var dealerScore = 0;
var allWins = 0;
var allLoss = 0;
var allTie = 0;

var aww = new Audio("music/aww.mp3");
var cash = new Audio("music/cash.mp3");
var swish = new Audio("music/swish.wav");

const randomImg = () => {
  const random = Math.floor(1 + Math.random() * 12);
  const img = imageObj[random];
  const imgValue = img.value;
  yourScoreUpdate(imgValue);
  return img;
};

function yourScoreUpdate(score) {
  var newValue = myScore + score;
  myScore = newValue;
  if (myScore > 21) {
    messageBox.textContent = "You Busted!!!";
    hitBtn.setAttribute("disabled", "true");
    standBtn.setAttribute("disabled", "true");
    hitBtn.style.backgroundColor = "grey";
    standBtn.style.backgroundColor = "grey";
    aww.play();
    allLoss++;
    loss.textContent = allLoss;
  }
  return myScore;
}

function botScoreUpdate(score) {
  var newValue = dealerScore + score;
  dealerScore = newValue;
  if (dealerScore > 21) {
    messageBox.textContent = "Dealer Busted!!!";
    hitBtn.setAttribute("disabled", "true");
    standBtn.setAttribute("disabled", "true");
    hitBtn.style.backgroundColor = "grey";
    standBtn.style.backgroundColor = "grey";
    cash.play();
    allWins++;
    win.textContent = allWins;
  }

  return dealerScore;
}

function botPlay() {
  const getRandom = Math.floor(1 + Math.random() * 11);
  const botImg = imageObj[getRandom];

  const botimgValue = botImg.value;

  botScoreUpdate(botimgValue);
  const botCard = document.createElement("img");
  botCard.src = `${botImg.url}`;
  botBox.appendChild(botCard);
  botScoreBox.textContent = dealerScore;
}

function youPlay() {
  var imgFunc = randomImg();
  const imgEle = document.createElement("img");
  imgEle.setAttribute("class", "card-img");
  imgEle.src = `${imgFunc.url}`;
  //yourScore.textContent = yourScoreUpdate();
  yourScore.textContent = `${myScore}`;
  yourBox.appendChild(imgEle);
  swish.play();
}

const hitBtn = document.querySelector(".hit");
const yourBox = document.querySelector(".your-card-box");
hitBtn.addEventListener("click", youPlay);

function result() {
  if (myScore === dealerScore) {
    messageBox.textContent = "its a tie !!!";
    allTie++;
    tie.textContent = allTie;
  } else if (myScore < dealerScore && dealerScore <= 21) {
    messageBox.textContent = "Dealer Won";
    aww.play();
    allLoss++;
    loss.textContent = allLoss;
  } else if (myScore > dealerScore) {
    messageBox.textContent = "You Won!!!";
    cash.play();
    allWins++;
    win.textContent = allWins;
  }
}

const botBox = document.querySelector(".bot-card-box");

const yourScore = document.querySelector(".you");
const botScoreBox = document.querySelector(".dealer");

const messageBox = document.querySelector(".playmsg");
const dealBtn = document.querySelector(".deal");
dealBtn.addEventListener("click", () => {
  const removeImg = Array.from(document.querySelectorAll("img"));
  for (var img of removeImg) {
    img.remove();
  }
  myScore = 0;
  dealerScore = 0;
  messageBox.textContent = "Let's play";
  botScoreBox.textContent = 0;
  yourScore.textContent = 0;
  hitBtn.removeAttribute("disabled");
  standBtn.removeAttribute("disabled");
  hitBtn.style.backgroundColor = "black";
  standBtn.style.backgroundColor = "black";
  hitBtn.style.color = "white";
  standBtn.style.color = "white";
});
const standBtn = document.querySelector(".stand");
standBtn.addEventListener("click", () => {
  botPlay();
  botPlay();
  botPlay();
  hitBtn.setAttribute("disabled", "true");
  standBtn.setAttribute("disabled", "true");
  result();
});

const win = document.querySelector(".win");
const loss = document.querySelector(".loss");
const tie = document.querySelector(".tie");
