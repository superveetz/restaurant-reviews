import { ReviewModel } from "models/Review";

export interface ReviewState {
  createReview: {
    data: ReviewModel | null;
    error: object | null;
    loading: boolean;
  };
}

export enum ReviewActionTypes {
  REVIEW_CREATE_START = "REVIEW_CREATE_START",
  REVIEW_CREATE_SUCCESS = "REVIEW_CREATE_SUCCESS",
  REVIEW_CREATE_FAIL = "REVIEW_CREATE_FAIL",
}

// Create Review
export interface ReviewCreateStartAction {
  type: typeof ReviewActionTypes.REVIEW_CREATE_START;
}
export interface ReviewCreateSuccessAction {
  type: typeof ReviewActionTypes.REVIEW_CREATE_SUCCESS;
  review: ReviewModel;
}
export interface ReviewCreateFailAction {
  type: typeof ReviewActionTypes.REVIEW_CREATE_FAIL;
  error: object;
}

export type ReviewActions =
  | ReviewCreateStartAction
  | ReviewCreateSuccessAction
  | ReviewCreateFailAction;
