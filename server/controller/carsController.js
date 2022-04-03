const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class carsController {
  async getCars(req, res, next) {
    try {
      const cars = await prisma.cars.findMany();
      res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async setCar(req, res, next) {
    try {
      const carsToSet = req.body;
      const cars = await prisma.cars.create({
        data: {
          ...carsToSet,
        },
      });
      res.json(cars);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new carsController();
