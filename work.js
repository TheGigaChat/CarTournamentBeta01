//sissionDataInit
//sissionDataInit
const mounthsTimer = JSON.parse(sessionStorage.getItem("mounthsTimer"));
const newShopItemsInitial = JSON.parse(sessionStorage.getItem("newShopItems"));
const shopItemsInitial = JSON.parse(sessionStorage.getItem("shopItems"));
const player = JSON.parse(sessionStorage.getItem("player"));
const playerMoney = parseInt(
  JSON.parse(sessionStorage.getItem("player")).money
);
const newShopItems = [];

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
const goToShop = () => {
  window.location.href = "http://127.0.0.1:5500/shop.html";
};
const updateShopItems = () => {
  const itemsForShop = shopItemsInitial.concat(newShopItemsInitial);
  sessionStorage.setItem("shopItems", JSON.stringify(itemsForShop));
  sessionStorage.setItem("newShopItems", JSON.stringify([]));
};
const updateNewShopItems = (itemsArray) => {
  sessionStorage.setItem("newShopItems", JSON.stringify(itemsArray));
};

//init for motorcycle and car
//init for motorcycle and car
const typeArr = ["electro", "standard"];
const seasonArr = ["summer", "winter"];
const vehicleArr = ["car", "motorcycle"];

//items constructor
//items constructor
class Motor {
  constructor(type, weight, horsePower, size, price) {
    (this.name = "Motor"),
      (this.type = type),
      (this.weight = weight),
      (this.size = size),
      (this.horsePower = horsePower);
    this.price = price;
  }
}

class WheelsPair {
  constructor(weight, season, price) {
    (this.name = "WheelsPair"), (this.season = season), (this.weight = weight);
    this.price = price;
  }
}

class Carcass {
  constructor(weight, type, price) {
    (this.name = "Carcass"), (this.type = type), (this.weight = weight);
    this.price = price;
  }
}

class OilFilter {
  constructor(weight, health, price) {
    (this.name = "OilFilter"), (this.weight = weight), (this.health = health);
    this.price = price;
  }
}

class Accumulator {
  constructor(weight, health, price) {
    (this.name = "Accumulator"), (this.weight = weight), (this.health = health);
    this.price = price;
  }
}

//vehicle constructor
class Vehicle {
  constructor(motor, wheelsPair1) {
    (this.wheelsPair1 = wheelsPair1), (this.motor = motor);
  }
}

class Motorcycle extends Vehicle {
  constructor(carcass) {
    super();
    this.carcass = carcass;
  }
}

class ElectroMotorcycle extends Motorcycle {
  constructor(accumulator, carcass, motor, wheelsPair1) {
    super();
    this.accumulator = accumulator;
    this.carcass = carcass;
    this.motor = motor;
    this.wheelsPair1 = wheelsPair1;
  }
}

class StandardMotorcycle extends Motorcycle {
  constructor(oilFilter, carcass, motor, wheelsPair1) {
    super();
    this.oilFilter = oilFilter;
    this.carcass = carcass;
    this.motor = motor;
    this.wheelsPair1 = wheelsPair1;
  }
}

class Car extends Vehicle {
  constructor(carcass, wheelsPair2) {
    super();
    (this.wheelsPair2 = wheelsPair2), (this.carcass = carcass);
  }
}

class ElectroCar extends Car {
  constructor(accumulator, carcass, motor, wheelsPair1, wheelsPair2) {
    super();
    this.accumulator = accumulator;
    this.carcass = carcass;
    this.motor = motor;
    this.wheelsPair1 = wheelsPair1;
    this.wheelsPair2 = wheelsPair2;
  }
}

class StandardCar extends Car {
  constructor(oilFilter, carcass, motor, wheelsPair1, wheelsPair2) {
    super();
    this.oilFilter = oilFilter;
    this.carcass = carcass;
    this.motor = motor;
    this.wheelsPair1 = wheelsPair1;
    this.wheelsPair2 = wheelsPair2;
  }
}

const createMotor = () => {
  const type = typeArr[onOff()];
  const weight = Math.floor(Math.random() * 170) + 30;
  const horsePowerFunction = () => {
    if (type === "standard") {
      return Math.floor(Math.random() * 150) + 150;
    } else if (type === "electro") {
      return Math.floor(Math.random() * 300) + 200;
    }
  };
  const horsePower = horsePowerFunction();
  const size = () => {
    if (type === "electro") {
      if (horsePower >= 350) {
        return "big";
      } else {
        return "small";
      }
    }

    if (type === "standard") {
      if (horsePower >= 225) {
        return "big";
      } else {
        return "small";
      }
    }
  };
  const motorPrice = () => {
    let sum = 0;
    const maxWeight = 200;
    sum += horsePower * 2;
    type === "electro" ? (sum += 100) : (sum += 50);
    sum += getPriceForWeight(maxWeight, weight, 100, 3);
    return sum;
  };
  return new Motor(type, weight, horsePower, size(), motorPrice());
};

const createWheels = () => {
  const season = seasonArr[onOff()];
  const weight = Math.floor(Math.random() * 80) + 20;
  return new WheelsPair(weight, season, price(100, weight, 80, 3));
};

