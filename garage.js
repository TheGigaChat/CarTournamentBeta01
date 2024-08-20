//sissionDataInit
//sissionDataInit
const player = JSON.parse(sessionStorage.getItem("player"));
const playerItems = player.playerItems;
const playerVehicle = player.playerVehicle;
const playerMoney = JSON.parse(sessionStorage.getItem("player")).money;
const curMoney = JSON.parse(sessionStorage.getItem("player")).money[
  playerMoney.length - 1
];

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
const closePatternLable = () => {
  const patternDivObj = document.querySelectorAll(".pattern");
  const patternDivArr = Object.entries(patternDivObj);
  patternDivArr.map(([key, div]) => {
    div.classList.add("screenOff");
  });
};

//header updates
//header updates

//levelUpdate
const playerLevels = JSON.parse(sessionStorage.getItem("player")).level;
const curLevel = JSON.parse(sessionStorage.getItem("player")).level[
  playerLevels.length - 1
];
const levelDiv = document.querySelector(".yourLevel");
levelDiv.childNodes[1].textContent = curLevel;

//seasonUpdate
const seasons = JSON.parse(sessionStorage.getItem("curSeason"));
const seasonDiv = document.querySelector(".season");
const curSeason = seasons[seasons.length - 1];
seasonDiv.childNodes[1].textContent = curSeason;

//moneyUpdate
updateMoney();

//load your items elements
//load your items elements
const loadYourItems = () => {
  // create a div
  let playerItemsId = 0;
  const showPlayerItems = (content) => {
    const newDiv = document.createElement("div");

    // fill the div with the content
    const newContent = document.createTextNode(content);

    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.classList.add("item", "draggble");
    newDiv.draggable = true;
    newDiv.id = playerItemsId;
    playerItemsId++;

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("parent");
    const parentDiv = document.getElementById("parent").parentNode;
    parentDiv.insertBefore(newDiv, currentDiv);
  };

  // find how many item in the shop
  const howManyItems = playerItems.length;

  // show new items
  if (howManyItems) {
    playerItems.map((item) => {
      showPlayerItems(item);
    });
  } else {
    // zero new items
  }
};

loadYourItems();

//grab items from yourItems to the pattern
//grab items from yourItems to the pattern
const dragAndDrop = () => {
  const draggables = document.querySelectorAll(".draggble");
  const containers = document.querySelectorAll(".container");

  draggables.forEach((draggble) => {
    draggble.addEventListener("dragstart", () => {
      draggble.classList.add("dragging");
    });

    draggble.addEventListener("dragend", () => {
      draggble.classList.remove("dragging");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const draggble = document.querySelector(".dragging");
      const response = filter(container, draggble);
      if (response) {
        container.children[0].classList.add("screenOff");
        container.appendChild(draggble);
      }
    });

    container.addEventListener("dragend", (e) => {
      containers.forEach((zone) => {
        if (zone.children.length === 1) {
          zone.children[0].classList.remove("screenOff");
        }
      });
    });
  });

  const filter = (container, draggble) => {
    const draggingText = draggble.textContent;
    const requiredText = container.children[0];

    //append child to the Your Items Section
    if (
      requiredText.tagName.toLowerCase() === "div" ||
      requiredText.tagName.toLowerCase() == undefined
    ) {
      container.appendChild(draggble);
    }

    /* ----TRY-OF-FILTERING---- */
    /* ----TRY-OF-FILTERING---- */
    if (
      requiredText.tagName.toLowerCase() === "p" &&
      container.children.length <= 1 &&
      requiredText.textContent
    ) {
      // tree

      if (requiredText.textContent === "Motor(standard)") {
        const titleRegEx = /^[a-z]+/gi;
        const typeRegEx = /(?<=type: ).+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        const draggingTypeText = typeRegEx.exec(draggingText)[0];
        if (draggingTitleText === "Motor" && draggingTypeText === "standard") {
          return true;
        }
      }

      if (requiredText.textContent === "Motor(electro)") {
        const titleRegEx = /^[a-z]+/gi;
        const typeRegEx = /(?<=type: ).+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        const draggingTypeText = typeRegEx.exec(draggingText)[0];
        if (draggingTitleText === "Motor" && draggingTypeText === "electro") {
          return true;
        }
      }

      if (requiredText.textContent === "Motor(standard, small)") {
        const titleRegEx = /^[a-z]+/gi;
        const typeRegEx = /(?<=type: ).+/gi;
        const sizeRegEx = /(?<=size: ).+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        const draggingTypeText = typeRegEx.exec(draggingText)[0];
        const draggingSizeText = sizeRegEx.exec(draggingText)[0];
        if (
          draggingTitleText === "Motor" &&
          draggingTypeText === "standard" &&
          draggingSizeText === "small"
        ) {
          return true;
        }
      }

      if (requiredText.textContent === "Motor(electro, small)") {
        const titleRegEx = /^[a-z]+/gi;
        const typeRegEx = /(?<=type: ).+/gi;
        const sizeRegEx = /(?<=size: ).+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        const draggingTypeText = typeRegEx.exec(draggingText)[0];
        const draggingSizeText = sizeRegEx.exec(draggingText)[0];
        if (
          draggingTitleText === "Motor" &&
          draggingTypeText === "electro" &&
          draggingSizeText === "small"
        ) {
          return true;
        }
      }

      if (requiredText.textContent === "Carcass(car)") {
        const titleRegEx = /^[a-z]+/gi;
        const typeRegEx = /(?<=type: ).+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        const draggingTypeText = typeRegEx.exec(draggingText)[0];
        if (draggingTitleText === "Carcass" && draggingTypeText === "car") {
          return true;
        }
      }

      if (requiredText.textContent === "Carcass(motorcycle)") {
        const titleRegEx = /^[a-z]+/gi;
        const typeRegEx = /(?<=type: ).+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        const draggingTypeText = typeRegEx.exec(draggingText)[0];
        if (
          draggingTitleText === "Carcass" &&
          draggingTypeText === "motorcycle"
        ) {
          return true;
        }
      }

      if (
        requiredText.textContent === "Wheels 1(season)" ||
        requiredText.textContent === "Wheels 2(season)"
      ) {
        const titleRegEx = /^[a-z]+/gi;
        const seasonRegEx = /(?<=season: ).+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        const draggingseasonText = seasonRegEx.exec(draggingText)[0];
        if (
          draggingTitleText === "WheelsPair" &&
          draggingseasonText == curSeason
        ) {
          return true;
        }
      }

      if (requiredText.textContent === "Oil filter") {
        const titleRegEx = /^[a-z]+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        if (draggingTitleText === "OilFilter") {
          return true;
        }
      }

      if (requiredText.textContent === "Accumulator") {
        const titleRegEx = /^[a-z]+/gi;
        const draggingTitleText = titleRegEx.exec(draggingText)[0];
        if (draggingTitleText === "Accumulator") {
          return true;
        }
      }
    }
  };
};

