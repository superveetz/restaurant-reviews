import express from "express";

// src
import { extractUserIdFromAuthHeader } from "../util/index.mjs";
import models from "../models/index.mjs";
import checkAuth from "../middleware/check-auth.mjs";
import grantAccess from "../middleware/grant-access.mjs";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await models.Restaurant.find()
      .populate("reviews")
      .exec();
    res.json({ restaurants });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/restaurant/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await models.Restaurant.findById(restaurantId).populate({
      path: "reviews",
      populate: { path: "authorId" },
    });

    res.json({ restaurant });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post(
  "/restaurant",
  checkAuth,
  grantAccess("createOwn", "Restaurant"),
  async (req, res, next) => {
    const { authorization } = req.headers;
    const { name, street, city, provState, postalZip, country } = req.body;
    const userId = extractUserIdFromAuthHeader(authorization);
    try {
      const restaurant = await models.Restaurant.create({
        name,
        street,
        city,
        provState,
        postalZip,
        country,
        owner: userId,
      });
      const ownerUser = await models.User.updateRole(
        authorization,
        "restaurantOwner"
      );

      res.json({ restaurant });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

export default router;
