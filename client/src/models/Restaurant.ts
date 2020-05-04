import { UserModel } from "./User";
import { ReviewModel } from "./Review";

export interface RestaurantModel {
  _id: string;
  name: string;
  street: string;
  city: string;
  provState: string;
  postalZip: string;
  country: string;
  averageRating: number;
  createdOn: string;
  ownerId?: UserModel;
  reviews?: ReviewModel[];
}
