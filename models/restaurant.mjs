import mongoose from "mongoose";

import { sumReducer } from "../util/reducers/index.mjs";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  provState: {
    type: String,
    required: true,
  },
  postalZip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

restaurantSchema.pre("remove", (next) => {});

restaurantSchema.pre("save", async (something) => {
  console.log("---- before save restaurant --- ", something);
});

restaurantSchema.post("save", async (something) => {
  console.log("----- after save restaurant --- ", something);
});

restaurantSchema.statics.removeReviewFromRestaurant = async (
  restaurantId,
  reviewId
) => {
  const restaurant = await mongoose
    .model("Restaurant")
    .findById(restaurantId)
    .populate("reviews");

  // calculate new average rating
  const { reviews = [] } = restaurant;
  const reviewsFiltered = reviews.filter((review) => review._id !== reviewId);
  const reviewsSum = reviewsFiltered
    .map((review) => review.starRating)
    .reduce(sumReducer, 0);

  const newCount = reviews.length;
  const newAverageRating = newCount === 0 ? 0 : reviewsSum / newCount;

  return mongoose.model("Restaurant").updateOne(
    { _id: restaurantId },
    {
      $pull: { reviews: reviewId },
      $set: {
        averageRating: newAverageRating,
      },
    }
  );
};

restaurantSchema.statics.addReviewToRestaurant = async (
  restaurantId,
  reviewId,
  reviewStarRating
) => {
  const restaurant = await mongoose
    .model("Restaurant")
    .findById(restaurantId)
    .populate("reviews");

  // calculate new average rating
  const { averageRating = 0, reviews = [] } = restaurant;
  const reviewsSum = averageRating * reviews.length;
  const newTally = reviewsSum + reviewStarRating;
  const newCount = reviews.length + 1;
  const newAverageRating = newTally / newCount;

  return mongoose.model("Restaurant").updateOne(
    { _id: restaurantId },
    {
      $push: { reviews: reviewId },
      $set: {
        averageRating: newAverageRating,
      },
    },
    { new: true }
  );
};

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
