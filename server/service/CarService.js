const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CarService {
  async setCar(data) {
    if (Object.keys(data).includes("nestedItems")) {
      const newDataModel = {
        ...data,
        features: {
          create: data.nestedItems,
        },
      };
      delete newDataModel.nestedItems;
      return await prisma.cars.create({
        data: {
          ...newDataModel,
        },
      });
    }

    return await prisma.cars.create({
      data: {
        ...data,
      },
    });
  }

  async updateCar(data) {
    const car = await prisma.cars.findFirst({
      where: {
        id: data.id,
      },
    });

    if (Object.keys(data).includes("nestedItems")) {
      await prisma.cars.update({
        where: {
          id: car.id,
        },
        data: {
          features: {
            deleteMany: {},
          },
        },
      });
      const newDataModel = {
        ...data,
        features: {
          create: data.nestedItems,
        },
      };
      delete newDataModel.nestedItems;
      await prisma.cars.update({
        where: {
          id: car.id,
        },
        data: {
          ...newDataModel,
        },
      });
      delete newDataModel.features;
      return await prisma.cars.update({
        where: {
          id: car.id,
        },
        data: {
          ...newDataModel,
        },
      });
    }
    await prisma.cars.update({
      where: {
        id: car.id,
      },
      data: {
        exchangeName: null,
        priceRange: null,
      },
    });

    await prisma.cars.update({
      where: {
        id: car.id,
      },
      data: {
        features: {
          deleteMany: {},
        },
      },
    });

    return await prisma.cars.update({
      where: {
        id: car.id,
      },
      data: {
        ...data,
      },
    });
  }
}

module.exports = new CarService();
