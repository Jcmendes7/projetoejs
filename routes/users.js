var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
/* GET users listing. */
// router.get("/", UserController.getUser);
router.get("/cadastrar", UserController.viewsForm);
router.post("/cadastrar", UserController.registerUser);
router.get("/login", UserController.getLoginForm);
router.post("/login", UserController.userLogin);
router.get("/usuario", UserController.getUsers);

module.exports = router;
