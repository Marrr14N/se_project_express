const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/constants");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send({ data: item }))
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: e.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      })
    );
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }

      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }

      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }

      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