//score count
//score count
const scoreCount = (detailsArrObj) => {
  const weight = [];

  const horsePower = () => {
    const regEx = /(?<=horsePower: )\d+/;
    const match = regEx.exec(detailsArrObj[0]);
    return match ? parseInt(match[0]) : null;
  };

  const addAllWeights = () => {
    const regEx = /(?<=weight: )\d+/g;
    Object.entries(detailsArrObj).forEach(([key, value]) => {
      const detailWeights = value.match(regEx);
      if (detailWeights) {
        detailWeights.forEach((weightValue) => {
          weight.push(parseInt(weightValue));
        });
      }
    });
  };

  addAllWeights();

  const scoreFormula = () => {
    return (
      10 * horsePower() -
      weight.reduce((sum, value) => {
        return sum + value;
      }, 0) +
      horsePower()
    );
  };

  return scoreFormula();
};

//open patterns
//open patterns
const openPattern = (key1) => {
  //add screenOff class .pattern's
  closePatternLable();
  let parentSection;
  switch (key1) {
    case "Standard Car":
      parentSection = document.querySelector(".standardCarPattern");
      break;
    case "Electro Car":
      parentSection = document.querySelector(".electroCarPattern");
      break;
    case "Standard Motorcycle":
      parentSection = document.querySelector(".standardMotorcyclePattern");
      break;
    case "Electro Motorcycle":
      parentSection = document.querySelector(".electroMotorcyclePattern");
      break;
    default:
      console.log("Can't find the key.");
  }
  //remove screenOff class .items
  parentSection.classList.remove("screenOff");
  dragAndDrop();

  const openedPattern = document.querySelector(
    ".patternSection:not(.screenOff)"
  );
  const openedContainers = openedPattern.querySelectorAll("div");
  const openedContainersLength = openedContainers.length;
  const carDetailsArr = [];

  //start Mutation Observer For containers
  const mutationObserver = new MutationObserver((entries) => {
    let i = 0;
    openedContainers.forEach((container) => {
      if (container.children[1]) {
        if (container.children[1].tagName.toLowerCase() == "div") {
          i++;
        }
      }
    });
    if (i === openedContainersLength) {
      //take info
      openedContainers.forEach((container) => {
        const detailText = container.children[1].textContent;
        carDetailsArr.push(detailText);
      });

      /* ----UPDATE-SCORE---- */
      /* ----UPDATE-SCORE---- */
      const score = scoreCount(carDetailsArr);
      sessionStorage.setItem("score", JSON.stringify(score));

      //show curScore
      const scoreDiv = document.querySelector(".score");
      scoreDiv.classList.remove("screenOff");
      scoreDiv.textContent = JSON.stringify(score);
    }

    //show back button
    const backButtonDiv = document.querySelector(".back");
    backButtonDiv.classList.remove("screenOff");
    backButtonDiv.addEventListener("click", () => {
      location.reload();
    });
  });
  openedContainers.forEach((container) => {
    mutationObserver.observe(container, { childList: true });
  });
};

//detect click on patterns
//detect click on patterns
const detectClicks = () => {
  const itemsDivArr = document.querySelectorAll(".pattern");
  itemsDivArr.forEach((item) => {
    item.addEventListener("click", () => {
      openPattern(item.textContent);
    });
  });
};

detectClicks();
