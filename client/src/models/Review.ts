import { UserModel } from "./User";
import { RestaurantModel } from "./Restaurant";

export interface ReplyModel {
  text: string;
  createdOn: string;
}

export interface ReviewModel {
  title: string;
  comment: string;
  starRating: number;
  authorId: string | UserModel;
  restaurantId: string | RestaurantModel;
  reply?: ReplyModel;
  createdOn?: string;
}
