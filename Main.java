interface IVehicle {
    void start();
}

class Car implements IVehicle {
    public void start() {
        System.out.println("Car is starting");
    }
}

class Bike implements IVehicle {
    public void start() {
        System.out.println("Bike is starting");
    }
}

class Driver {
    IVehicle vehicle;

    Driver(IVehicle vehicle) {
        this.vehicle = vehicle;
    }

    void drive() {
        vehicle.start();
        System.out.println("Driving...");
    }
}

public class Main {
    public static void main(String[] args) {
        Driver d1 = new Driver(new Car());
        d1.drive();

        Driver d2 = new Driver(new Bike());
        d2.drive();
    }
}
