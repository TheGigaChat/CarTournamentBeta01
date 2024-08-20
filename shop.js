//sissionDataInit
//sissionDataInit
const newShopItems = JSON.parse(sessionStorage.getItem("newShopItems"));
const shopItems = JSON.parse(sessionStorage.getItem("shopItems"));
const player = JSON.parse(sessionStorage.getItem("player"));
const playerItems = player.playerItems;
const playerMoney = JSON.parse(sessionStorage.getItem("player")).money;
const curMoney = JSON.parse(sessionStorage.getItem("player")).money[
  playerMoney.length - 1
];

//auxilary functions
//auxilary functions
const onOff = () => {
  return Math.floor(Math.random() * 2);
};
const notEnoughAlert = () => {
  const newP = document.createElement("p");
  const newContent = document.createTextNode("Not enough money!");
  newP.appendChild(newContent);
  newP.classList.add("temporaryAlert");
  const currentDiv = document.getElementById("alertPlace");
  const parentDiv = document.getElementById("alertPlace").parentNode;
  parentDiv.insertBefore(newP, currentDiv);
};
const updateSessionObj = (newValueObj, storeName = "player") => {
  let prevData = JSON.parse(sessionStorage.getItem(storeName));
  Object.keys(newValueObj).forEach((val, key) => {
    prevData[val] = newValueObj[val];
  });
  sessionStorage.setItem(storeName, JSON.stringify(prevData));
};
const updateShopItems = () => {
  const itemsForShop = shopItemsInitial.concat(newShopItemsInitial);
  sessionStorage.setItem("shopItems", JSON.stringify(itemsForShop));
  sessionStorage.setItem("newShopItems", JSON.stringify([]));
};
const updateNewShopItems = (itemsArray) => {
  sessionStorage.setItem("newShopItems", JSON.stringify(itemsArray));
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

// sell items
// sell items
if (shopItems) {
  let iterator = 0;
  shopItems.map((item) => {
    const i = onOff();
    if (i === 1) {
      shopItems.splice(iterator, 1);
    }
    iterator++;
  });
}

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

//create Itmes In the shop
//create Itmes In the shop
const lookAtTheShop = () => {
  // create a div
  const addNewItemsToTheShop = (content, id) => {
    const newDiv = document.createElement("div");

    // fill the div with the content
    const newContent = document.createTextNode(content);

    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.classList.add("item");
    newDiv.setAttribute("ID", JSON.stringify(`${id}`));

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("newItemSection");
    const parentDiv = document.getElementById("newItemSection").parentNode;
    parentDiv.insertBefore(newDiv, currentDiv);
  };

  const addShopItemsToTheShop = (content, id) => {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(content);
    newDiv.appendChild(newContent);
    newDiv.classList.add("item");
    newDiv.setAttribute("ID", JSON.stringify(`${id}`));

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("shopItemSection");
    const parentDiv = document.getElementById("shopItemSection").parentNode;
    parentDiv.insertBefore(newDiv, currentDiv);
  };

  // find how many item in the shop
  const howManyNewItems = newShopItems.length;

  // show new items
  if (howManyNewItems) {
    let id = 0;
    newShopItems.map((item) => {
      const listOfItemProps = Object.entries(item);
      const itemName = listOfItemProps[0][1];
      let divText = `${itemName}\n`;
      listOfItemProps.map(([key, value]) => {
        if (key != "name") {
          divText += `${key}: ${value}\n`;
        }
      });
      addNewItemsToTheShop(divText, id);
      id++;
    });
  } else {
    // zero new items
  }

  // show shop items
  if (shopItems.length) {
    let id = 0;
    shopItems.map((item) => {
      const listOfItemProps = Object.entries(item);
      const itemName = listOfItemProps[0][1];
      let divText = `${itemName}\n`;
      listOfItemProps.map(([key, value]) => {
        if (key != "name") {
          divText += `${key}: ${value}\n`;
        }
      });
      addShopItemsToTheShop(divText, id);
      id++;
    });
  }
};

lookAtTheShop();

//buy shopItems
//buy shopItems
const buyItem = (item, parentSection, id) => {
  // check the money and give the Alert if money not enough
  const regEx = /(?<=price: )\d+/g;
  const itemPrice = regEx.exec(item.textContent)[0];
  const curMoney = JSON.parse(sessionStorage.getItem("player")).money[
    playerMoney.length - 1
  ];
  if (curMoney < itemPrice) {
    notEnoughAlert();
  } else {
    //buy
    //save the item to the player.items arr
    playerItems.push(item.textContent);
    updateSessionObj({ playerItems: playerItems }, "player");
    //count money
    updateMoney(curMoney - itemPrice);
    if (parentSection.className === "newItems") {
      //find item(div).price
      const itemPriceNum = parseInt(itemPrice);
      //find arr.item.price
      newShopItems.map((item) => {
        if (itemPriceNum === item.price) {
          //find arr index(indexOf) comparing price's
          const index = newShopItems.indexOf(item);
          //delete the item from array(newShopItems)
          newShopItems.splice(index, 1);
          sessionStorage.setItem("newShopItems", JSON.stringify(newShopItems));
        }
      });
      //delete the item(div)
      item.remove();
    }
    if (parentSection.className === "shopItems") {
      //find item(div).price
      const itemPriceNum = parseInt(itemPrice);
      //find arr.item.price
      shopItems.map((item) => {
        if (itemPriceNum === item.price) {
          //find arr index(indexOf) comparing price's
          const index = shopItems.indexOf(item);
          //delete the item from array(shopItems)
          shopItems.splice(index, 1);
          sessionStorage.setItem("shopItems", JSON.stringify(shopItems));
        }
      });
      //delete the item(div)
      item.remove();
    }
  }
};

//detect the click event on items
const detectClicks = () => {
  const itemsDivArr = document.querySelectorAll(".item");
  itemsDivArr.forEach((item) => {
    const parentSection = item.parentElement;
    if (parentSection.className === "newItems") {
      const id = item.id;
      item.addEventListener("click", () => {
        buyItem(item, parentSection, id);
      });
    } else if (parentSection.className === "shopItems") {
      const id = item.id;
      item.addEventListener("click", () => {
        buyItem(item, parentSection, id);
      });
    }
  });
};

detectClicks();
