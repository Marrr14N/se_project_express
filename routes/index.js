const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");

const clothingItem = require("./clothingItem");
const userRouter = require("./users");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);
router.get("/items", getItems);

router.use(auth);

router.use("/items", clothingItem);
router.use("/users", userRouter);

module.exports = router;
