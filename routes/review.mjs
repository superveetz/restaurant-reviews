import express from "express";

// src
import models from "../models/index.mjs";
import checkAuth from "../middleware/check-auth.mjs";

const router = express.Router();

router.get("/reviews", checkAuth, async (req, res) => {
  try {
    const reviews = await models.Review.find().exec();
    res.json({ reviews });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/review/:reviewId", checkAuth, async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await models.Review.findById({
      id: reviewId,
    });
    res.json({ review });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/review", checkAuth, async (req, res) => {
  const { comment, starRating, restaurantId, authorId } = req.body;
  try {
    const review = await models.Review.create({
      comment,
      starRating,
      restaurantId,
      authorId,
    });
    res.json(review);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/review/:reviewId", checkAuth, async (req, res) => {
  const { reviewId } = req.params;

  try {
    const toDelete = await models.Review.findById(reviewId);
    if (!toDelete) return res.status(404).json({ message: "Not Found" });
    const deletedReview = await toDelete.deleteOne();

    res.json(deletedReview);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/review/:reviewId/reply", checkAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { text } = req.body;

  try {
    const review = await models.Review.updateOne({
      id: reviewId,
      reply: {
        text,
      },
    });
    console.log("review: ", review);

    res.json(review);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/review/:reviewId/reply", checkAuth, async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await models.Review.updateOne({
      id: reviewId,
      reply: null,
    });
    console.log("review: ", review);

    res.json(review);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
