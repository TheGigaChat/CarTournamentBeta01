if (
  JSON.parse(sessionStorage.getItem("restartGame")) ||
  JSON.parse(sessionStorage.getItem("restartGame")) === null
) {
  //init session storage
  //init session storage
  sessionStorage.setItem("restartGame", JSON.stringify(false));
  sessionStorage.setItem("mounthsTimer", JSON.stringify(6));
  sessionStorage.setItem("curSeason", JSON.stringify(["summer", "winter"]));
  sessionStorage.setItem("shopItems", JSON.stringify([]));
  sessionStorage.setItem("newShopItems", JSON.stringify([]));
  sessionStorage.setItem("score", JSON.stringify(0));
  sessionStorage.setItem("players", JSON.stringify([850, 720, 590, 425]));
  sessionStorage.setItem(
    "player",
    JSON.stringify({
      level: [1, 1],
      money: [1000, 3000],
      playerItems: [],
      playerVehicle: [],
    })
  );

  //init for motorcycle and car
  //init for motorcycle and car
  sessionStorage.setItem(
    "motorTypeArr",
    JSON.stringify(["electro", "standard"])
  );
  sessionStorage.setItem("seasonArr", JSON.stringify(["summer", "winter"]));
  sessionStorage.setItem(
    "vehicleTypeArr",
    JSON.stringify(["car", "motorcycle"])
  );
}

//auxilary functions
//auxilary functions
const onOff = () => {
  return Math.floor(Math.random() * 2);
};
const getPriceForWeight = (maxWeight, weight, minPrice, degree) => {
  return Math.floor(
    minPrice * Math.pow(Math.log(maxWeight) / Math.log(weight), degree)
  );
};
const price = (maxWeight, weight, minPrice, degree) => {
  let sum = 0;
  sum += getPriceForWeight(maxWeight, weight, minPrice, degree);
  return sum;
};
const updateSessionObj = (newValueObj, storeName) => {
  let prevData = JSON.parse(sessionStorage.getItem(storeName));
  Object.keys(newValueObj).forEach((val, key) => {
    prevData[val] = newValueObj[val];
  });
  sessionStorage.setItem(storeName, JSON.stringify(prevData));
};
const clearSessionObjArr = (stringKey, value, storeName) => {
  const newValueObj = {};
  newValueObj[stringKey] = value;
  updateSessionObj(newValueObj, storeName);
};

//updates
//updates

//shopUpdate
const newShopItems = JSON.parse(sessionStorage.getItem("newShopItems"));
const shopDiv = document.querySelector(".shopLink");
if (newShopItems.length) {
  shopDiv.classList.add("new");
  shopDiv.childNodes[1].classList.remove("screenOff");
} else {
  shopDiv.classList.remove("new");
  shopDiv.childNodes[1].classList.add("screenOff");
}

//garageUpdate
const playerItems = JSON.parse(sessionStorage.getItem("player")).playerItems;
const garageDiv = document.querySelector(".garageLink");
if (playerItems.length) {
  garageDiv.classList.add("new");
  garageDiv.childNodes[1].classList.remove("screenOff");
} else {
  garageDiv.classList.remove("new");
  garageDiv.childNodes[1].classList.add("screenOff");
}

//tournamentUpdate
const mounthsTimer = JSON.parse(sessionStorage.getItem("mounthsTimer"));
const tournamentDiv = document.querySelector(".tournamentLink");
const timerSpan = tournamentDiv.childNodes[1];
const workDiv = document.querySelector(".workLink");
if (mounthsTimer == 0) {
  timerSpan.innerText = `(start)`;
  tournamentDiv.classList.add("alert");
  workDiv.classList.add("blocked");
} else {
  timerSpan.innerText = `(after ${mounthsTimer} mounths)`;
  tournamentDiv.classList.remove("alert");
  workDiv.classList.remove("blocked");
}

//levelUpdate
const player = JSON.parse(sessionStorage.getItem("player")); // for console.log(player)
const playerLevels = JSON.parse(sessionStorage.getItem("player")).level;
const curLevel = JSON.parse(sessionStorage.getItem("player")).level[
  playerLevels.length - 1
];
const levelDiv = document.querySelector(".yourLevel");
levelDiv.childNodes[1].textContent = curLevel;
if (playerLevels.length > 1) {
  //init
  const prevLevel = JSON.parse(sessionStorage.getItem("player")).level[
    playerLevels.length - 2
  ];

  //logic
  if (prevLevel > curLevel) {
    levelDiv.classList.add("alertHeader");
  } else if (prevLevel < curLevel) {
    levelDiv.classList.add("newHeader");
  }

  //clear
  clearSessionObjArr("level", [curLevel], "player");
}

//seasonUpdate
const seasons = JSON.parse(sessionStorage.getItem("curSeason"));
const seasonDiv = document.querySelector(".season");
const curSeason = seasons[seasons.length - 1];
seasonDiv.childNodes[1].textContent = curSeason;
if (seasons.length > 1) {
  //update color
  seasonDiv.classList.add("newHeader");

  //clear
  sessionStorage.setItem("curSeason", JSON.stringify([curSeason]));
}

//moneyUpdate
const playerMoney = JSON.parse(sessionStorage.getItem("player")).money;
const curMoney = JSON.parse(sessionStorage.getItem("player")).money[
  playerMoney.length - 1
];
const moneyDiv = document.querySelector(".yourMoney");
moneyDiv.childNodes[1].textContent = curMoney;
if (playerMoney.length > 1) {
  //init
  const prevMoney = JSON.parse(sessionStorage.getItem("player")).money[
    playerMoney.length - 2
  ];

  //logic
  if (prevMoney > curMoney) {
    moneyDiv.classList.add("alertHeader");
  } else if (prevMoney < curMoney) {
    moneyDiv.classList.add("newHeader");
  }

  //clear
  clearSessionObjArr("money", [curMoney], "player");
}

//remove "new" class by hover
//remove "new" class by hover

levelDiv.addEventListener("mouseover", () => {
  levelDiv.classList.remove("alertHeader");
  levelDiv.classList.remove("newHeader");
});

seasonDiv.addEventListener("mouseover", () => {
  seasonDiv.classList.remove("alertHeader");
  seasonDiv.classList.remove("newHeader");
});

moneyDiv.addEventListener("mouseover", () => {
  moneyDiv.classList.remove("alertHeader");
  moneyDiv.classList.remove("newHeader");
});
