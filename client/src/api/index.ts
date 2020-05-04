import axiosClient from "./axios";
import { UserModel } from "models/User";
import { RestaurantModel } from "models/Restaurant";
import { ReviewModel } from "models/Review";
// User ----------------------------------------------------------------------------------------
export type refreshAccessTokenApiResult = { user: UserModel };
export const refreshAccessToken = async (
  userId: string
): Promise<refreshAccessTokenApiResult> => {
  const response = await axiosClient.get<refreshAccessTokenApiResult>(
    `/user/refresh-access-token/${userId}`
  );
  return response.data;
};
// ----------------------------------------------------------------------------------------
export type loginApiResult = { user: UserModel };
export const login = async (
  login: string,
  password: string
): Promise<loginApiResult> => {
  const response = await axiosClient.post<loginApiResult>(`/user/login`, {
    username: login,
    email: login,
    password,
  });

  return response.data;
};
// ----------------------------------------------------------------------------------------
export type signUpApiResult = { user: UserModel };
export const signUp = async (
  login: string,
  password: string
): Promise<signUpApiResult> => {
  const response = await axiosClient.post<signUpApiResult>(`/user/sign-up`, {
    username: login,
    email: login,
    password,
  });
  console.log("response: ", response);

  return response.data;
};

// ----------------------------------------------------------------------------------------
export type isCurrentUserAuthenticatedApiResult = { isAuthenticated: boolean };
export const isCurrentUserAuthenticated = async () => {
  const response = await axiosClient.get<isCurrentUserAuthenticatedApiResult>(
    `/user/verify-authenticated/`
  );
  return response.data;
};

// Restaurants ----------------------------------------------------------------------------------------
export type fetchRestaurantListApiResult = { restaurants: RestaurantModel[] };
export const fetchRestaurantList = async () => {
  const response = await axiosClient.get<fetchRestaurantListApiResult>(
    `/restaurants`
  );
  return response.data;
};
// ----------------------------------------------------------------------------------------
export type fetchRestaurantDetailsApiResult = { restaurant: RestaurantModel };
export const fetchRestaurantDetails = async (restaurantId: string) => {
  const response = await axiosClient.get<fetchRestaurantDetailsApiResult>(
    `/restaurant/${restaurantId}`
  );
  return response.data;
};
// Reviews ----------------------------------------------------------------------------------------
export type createRestaurantReviewApiResult = { review: ReviewModel };
export const createRestaurantReview = async (review: ReviewModel) => {
  const response = await axiosClient.post<createRestaurantReviewApiResult>(
    `/restaurant/${review.restaurantId}/review`,
    {
      body: {
        starRating: review.starRating,
        title: review.title,
        comment: review.comment,
        authorId: review.authorId,
      },
    }
  );
  return response.data;
};
