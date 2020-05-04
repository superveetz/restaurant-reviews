import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  reply: replySchema,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.pre("save", async (review) => {
  console.log("---- before save review --------", review);
});

reviewSchema.post("save", (review) => {
  console.log("--- after save review ----", review);
  mongoose
    .model("Restaurant")
    .addReviewToRestaurant(review.restaurantId, review._id, review.starRating);
});

reviewSchema.post("deleteOne", { document: true, query: false }, (review) => {
  console.log("---- after delete review ---- ", review);

  mongoose
    .model("Restaurant")
    .removeReviewFromRestaurant(review.restaurantId, review._id);
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
