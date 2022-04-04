const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CarService = require("../service/CarService");

class carsController {
  async getCars(req, res, next) {
    try {
      const cars = await prisma.cars.findMany({
        include: {
          features: true,
        },
      });
      res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async setCar(req, res, next) {
    try {
      const carsToSet = req.body;
      const cars = await CarService.setCar(carsToSet);
      res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async updateCar(req, res, next) {
    try {
      const carsToSet = req.body;
      const cars = await CarService.updateCar(carsToSet);
      res.json(cars);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new carsController();
