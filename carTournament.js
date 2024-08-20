//sissionDataInit
//sissionDataInit
const player = JSON.parse(sessionStorage.getItem("player"));
const playerItems = player.playerItems;
const playerVehicle = JSON.parse(sessionStorage.getItem("score"));
const playerMoney = JSON.parse(sessionStorage.getItem("player")).money;
const curMoney = JSON.parse(sessionStorage.getItem("player")).money[
  playerMoney.length - 1
];
const mounthsTimer = JSON.parse(sessionStorage.getItem("mounthsTimer"));
const tournamentList = document.querySelector(".tournamentList");
const tournamentTime = document.querySelector(".tournamentTime");
const timeSpan = document.querySelector(".time");
const playerLevels = JSON.parse(sessionStorage.getItem("player")).level;
const seasons = JSON.parse(sessionStorage.getItem("curSeason"));
const players = JSON.parse(sessionStorage.getItem("players"));

//auxilary functions
//auxilary functions
const onOff = () => {
  return Math.floor(Math.random() * 2);
};
const updateSessionObj = (newValueObj, storeName = "player") => {
  let prevData = JSON.parse(sessionStorage.getItem(storeName));
  Object.keys(newValueObj).forEach((val, key) => {
    prevData[val] = newValueObj[val];
  });
  sessionStorage.setItem(storeName, JSON.stringify(prevData));
};
const updateMoney = (
  curMoney = JSON.parse(sessionStorage.getItem("player")).money[
    playerMoney.length - 1
  ]
) => {
  const moneyDiv = document.querySelector(".yourMoney");
  moneyDiv.childNodes[1].textContent = curMoney;
  updateSessionObj({ money: [playerMoney[0], curMoney] }, "player");
};
const updateLevel = (
  curLevel = JSON.parse(sessionStorage.getItem("player")).level[
    playerLevels.length - 1
  ]
) => {
  const levelDiv = document.querySelector(".yourLevel");
  levelDiv.childNodes[1].textContent = curLevel;
  updateSessionObj({ level: [playerLevels[0], curLevel] }, "player");
};
const updateSeason = (curSeason = seasons[seasons.length - 1]) => {
  const seasonDiv = document.querySelector(".season");
  seasonDiv.childNodes[1].textContent = curSeason;
};
const setNewSeason = () => {
  const curSeason = JSON.parse(sessionStorage.getItem("curSeason"))[0];
  if (curSeason == "winter") {
    sessionStorage.setItem("curSeason", JSON.stringify(["summer"]));
  }
  if (curSeason == "summer") {
    sessionStorage.setItem("curSeason", JSON.stringify(["winter"]));
  }
};
const updatePlayers = () => {
  const curLevel = JSON.parse(sessionStorage.getItem("player")).level[
    playerLevels.length - 1
  ];
  let i = 0;

  players.map((player) => {
    players.splice(i, 1, Math.round(player * Math.pow(1 + 0.1, curLevel)));
    i++;
  });
};

//header updates
//header updates

//levelUpdate
updateLevel();

//seasonUpdate
updateSeason();

//moneyUpdate
updateMoney();

/* ----TIME-CHECKER---- */
/* ----TIME-CHECKER---- */

if (mounthsTimer === 0) {
  //tournament has started
  tournamentTime.classList.add("screenOff");
  tournamentList.classList.remove("screenOff");
} else {
  //tournament hasn't started
  tournamentTime.classList.remove("screenOff");
  tournamentList.classList.add("screenOff");

  timeSpan.textContent = mounthsTimer;
}

//add players from sessionStorage
updatePlayers();
players.push(playerVehicle);

// filter the arr by place
const tournamentPlaces = players.sort((a, b) => b - a);

// find the curScore in the arr
const playerPlace = [];
for (let i = 1; i <= tournamentPlaces.length; i++) {
  if (tournamentPlaces[i - 1] === playerVehicle) {
    playerPlace.push(i);
    break;
  }
}

if (mounthsTimer === 0) {
  if (playerPlace[0] === 5) {
    const curLevel = JSON.parse(sessionStorage.getItem("player")).level[
      playerLevels.length - 1
    ];
    if (curLevel !== 1) {
      updateLevel(curLevel - 1);
    }
    updateMoney(curMoney - 250);
  }

  if (playerPlace[0] === 4) {
    const curLevel = JSON.parse(sessionStorage.getItem("player")).level[
      playerLevels.length - 1
    ];
    if (curLevel !== 1) {
      updateLevel(curLevel - 1);
    }
    updateMoney(curMoney - 100);
  }

  if (playerPlace[0] === 3) {
    // change nothing
  }

  if (playerPlace[0] === 2) {
    const curLevel = JSON.parse(sessionStorage.getItem("player")).level[
      playerLevels.length - 1
    ];
    updateLevel(curLevel + 1);
    updateMoney(curMoney + 500);
  }

  if (playerPlace[0] === 1) {
    const curLevel = JSON.parse(sessionStorage.getItem("player")).level[
      playerLevels.length - 1
    ];
    updateLevel(curLevel + 1);
    updateMoney(curMoney + 1000);
  }

  //update season
  setNewSeason();

  //update the DOM
  //update the DOM
  //update the DOM
  const placeDIVs = document.querySelectorAll(".place");
  let placeNum = 1;
  let i = 0;
  placeDIVs.forEach((div) => {
    if (placeNum === playerPlace[0]) {
      div.classList.add("yourPlace");
    }
    div.textContent = `Place #${placeNum}: ${tournamentPlaces[i]}`;
    placeNum++;
    i++;
  });

  //reset
  //reset
  sessionStorage.setItem("mounthsTimer", 6);
  sessionStorage.setItem("shopItems", JSON.stringify([]));
  sessionStorage.setItem("newShopItems", JSON.stringify([]));
}
