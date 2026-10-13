const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../errors/bad-request-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new ConflictError("A user with this email already exists.")
        );
      }

      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Incorrect email or password"));
      }

      return next(err);
    });
};

const getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID."));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found."));
      }

      return next(err);
    });

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError(err.message));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found."));
      }

      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
