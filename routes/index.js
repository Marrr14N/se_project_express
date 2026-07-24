const router = require("express").Router();

const auth = require("../middlewares/auth");

const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");

const clothingItem = require("./clothingItem");
const userRouter = require("./users");

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems);

router.use(auth);

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
