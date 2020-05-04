import { RestaurantModel } from "./Restaurant";

export enum UserRoleType {
  admin = "admin",
  basic = "basic",
  restaurantOwner = "restaurantOwner",
}
export interface UserModel {
  _id: string;
  role: null | UserRoleType;
  accessToken: string;
  username?: string;
  email?: string;
  restaurants?: RestaurantModel[];
}
