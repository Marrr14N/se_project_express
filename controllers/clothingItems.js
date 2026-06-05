const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/constants");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => res.status(201).send({ data: item }))
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: e.message,
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error occurred on the server.",
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error occurred on the server.",
      });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid item ID",
        });
      }

      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Item not found",
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error occurred on the server.",
      });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid item ID",
        });
      }

      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Item not found",
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error occurred on the server.",
      });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