const createCarcass = () => {
  const vehicle = vehicleArr[onOff()];
  let weight;
  let vehiclePrice;
  if (vehicle === "car") {
    weight = Math.floor(Math.random() * 1300) + 700;
    vehiclePrice = price(2000, weight, 600, 7);
  }
  if (vehicle === "motorcycle") {
    weight = Math.floor(Math.random() * 1000) + 500;
    vehiclePrice = price(1500, weight, 400, 8);
  }
  return new Carcass(weight, vehicle, vehiclePrice);
};

const createOilFilter = () => {
  const weight = Math.floor(Math.random() * 20) + 5;
  const health = Math.floor(Math.random() * 4) + 1;
  const filterPrice = price(25, weight, 10, 3) + health * 5;
  return new OilFilter(weight, health, filterPrice);
};

const createAccumulator = () => {
  const weight = Math.floor(Math.random() * 180) + 20;
  const health = Math.floor(Math.random() * 4) + 1;
  const accumulatorPrice = price(200, weight, 20, 3) + health * 5;
  return new Accumulator(weight, health, accumulatorPrice);
};

const createMotorcycle = () => {
  // init
  const motorcycleMotor = [];
  const motorcycleWheels = [];
  const motorcycleCarcass = [];
  const motorcycleOilFilter = [];
  const motorcycleAccumulator = [];

  //motor
  while (true) {
    const motor = createMotor();
    if (motor.size === "small") {
      motorcycleMotor.push(motor);
      break;
    }
  }

  //wheels
  motorcycleWheels.push(createWheels());

  //carcass
  while (true) {
    const carcass = createCarcass();
    if (carcass.type === "motorcycle") {
      motorcycleCarcass.push(carcass);
      break;
    }
  }

  //oil filter and accumulator
  if (motorcycleMotor[0].type === "standard") {
    motorcycleOilFilter.push(createOilFilter());

    //create Motorcycle
    return new StandardMotorcycle(
      motorcycleOilFilter[0],
      motorcycleCarcass[0],
      motorcycleMotor[0],
      motorcycleWheels[0]
    );
  }
  if (motorcycleMotor[0].type === "electro") {
    motorcycleAccumulator.push(createAccumulator());

    //create Motorcycle
    return new ElectroMotorcycle(
      motorcycleAccumulator[0],
      motorcycleCarcass[0],
      motorcycleMotor[0],
      motorcycleWheels[0]
    );
  }
};

const createCar = () => {
  // init
  const carMotor = [];
  const carWheels = [];
  const carCarcass = [];
  const carOilFilter = [];
  const carAccumulator = [];

  //motor
  carMotor.push(createMotor());

  //wheels
  carWheels.push(createWheels(), createWheels());

  //carcass
  while (true) {
    const carcass = createCarcass();
    if (carcass.type === "car") {
      carCarcass.push(carcass);
      break;
    }
  }

  //oil filter and accumulator
  if (carMotor[0].type === "standard") {
    carOilFilter.push(createOilFilter());

    //create car
    return new StandardCar(
      carOilFilter[0],
      carCarcass[0],
      carMotor[0],
      carWheels[0],
      carWheels[1]
    );
  }
  if (carMotor[0].type === "electro") {
    carAccumulator.push(createAccumulator());

    //create car
    return new ElectroCar(
      carAccumulator[0],
      carCarcass[0],
      carMotor[0],
      carWheels[0],
      carWheels[1]
    );
  }
};

const disassembleMotorcycle = () => {
  const motorcycleForItems = Object.entries(createMotorcycle());
  motorcycleForItems.map(([key, value]) => {
    const i = onOff();
    if (i === 1) {
      newShopItems.push(value);
    }
  });
};

const disassembleCar = () => {
  const carForItems = Object.entries(createCar());
  carForItems.map(([key, value]) => {
    const i = onOff();
    if (i === 1) {
      newShopItems.push(value);
    }
  });
};

//work
const motorcycleHTML = document.querySelector(".motorcycle");
const carHTML = document.querySelector(".car");

const startWork = (vehicle) => {
  if (vehicle === "motorcycle") {
    disassembleMotorcycle();
    //moneyUpdate
    updateSessionObj({ money: [playerMoney, playerMoney + 50] }, "player");
  } else if (vehicle === "car") {
    disassembleCar();
    //moneyUpdate
    updateSessionObj({ money: [playerMoney, playerMoney + 100] }, "player");
  }
  updateNewShopItems(newShopItems);
  goToShop();
};

//timer Update
const timerUpdate = () => {
  sessionStorage.setItem("mounthsTimer", JSON.stringify(mounthsTimer - 1));
};

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
const curMoney = JSON.parse(sessionStorage.getItem("player")).money;
const moneyDiv = document.querySelector(".yourMoney");
moneyDiv.childNodes[1].textContent = curMoney;

//game loop
//game loop

timerUpdate();
updateShopItems();
//work
motorcycleHTML.addEventListener("click", (e) => startWork("motorcycle"));
carHTML.addEventListener("click", (e) => startWork("car"));
