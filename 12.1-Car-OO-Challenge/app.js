//Part 1
class Vehicle {
  constructor(make, model, year) {
    if(!Number.isInteger(year) || year < 1900 ) {
      throw new Error("Enter a valid year!");
    }
    this.make = make;
    this.model = model;
    this.year = year;
  }

  honk() {
    return "Beep.";
  }

  toString() {
    const {make, model, year} = this;
    return `The vehicle is a ${make} ${model} from ${year}.`
  }
}

//Part 2
class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  } 
}

//Part 3
class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }

  revEngine() {
    return "VROOM!!";
  }
}

//Part 4
class Garage {
  constructor(num) {
    this.capacity = num;
    this.vehicles = [];
  }

  add(vehicle) {
    const {capacity, vehicles} = this;
    if (!(vehicle instanceof Vehicle)) {
      return "Only vehicles are allowed in here!"
    }
    if (vehicle instanceof Vehicle && vehicles.length < capacity) {
      vehicles.push(vehicle);
      return "Vehicle added!"
    } else {
      return "Sorry, we're full.";
    }
  }
}

