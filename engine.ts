// Engine class
class Engine {
  start(): void {
    console.log("Engine started");
  }
}

// Car class tightly coupled with Engine
class Car {
  private engine: Engine = new Engine(); // Car creates its own Engine (tight coupling)

  drive(): void {
    this.engine.start(); // directly using Engine
    console.log("Car is driving");
  }
}

// Main
const car = new Car();
car.drive();
