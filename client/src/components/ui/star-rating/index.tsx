import React from "react";
import StarRatings from "react-star-ratings";

interface StarRatingProps {
  className?: string;
  size?: "lg" | "sm";
  color?: string;
  numberOfStars?: number;
  rating: number;
  onChange?: (newStarRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = (props) => {
  const {
    className = "",
    size,
    color = "darkgoldenrod",
    numberOfStars = 5,
    rating,
    onChange,
  } = props;

  let starRatingProps = {};
  if (onChange) {
    // star rating is editable
    starRatingProps = {
      changeRating: onChange,
      starHoverColor: "gold",
    };
  }

  const getStarDimension = (): string => {
    switch (size) {
      case "sm":
        return "15px";
      default:
        return "35px";
    }
  };

  const getStarSpacing = (): string => {
    switch (size) {
      case "sm":
        return "0px";
      default:
        return "5px";
    }
  };

  return (
    <StarRatings
      {...starRatingProps}
      className={className}
      rating={rating}
      starRatedColor={color}
      numberOfStars={numberOfStars}
      name="star-rating"
      starDimension={getStarDimension()}
      starSpacing={getStarSpacing()}
    />
  );
};

export default StarRating;
