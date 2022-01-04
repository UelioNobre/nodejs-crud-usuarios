var express = require("express");
var router = express.Router();

const userController = require("../controllers/users");

router.get("/:userId", userController.doGet);
router.post("/", userController.doPost);
router.put("/:userId", userController.doUpdate);
router.delete("/:userId", userController.doDelete);

module.exports = router;
