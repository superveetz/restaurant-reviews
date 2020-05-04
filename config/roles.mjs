import AccessControl from "accesscontrol";
const ac = new AccessControl();
const roles = (function () {
  ac.grant("basic")
    .readAny("User")
    .createOwn("Restaurant")
    .readAny("Restaurant")
    .createOwn("Review")
    .readAny("Review")
    .readAny("Reply");

  ac.grant("restaurantOwner")
    .readAny("User")
    .createOwn("Restaurant")
    .readOwn("Restaurant")
    .updateOwn("Restaurant")
    .readAny("Review")
    .createOwn("Reply")
    .readOwn("Reply");

  ac.grant("admin")
    .readAny("User")
    .createAny("User")
    .updateAny("User")
    .deleteAny("User")
    .readAny("Restaurant")
    .createAny("Restaurant")
    .updateAny("Restaurant")
    .deleteAny("Restaurant")
    .readAny("Review")
    .createAny("Review")
    .updateAny("Review")
    .deleteAny("Review")
    .readAny("Reply")
    .createAny("Reply")
    .updateAny("Reply")
    .deleteAny("Reply");

  return ac;
})();
export default roles;
