const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

const { validateProfileBody } = require("../middlewares/validation");

router.get("/me", getCurrentUser);

router.patch("/me", validateProfileBody, updateProfile);

module.exports = router;
