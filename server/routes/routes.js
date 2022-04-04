const Router = require("express").Router;
const carsController = require("../controller/carsController");
const router = new Router();

router.get("/getcars", carsController.getCars);
router.post("/setcars", carsController.setCar);
router.post("/updatecar", carsController.updateCar);

module.exports = router;